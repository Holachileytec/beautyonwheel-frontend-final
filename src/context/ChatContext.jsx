import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import ChatService from "../services/ChatService";

const ChatContext = createContext(null);

export const ChatMode = { AI: "ai", HUMAN: "human" };

export const SenderType = {
  USER: "user",
  AI: "ai",
  HUMAN: "human",
  SYSTEM: "system",
};

const uid = (prefix = "msg") =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

const WELCOME_MSG_ID = "welcome_msg";

const createInitialState = (config) => ({
  isOpen: false,
  messages: [
    {
      id: WELCOME_MSG_ID,
      text:
        config?.welcomeMessage ||
        "Hello! I'm your BeautyOnWheel AI assistant. How can I help you today? " +
          "Ask about our services, booking, pricing, or request to speak with a human agent.",
      sender: SenderType.AI,
      senderName: "BeautyOnWheel AI",
      timestamp: new Date().toISOString(),
    },
  ],
  isTyping: false,
  isSending: false,
  unreadCount: 0,
  connectionStatus: "connected",
  userInfo: null,
  mode: ChatMode.AI,
  humanAgent: null,
  isAgentRequested: false,
  queuePosition: null,
});

const ActionTypes = {
  TOGGLE_CHAT: "TOGGLE_CHAT",
  OPEN_CHAT: "OPEN_CHAT",
  CLOSE_CHAT: "CLOSE_CHAT",
  ADD_MESSAGE: "ADD_MESSAGE",
  SET_TYPING: "SET_TYPING",
  SET_SENDING: "SET_SENDING",
  SET_CONNECTION_STATUS: "SET_CONNECTION_STATUS",
  SET_USER_INFO: "SET_USER_INFO",
  CLEAR_MESSAGES: "CLEAR_MESSAGES",
  MARK_AS_READ: "MARK_AS_READ",
  SET_MODE: "SET_MODE",
  AGENT_CONNECTED: "AGENT_CONNECTED", // ← replaces SET_HUMAN_AGENT (atomic)
  SET_AGENT_REQUESTED: "SET_AGENT_REQUESTED",
  SET_QUEUE_POSITION: "SET_QUEUE_POSITION",
  RESET_STATE: "RESET_STATE",
  AGENT_DISCONNECTED: "AGENT_DISCONNECTED",
};

function chatReducer(state, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_CHAT:
      return {
        ...state,
        isOpen: !state.isOpen,
        unreadCount: !state.isOpen ? 0 : state.unreadCount,
      };

    case ActionTypes.OPEN_CHAT:
      return { ...state, isOpen: true, unreadCount: 0 };

    case ActionTypes.CLOSE_CHAT:
      return { ...state, isOpen: false };

    case ActionTypes.ADD_MESSAGE: {
      const unreadDelta = state.isOpen ? 0 : 1;
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount: state.unreadCount + unreadDelta,
      };
    }

    case ActionTypes.SET_TYPING:
      return { ...state, isTyping: action.payload };

    case ActionTypes.SET_SENDING:
      return { ...state, isSending: action.payload };

    case ActionTypes.SET_CONNECTION_STATUS:
      return { ...state, connectionStatus: action.payload };

    case ActionTypes.SET_USER_INFO:
      return { ...state, userInfo: action.payload };

    // FIX: use WELCOME_MSG_ID constant — never silently breaks if ID changes
    case ActionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter((m) => m.id === WELCOME_MSG_ID),
      };

    case ActionTypes.MARK_AS_READ:
      return { ...state, unreadCount: 0 };

    case ActionTypes.SET_MODE:
      return { ...state, mode: action.payload };

    // FIX: atomic action — agent state + system message in a single update,
    // eliminates the race condition from two separate dispatches.
    case ActionTypes.AGENT_CONNECTED: {
      const { agent } = action.payload;
      const unreadDelta = state.isOpen ? 0 : 1;
      return {
        ...state,
        humanAgent: agent,
        mode: ChatMode.HUMAN,
        isAgentRequested: false,
        messages: [
          ...state.messages,
          {
            id: uid("system"),
            text: `${agent.name} has joined the chat. You're now connected to a human agent.`,
            sender: SenderType.SYSTEM,
            timestamp: new Date().toISOString(),
          },
        ],
        unreadCount: state.unreadCount + unreadDelta,
      };
    }

    case ActionTypes.SET_AGENT_REQUESTED:
      return { ...state, isAgentRequested: action.payload };

    case ActionTypes.SET_QUEUE_POSITION:
      return { ...state, queuePosition: action.payload };

    case ActionTypes.AGENT_DISCONNECTED: {
      const unreadDelta = state.isOpen ? 0 : 1;
      return {
        ...state,
        humanAgent: null,
        mode: ChatMode.AI,
        isAgentRequested: false,
        messages: [
          ...state.messages,
          {
            id: uid("system"),
            text:
              action.payload?.text ||
              "The human agent has left the chat. You're now chatting with our AI assistant.",
            sender: SenderType.SYSTEM,
            timestamp: new Date().toISOString(),
          },
        ],
        unreadCount: state.unreadCount + unreadDelta,
      };
    }

    case ActionTypes.RESET_STATE:
      return createInitialState(action.payload);

    default:
      return state;
  }
}

export const ChatProvider = ({ children, config }) => {
  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const [state, dispatch] = useReducer(chatReducer, createInitialState(config));
  const serviceInitialized = useRef(false);

  // FIX: mirror isSending in a ref so sendMessage's guard never reads stale
  // closure state, while keeping dep array empty (stable callback reference).
  const isSendingRef = useRef(false);

  useEffect(() => {
    if (serviceInitialized.current) return;
    serviceInitialized.current = true;

    const cfg = configRef.current;
    const SERVER_URL = cfg?.serverUrl || import.meta.env.VITE_API_URL;

    if (!SERVER_URL && import.meta.env.PROD) {
      throw new Error(
        "[ChatProvider] VITE_API_URL is not set. Cannot initialise chat service in production.",
      );
    }

    ChatService.init({
      serverUrl: SERVER_URL ?? null,
      enableRealtime: !!SERVER_URL,
    });

    const unsubscribers = [
      ChatService.on("connected", () =>
        dispatch({
          type: ActionTypes.SET_CONNECTION_STATUS,
          payload: "connected",
        }),
      ),
      ChatService.on("disconnected", () =>
        dispatch({
          type: ActionTypes.SET_CONNECTION_STATUS,
          payload: "disconnected",
        }),
      ),
      ChatService.on("connectionError", () =>
        dispatch({
          type: ActionTypes.SET_CONNECTION_STATUS,
          payload: "ai_only",
        }),
      ),
      ChatService.on("messageReceived", (message) =>
        dispatch({ type: ActionTypes.ADD_MESSAGE, payload: message }),
      ),
      ChatService.on("aiTyping", (isTyping) =>
        dispatch({ type: ActionTypes.SET_TYPING, payload: isTyping }),
      ),
      ChatService.on("agentTyping", (isTyping) =>
        dispatch({ type: ActionTypes.SET_TYPING, payload: isTyping }),
      ),
      // FIX: single atomic dispatch — no more race between SET_HUMAN_AGENT + ADD_MESSAGE
      ChatService.on("agentConnected", (agent) =>
        dispatch({ type: ActionTypes.AGENT_CONNECTED, payload: { agent } }),
      ),
      ChatService.on("agentDisconnected", () =>
        dispatch({ type: ActionTypes.AGENT_DISCONNECTED }),
      ),
      ChatService.on("agentRequested", () =>
        dispatch({ type: ActionTypes.SET_AGENT_REQUESTED, payload: true }),
      ),
      ChatService.on("queuePosition", (position) =>
        dispatch({ type: ActionTypes.SET_QUEUE_POSITION, payload: position }),
      ),
      ChatService.on("modeChanged", (mode) =>
        dispatch({ type: ActionTypes.SET_MODE, payload: mode }),
      ),
    ];

    return () => {
      unsubscribers.forEach((unsub) => unsub());
      ChatService.disconnect();
      // FIX: reset so a genuine unmount→remount re-initialises the service
      serviceInitialized.current = false;
    };
  }, []);

  const toggleChat = useCallback(
    () => dispatch({ type: ActionTypes.TOGGLE_CHAT }),
    [],
  );
  const openChat = useCallback(
    () => dispatch({ type: ActionTypes.OPEN_CHAT }),
    [],
  );
  const closeChat = useCallback(
    () => dispatch({ type: ActionTypes.CLOSE_CHAT }),
    [],
  );

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim()) return;
    if (isSendingRef.current) return;

    isSendingRef.current = true;
    dispatch({ type: ActionTypes.SET_SENDING, payload: true });
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: {
        id: uid("user"),
        text: text.trim(),
        sender: SenderType.USER,
        timestamp: new Date().toISOString(),
      },
    });

    try {
      await ChatService.sendMessage(text.trim());
    } catch (error) {
      console.error("Failed to send message:", error);
      dispatch({
        type: ActionTypes.ADD_MESSAGE,
        payload: {
          id: uid("error"),
          text: "Sorry, there was an error sending your message. Please try again.",
          sender: SenderType.SYSTEM,
          timestamp: new Date().toISOString(),
        },
      });
    } finally {
      isSendingRef.current = false;
      dispatch({ type: ActionTypes.SET_SENDING, payload: false });
    }
  }, []);

  const requestHumanAgent = useCallback(async () => {
    dispatch({ type: ActionTypes.SET_AGENT_REQUESTED, payload: true });
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: {
        id: uid("system"),
        text: "Connecting you to a human agent. Please wait...",
        sender: SenderType.SYSTEM,
        timestamp: new Date().toISOString(),
      },
    });

    try {
      await ChatService.requestHumanAgent();
    } catch (error) {
      console.error("Failed to request human agent:", error);
      dispatch({ type: ActionTypes.SET_AGENT_REQUESTED, payload: false });
      dispatch({
        type: ActionTypes.ADD_MESSAGE,
        payload: {
          id: uid("system"),
          text: "Sorry, we couldn't connect you to an agent right now. Please try again.",
          sender: SenderType.SYSTEM,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }, []);

  const switchToAI = useCallback(() => {
    ChatService.switchToAI();
    dispatch({
      type: ActionTypes.AGENT_DISCONNECTED,
      payload: {
        text: "You're now chatting with our AI assistant. How can I help you?",
      },
    });
  }, []);

  const setUserInfo = useCallback((userInfo) => {
    dispatch({ type: ActionTypes.SET_USER_INFO, payload: userInfo });
    ChatService.setUserInfo(userInfo);
  }, []);

  const clearMessages = useCallback(
    () => dispatch({ type: ActionTypes.CLEAR_MESSAGES }),
    [],
  );
  const markAsRead = useCallback(
    () => dispatch({ type: ActionTypes.MARK_AS_READ }),
    [],
  );
  const sendTypingIndicator = useCallback(
    (isTyping) => ChatService.sendTypingIndicator(isTyping),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      config,
      toggleChat,
      openChat,
      closeChat,
      sendMessage,
      setUserInfo,
      clearMessages,
      markAsRead,
      requestHumanAgent,
      switchToAI,
      sendTypingIndicator,
      isHumanMode: state.mode === ChatMode.HUMAN,
      isAIMode: state.mode === ChatMode.AI,
      hasHumanAgent: !!state.humanAgent,
    }),
    [
      state,
      config,
      toggleChat,
      openChat,
      closeChat,
      sendMessage,
      setUserInfo,
      clearMessages,
      markAsRead,
      requestHumanAgent,
      switchToAI,
      sendTypingIndicator,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};

export const useChatOpen = () => {
  const { isOpen, toggleChat, openChat, closeChat } = useChat();
  return { isOpen, toggleChat, openChat, closeChat };
};
export const useChatMessages = () => {
  const { messages, sendMessage, isSending, clearMessages } = useChat();
  return { messages, sendMessage, isSending, clearMessages };
};
export const useChatStatus = () => {
  const {
    isTyping,
    isSending,
    connectionStatus,
    unreadCount,
    mode,
    humanAgent,
    isAgentRequested,
  } = useChat();
  return {
    isTyping,
    isSending,
    connectionStatus,
    unreadCount,
    mode,
    humanAgent,
    isAgentRequested,
  };
};
export const useChatMode = () => {
  const {
    mode,
    humanAgent,
    isAgentRequested,
    requestHumanAgent,
    switchToAI,
    isHumanMode,
    isAIMode,
  } = useChat();
  return {
    mode,
    humanAgent,
    isAgentRequested,
    requestHumanAgent,
    switchToAI,
    isHumanMode,
    isAIMode,
  };
};

export default ChatContext;
