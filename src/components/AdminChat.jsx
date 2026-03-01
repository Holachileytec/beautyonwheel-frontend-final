import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import api from "../config/api";

const AdminChat = () => {
  const socketRef = useRef(null);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // const adminId = localStorage.getItem("adminId");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const adminId = user._id || user.id;

    if (!adminId) {
      console.error("No adminId in localStorage — is admin logged in?");
      return;
    }

    const socket = io("http://localhost:8000/chat", {
      auth: {
        agentId: adminId,
        isAgent: true,
      },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Admin chat connected:", socket.id);
      setConnected(true);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection failed:", err.message);
      setConnected(false);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("queue:newSession", (data) => {
      setSessions((prev) => [
        {
          sessionId: data.sessionId,
          guestInfo: data.guestInfo,
          status: "waiting...",
          lastMessage: "Requesting support...",
          unread: 1,
        },
        ...prev,
      ]);
      setUnreadCount((n) => n + 1);
    });

    socket.on("user:message", (data) => {
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === data.sessionId
            ? {
                ...s,
                lastMessage: data.message.text,
                unread: (s.unread || 0) + 1,
              }
            : s,
        ),
      );
      setActiveSession((current) => {
        if (current?.sessionId === data.sessionId) {
          setMessages((msgs) => [
            ...msgs,
            { sender: "user", text: data.message.text, createdAt: new Date() },
          ]);
        }
        return current;
      });
      setUnreadCount((n) => n + 1);
    });

    socket.on("user:typing", ({ sessionId, isTyping }) => {
      setActiveSession((current) => {
        if (current?.sessionId === sessionId) setIsTyping(isTyping);
        return current;
      });
    });

    fetchSessions();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchSessions = async () => {
    try {
      const res = await api.get("/api/chat/admin/sessions");
      setSessions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const openSession = async (session) => {
    setActiveSession(session);
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === session.sessionId ? { ...s, unread: 0 } : s,
      ),
    );
    try {
      const res = await api.get(
        `/api/chat/sessions/${session.sessionId}/messages`,
      );
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
    if (session.status === "waiting") {
      socketRef.current?.emit("agent:acceptSession", {
        sessionId: session.sessionId,
      });
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === session.sessionId ? { ...s, status: "active" } : s,
        ),
      );
    }
  };

  const sendReply = () => {
    if (!reply.trim() || !activeSession) return;
    socketRef.current?.emit("agent:message", {
      sessionId: activeSession.sessionId,
      message: { id: `msg_${Date.now()}`, text: reply },
    });
    setMessages((prev) => [
      ...prev,
      { sender: "human", text: reply, createdAt: new Date() },
    ]);
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === activeSession.sessionId
          ? { ...s, lastMessage: reply }
          : s,
      ),
    );
    setReply("");
  };

  const closeSession = async (sessionId) => {
    if (!window.confirm("Close this session?")) return;
    try {
      await api.post(`/api/chat/sessions/${sessionId}/close`, {
        closedBy: "agent",
      });
      socketRef.current?.emit("agent:closeSession", { sessionId });
      setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
      if (activeSession?.sessionId === sessionId) {
        setActiveSession(null);
        setMessages([]);
      }
    } catch (err) {
      console.error("Error closing session:", err);
    }
  };

  const handleTyping = () => {
    socketRef.current?.emit("agent:typing", {
      sessionId: activeSession?.sessionId,
      isTyping: true,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* LEFT — Sessions List */}
      <div
        style={{
          width: "280px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, color:"red",fontSize:"18px" ,fontWeight:"bold"}}>💬 Support Chats</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px"  }}>
            <span style={{ fontSize: "12px" }}>
              {connected ? "🟢 Connected" : "🔴 Disconnected"}
            </span>
            {unreadCount > 0 && (
              <span
                style={{
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {sessions.length === 0 && (
          <p style={{ padding: "16px", color: "#888", fontSize: "13px" }}>
            No active chats
          </p>
        )}

        {sessions.map((session) => (
          <div
            key={session.sessionId}
            onClick={() => openSession(session)}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              background:
                activeSession?.sessionId === session.sessionId
                  ? "#e8e8ff"
                  : "white",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                {session.userType === "beautician" ? "💄" : "👤"}{" "}
                {session.guestInfo?.name || "Guest"}
              </div>
              <div
                style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}
              >
                {session.lastMessage || "No messages yet"}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  marginTop: "4px",
                  color: session.status === "waiting" ? "orange" : "green",
                  fontWeight: "bold",
                }}
              >
                ● {session.status}
              </div>
            </div>
            {session.unread > 0 && (
              <span
                style={{
                  background: "#4f46e5",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  fontSize: "12px",
                }}
              >
                {session.unread}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT — Chat Window */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {activeSession ? (
          <>
            {/* Chat Header */}
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #ddd",
                background: "#f9f9f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>
                  {activeSession.userType === "beautician"
                    ? "💄 Beautician"
                    : "👤 Client"}
                  : {activeSession.guestInfo?.name || "Guest"}
                </strong>
                {activeSession.guestInfo?.email && (
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    {activeSession.guestInfo.email}
                  </div>
                )}
              </div>
              <button
                onClick={() => closeSession(activeSession.sessionId)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Close Chat
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#fff",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf:
                      msg.sender === "human" ? "flex-end" : "flex-start",
                    background: msg.sender === "human" ? "#4f46e5" : "#f0f0f0",
                    color: msg.sender === "human" ? "white" : "black",
                    padding: "10px 14px",
                    borderRadius: "16px",
                    maxWidth: "60%",
                    fontSize: "14px",
                  }}
                >
                  <div>{msg.text}</div>
                  <div
                    style={{ fontSize: "10px", marginTop: "4px", opacity: 0.7 }}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div
                  style={{
                    fontStyle: "italic",
                    color: "#888",
                    fontSize: "13px",
                  }}
                >
                  {activeSession.guestInfo?.name || "User"} is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid #ddd",
                display: "flex",
                gap: "10px",
                background: "#f9f9f9",
              }}
            >
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyUp={handleTyping}
                onKeyDown={(e) => e.key === "Enter" && sendReply()}
                placeholder="Type your reply..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              />
              <button
                onClick={sendReply}
                style={{
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Send ▶
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: "48px"}}>💬</div>
            <p>Select a conversation to start replying</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
