import { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import api from "../config/api";
import "../Styles/AdminChat.css";

if (import.meta.env.production && !import.meta.env.VITE_SOCKET_URL) {
  throw new Error("[AdminChat] VITE_SOCKET_URL is not set.");
}

const uid = (prefix = "msg") =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

// ── Sub-components ────────────────────────────────────────────────────────────

const StatusPill = ({ status }) => (
  <span className={`ac-chat-status-pill ${status}`}>
    <span
      style={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "currentColor",
        display: "inline-block",
      }}
    />
    {status}
  </span>
);

const SessionStatusLabel = ({ status }) => (
  <span className={`ac-session-status ${status}`}>
    <span
      style={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "currentColor",
        display: "inline-block",
      }}
    />
    {status}
  </span>
);

// ── Main component ────────────────────────────────────────────────────────────

const AdminChat = () => {
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  /**
   * FIX 1 – activeSessionRef mirrors activeSession state so that socket event
   * handlers (registered once on mount) always read the latest value without
   * needing to be re-registered.  Previously the ref was referenced but never
   * created, causing runtime ReferenceErrors.
   */
  const activeSessionRef = useRef(null);

  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sessionsError, setSessionsError] = useState(null);
  const [closeError, setCloseError] = useState(null);

  // Keep ref in sync with state so socket handlers always have the current value
  const setActiveSessionSafe = useCallback((valueOrUpdater) => {
    setActiveSession((prev) => {
      const next =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev)
          : valueOrUpdater;
      activeSessionRef.current = next;
      return next;
    });
  }, []);

  // ── Session helpers ──────────────────────────────────────────────────────

  const addSessionSafe = useCallback((newSession) => {
    setSessions((prev) => {
      if (prev.find((s) => s.sessionId === newSession.sessionId)) return prev;
      return [newSession, ...prev];
    });
  }, []);

  const updateSession = useCallback((sessionId, updates) => {
    setSessions((prev) =>
      prev.map((s) => (s.sessionId === sessionId ? { ...s, ...updates } : s)),
    );
  }, []);

  const fetchSessions = useCallback(async () => {
    setSessionsError(null);
    try {
      const res = await api.get("/api/chat/admin/sessions");
      const fetched = res.data.data || [];
      setSessions((prev) => {
        const merged = [...fetched];
        prev.forEach((s) => {
          if (!merged.find((m) => m.sessionId === s.sessionId)) merged.push(s);
        });
        return merged;
      });
    } catch {
      setSessionsError("Failed to load sessions. Please refresh.");
    }
  }, []);

  // ── Socket setup (mount / unmount only) ──────────────────────────────────
  /**
   * FIX 2 – activeSession was in the dependency array, which caused the entire
   * socket to be torn down and reconnected every time the admin opened a chat.
   * Socket registration now happens once on mount; stale-closure problems are
   * solved via activeSessionRef instead.
   */
  useEffect(() => {
    let adminId;
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      adminId = user._id || user.id;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
    if (!adminId) return;

    const SOCKET_URL = import.meta.env.VITE_CHAT_SERVER_URL;
    const socket = io(`${SOCKET_URL}/chat`, {
      auth: { agentId: adminId, isAgent: true },
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    // Debug – log all incoming events
    socket.onAny((event, ...args) => {
      console.log("Admin received event:", event, args);
    });

    // Connection lifecycle
    socket.on("connect", () => {
      console.log("Admin connected:", socket.id);
      setConnected(true);
    });
    socket.on("connect_error", (err) => {
      console.error("Connect error:", err.message);
      setConnected(false);
    });
    socket.on("disconnect", () => {
      console.log("Admin disconnected");
      setConnected(false);
    });

    // New session enters the queue
    socket.on("queue:newSession", (data) => {
      console.log("Queue new session received:", data);
      addSessionSafe({
        sessionId: data.sessionId,
        guestInfo: data.guestInfo,
        status: "waiting",
        lastMessage: "Requesting support…",
        unread: 1,
      });
      setUnreadCount((n) => n + 1);
    });
    socket.on("sessions:active", (sessions) => {
      sessions.forEach((s) =>
        addSessionSafe({
          sessionId: s.sessionId,
          guestInfo: s.guestInfo,
          status: "active",
          userType: s.userType,
          lastMessage: "",
          unread: 0,
        }),
      );
    });

    // Another agent (or the server) accepted a session
    socket.on("session:accepted", (data) => {
      console.log("Session accepted:", data);
      updateSession(data.sessionId, { status: "active" });
      setActiveSessionSafe((cur) =>
        cur?.sessionId === data.sessionId
          ? { ...cur, status: "active", agentInfo: data.agentInfo }
          : cur,
      );

      setActiveSessionSafe;
    });
    socket.on("session:removed", ({ sessionId }) => {
      setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
      if (activeSessionRef.current?.sessionId === sessionId) {
        setActiveSessionSafe(null);
        setMessages([]);
        setReply("");
      }
    });

    // Incoming user message
    socket.on("user:message", (data) => {
      const { sessionId, message } = data;

      /**
       * FIX 3 – Read the current active session from the ref, not from a
       * closed-over state variable, so we always compare against the correct
       * session even if state has changed since registration.
       */
      const current = activeSessionRef.current;

      updateSession(sessionId, { lastMessage: message.text });

      if (current?.sessionId === sessionId) {
        setMessages((msgs) => [
          ...msgs,
          {
            id: message.id || uid("user"),
            sender: "user",
            text: message.text,
            createdAt: message.timestamp || new Date(),
          },
        ]);
      } else {
        setSessions((prev) =>
          prev.map((s) =>
            s.sessionId === sessionId
              ? { ...s, unread: (s.unread || 0) + 1 }
              : s,
          ),
        );
        setUnreadCount((n) => n + 1);
      }
    });

    // User typing indicator
    socket.on("user:typing", ({ sessionId, isTyping: typing }) => {
      if (activeSessionRef.current?.sessionId === sessionId) {
        setIsTyping(typing);
      }
    });

    // Session ended by user
    socket.on("session:ended", ({ sessionId }) => {
      updateSession(sessionId, { status: "closed" });
      if (activeSessionRef.current?.sessionId === sessionId) {
        setActiveSessionSafe(null);
        setMessages([]);
      }
    });

    // FIX 12: Handle initial waiting queue from server
    socket.on("queue:list", (sessions) => {
      sessions.forEach((s) =>
        addSessionSafe({
          sessionId: s.sessionId,
          guestInfo: s.guestInfo,
          status: "waiting",
          userType: s.userType,
          lastMessage: "Requesting support…",
          unread: 0,
        }),
      );
    });

    // Session removed from queue
    socket.on("queue:sessionRemoved", ({ sessionId }) => {
      setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
      if (activeSessionRef.current?.sessionId === sessionId) {
        setActiveSessionSafe(null);
        setMessages([]);
      }
    });

    fetchSessions();

    return () => {
      socket.disconnect();
      clearTimeout(typingTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty – socket is registered once on mount

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const openSession = useCallback(
    async (session) => {
      setActiveSessionSafe(session);
      setCloseError(null);
      setIsTyping(false);

      /**
       * FIX 4 – Clear the reply input when switching sessions so stale text
       * from the previous conversation is not accidentally sent.
       */
      setReply("");

      // Clear unread badge for this session
      if (session.unread > 0) {
        setUnreadCount((n) => Math.max(0, n - session.unread));
        updateSession(session.sessionId, { unread: 0 });
      }

      // Fetch message history
      setLoadingMessages(true);
      try {
        const res = await api.get(
          `/api/chat/sessions/${session.sessionId}/messages`,
        );
        const fetched = (res.data.data || []).map((m) => ({
          id: m._id || m.id || uid("fetched"),
          ...m,
        }));
        setMessages(fetched);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }

      // Accept the session if it was still in the waiting queue
      if (session.status === "waiting") {
        socketRef.current?.emit("agent:acceptSession", {
          sessionId: session.sessionId,
        });
        updateSession(session.sessionId, { status: "active" });
        setActiveSessionSafe((cur) =>
          cur?.sessionId === session.sessionId
            ? { ...cur, status: "active" }
            : cur,
        );
      }
    },
    [updateSession, setActiveSessionSafe],
  );

  const sendReply = useCallback(() => {
    const current = activeSessionRef.current;

    /**
     * FIX 5 – Guard uses the ref so the check is never stale, and we
     * explicitly verify the session is "active" before emitting.
     */
    if (!reply.trim() || !current || current.status !== "active") return;

    const msgId = uid("msg");
    socketRef.current?.emit("agent:message", {
      sessionId: current.sessionId,
      message: { id: msgId, text: reply },
    });

    setMessages((prev) => [
      ...prev,
      { id: uid("human"), sender: "human", text: reply, createdAt: new Date() },
    ]);
    updateSession(current.sessionId, { lastMessage: reply });
    setReply("");
  }, [reply, updateSession]);

  /**
   * FIX 6 – Typing signal is now emitted on onChange (every keystroke) rather
   * than onKeyUp/onKeyDown, which is the standard pattern for typing indicators.
   * onKeyUp was missing the very first character; onKeyDown fires before the
   * value updates.
   */
  const handleInputChange = useCallback((e) => {
    setReply(e.target.value);

    const current = activeSessionRef.current;
    if (!current?.sessionId) return;

    socketRef.current?.emit("agent:typing", {
      sessionId: current.sessionId,
      isTyping: true,
    });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("agent:typing", {
        sessionId: current.sessionId,
        isTyping: false,
      });
    }, 1500);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendReply();
      }
    },
    [sendReply],
  );

  const closeSession = useCallback(
    async (sessionId) => {
      if (!window.confirm("Close this session?")) return;
      setCloseError(null);
      try {
        await api.post(`/api/chat/sessions/${sessionId}/close`, {
          closedBy: "agent",
        });
        socketRef.current?.emit("agent:closeSession", { sessionId });
        setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
        if (activeSessionRef.current?.sessionId === sessionId) {
          setActiveSessionSafe(null);
          setMessages([]);
          setReply("");
        }
      } catch {
        setCloseError("Failed to close session. Please try again.");
      }
    },
    [setActiveSessionSafe],
  );

  // ── Derived state ─────────────────────────────────────────────────────────

  const canSend = activeSession?.status === "active";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="ac-root">
      {/* ── Sidebar ── */}
      <div className="ac-sidebar">
        <div className="ac-sidebar-header">
          <div className="ac-sidebar-title">
            <div className="ac-sidebar-title-icon">💬</div>
            Support
          </div>
          <div className="ac-status-row">
            <div className="ac-connection">
              <span
                className={`ac-dot ${connected ? "connected" : "disconnected"}`}
              />
              {connected ? "Live" : "Offline"}
            </div>
            {unreadCount > 0 && (
              <span className="ac-unread-badge">{unreadCount}</span>
            )}
          </div>
        </div>

        {sessionsError && (
          <div className="ac-error-banner">⚠ {sessionsError}</div>
        )}

        <div className="ac-sessions-list">
          {sessions.length === 0 && !sessionsError ? (
            <div className="ac-empty-list">
              <span className="ac-empty-icon">📭</span>
              No active chats right now
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.sessionId}
                onClick={() => openSession(session)}
                className={`ac-session-item ${
                  activeSession?.sessionId === session.sessionId ? "active" : ""
                }`}
              >
                <div style={{ minWidth: 0 }}>
                  <div className="ac-session-name">
                    {session.userType === "beautician" ? "💄" : "👤"}
                    {session.guestInfo?.name || "Guest"}
                  </div>
                  <div className="ac-session-preview">
                    {session.lastMessage || "No messages yet"}
                  </div>
                  <SessionStatusLabel status={session.status} />
                </div>
                {session.unread > 0 && (
                  <span className="ac-session-unread">{session.unread}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Chat Pane ── */}
      <div className="ac-chat">
        {activeSession ? (
          <>
            <div className="ac-chat-header">
              <div>
                <div className="ac-chat-name">
                  {activeSession.userType === "beautician" ? "💄" : "👤"}
                  {activeSession.guestInfo?.name || "Guest"}
                </div>
                <div className="ac-chat-meta">
                  {activeSession.guestInfo?.email && (
                    <span>{activeSession.guestInfo.email}</span>
                  )}
                  <StatusPill status={activeSession.status} />
                </div>
              </div>
              <button
                className="ac-close-btn"
                onClick={() => closeSession(activeSession.sessionId)}
              >
                End Chat
              </button>
            </div>

            {closeError && (
              <div className="ac-error-banner">⚠ {closeError}</div>
            )}

            <div className="ac-messages">
              {loadingMessages ? (
                <div className="ac-loading">
                  <div className="ac-spinner" />
                  Loading conversation…
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`ac-bubble-wrap ${msg.sender}`}>
                    <div className={`ac-bubble ${msg.sender}`}>{msg.text}</div>
                    <div className="ac-bubble-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="ac-typing">
                  <div className="ac-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  {activeSession.guestInfo?.name || "User"} is typing
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="ac-input-row">
              <input
                className="ac-input"
                value={reply}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={
                  canSend
                    ? "Write a reply…"
                    : "Waiting for session to be accepted…"
                }
                disabled={!canSend}
              />
              <button
                className={`ac-send-btn ${canSend ? "can-send" : "no-send"}`}
                onClick={sendReply}
                disabled={!canSend}
                aria-label="Send message"
              >
                ↑
              </button>
            </div>
          </>
        ) : (
          <div className="ac-empty-pane">
            <div className="ac-empty-pane-icon">✦</div>
            <div className="ac-empty-pane-title">No conversation open</div>
            <p className="ac-empty-pane-sub">
              Select a chat from the sidebar to start responding.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
