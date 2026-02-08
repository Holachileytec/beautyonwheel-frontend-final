import { createContext, useContext, useReducer, useCallback, useMemo, useRef, useEffect } from "react";
import ChatService from "../services/ChatService";

const ChatContext = createContext(null);

// Mode types
export const ChatMode = {
  AI: 'ai',
  HUMAN: 'human',
};

// Sender types for messages
export const SenderType = {
  USER: 'user',
  AI: 'ai',
  HUMAN: 'human',
  SYSTEM: 'system',
};

const createInitialState = (config) => ({
  isOpen: false,
  messages: [
    {
      id: 'welcome_msg',
      text: config?.welcomeMessage || "Hello! I'm your BeautyOnWheel AI assistant. How can I help you today? Ask about our services, booking, pricing, or request to speak with a human agent.",
      sender: SenderType.AI,
      senderName: 'BeautyOnWheel AI',
      timestamp: new Date().toISOString(),
    }
  ],
  isTyping: false,
  unreadCount: 0,
  connectionStatus: 'connected',
  userInfo: null,
  mode: ChatMode.AI,
  humanAgent: null,
  isAgentRequested: false,
  queuePosition: null,
});

// Action types
const ActionTypes = {
  TOGGLE_CHAT: 'TOGGLE_CHAT',
  OPEN_CHAT: 'OPEN_CHAT',
  CLOSE_CHAT: 'CLOSE_CHAT',
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_TYPING: 'SET_TYPING',
  SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
  SET_USER_INFO: 'SET_USER_INFO',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  MARK_AS_READ: 'MARK_AS_READ',
  SET_MODE: 'SET_MODE',
  SET_HUMAN_AGENT: 'SET_HUMAN_AGENT',
  SET_AGENT_REQUESTED: 'SET_AGENT_REQUESTED',
  SET_QUEUE_POSITION: 'SET_QUEUE_POSITION',
  RESET_STATE: 'RESET_STATE',
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
    case ActionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount: state.isOpen ? state.unreadCount : state.unreadCount + 1,
      };
    case ActionTypes.SET_TYPING:
      return { ...state, isTyping: action.payload };
    case ActionTypes.SET_CONNECTION_STATUS:
      return { ...state, connectionStatus: action.payload };
    case ActionTypes.SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case ActionTypes.CLEAR_MESSAGES:
      return { 
        ...state, 
        messages: [state.messages[0]] // Keep welcome message
      };
    case ActionTypes.MARK_AS_READ:
      return { ...state, unreadCount: 0 };
    case ActionTypes.SET_MODE:
      return { ...state, mode: action.payload };
    case ActionTypes.SET_HUMAN_AGENT:
      return { 
        ...state, 
        humanAgent: action.payload,
        mode: action.payload ? ChatMode.HUMAN : ChatMode.AI,
        isAgentRequested: action.payload ? false : state.isAgentRequested,
      };
    case ActionTypes.SET_AGENT_REQUESTED:
      return { ...state, isAgentRequested: action.payload };
    case ActionTypes.SET_QUEUE_POSITION:
      return { ...state, queuePosition: action.payload };
    case ActionTypes.RESET_STATE:
      return createInitialState(action.payload);
    default:
      return state;
  }
}

// Provider
export const ChatProvider = ({ children, config }) => {
  const [state, dispatch] = useReducer(chatReducer, createInitialState(config));
  const serviceInitialized = useRef(false);

  // Initialize ChatService and setup listeners
  useEffect(() => {
    if (serviceInitialized.current) return;
    serviceInitialized.current = true;

    // Initialize the chat service
    ChatService.init({
      serverUrl: config?.serverUrl,
      sessionId: config?.sessionId,
      enableRealtime: config?.enableRealtime,
    });

    // Setup event listeners
    const unsubscribers = [
      ChatService.on('connected', () => {
        dispatch({ type: ActionTypes.SET_CONNECTION_STATUS, payload: 'connected' });
      }),

      ChatService.on('disconnected', () => {
        dispatch({ type: ActionTypes.SET_CONNECTION_STATUS, payload: 'disconnected' });
      }),

      ChatService.on('connectionError', () => {
        dispatch({ type: ActionTypes.SET_CONNECTION_STATUS, payload: 'ai_only' });
      }),

      ChatService.on('messageReceived', (message) => {
        dispatch({ type: ActionTypes.ADD_MESSAGE, payload: message });
      }),

      ChatService.on('aiTyping', (isTyping) => {
        dispatch({ type: ActionTypes.SET_TYPING, payload: isTyping });
      }),

      ChatService.on('agentTyping', (isTyping) => {
        dispatch({ type: ActionTypes.SET_TYPING, payload: isTyping });
      }),

      ChatService.on('agentConnected', (agent) => {
        dispatch({ type: ActionTypes.SET_HUMAN_AGENT, payload: agent });
        dispatch({
          type: ActionTypes.ADD_MESSAGE,
          payload: {
            id: `system_${Date.now()}`,
            text: `${agent.name} has joined the chat. You're now connected to a human agent.`,
            sender: SenderType.SYSTEM,
            timestamp: new Date().toISOString(),
          },
        });
      }),

      ChatService.on('agentDisconnected', () => {
        dispatch({ type: ActionTypes.SET_HUMAN_AGENT, payload: null });
        dispatch({
          type: ActionTypes.ADD_MESSAGE,
          payload: {
            id: `system_${Date.now()}`,
            text: "The human agent has left the chat. You're now chatting with our AI assistant.",
            sender: SenderType.SYSTEM,
            timestamp: new Date().toISOString(),
          },
        });
      }),

      ChatService.on('agentRequested', () => {
        dispatch({ type: ActionTypes.SET_AGENT_REQUESTED, payload: true });
      }),

      ChatService.on('queuePosition', (position) => {
        dispatch({ type: ActionTypes.SET_QUEUE_POSITION, payload: position });
      }),

      ChatService.on('modeChanged', (mode) => {
        dispatch({ type: ActionTypes.SET_MODE, payload: mode });
      }),
    ];

    // Cleanup on unmount
    return () => {
      unsubscribers.forEach(unsub => unsub());
      ChatService.disconnect();
    };
  }, [config]);

  const toggleChat = useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_CHAT });
  }, []);

  const openChat = useCallback(() => {
    dispatch({ type: ActionTypes.OPEN_CHAT });
  }, []);

  const closeChat = useCallback(() => {
    dispatch({ type: ActionTypes.CLOSE_CHAT });
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: text.trim(),
      sender: SenderType.USER,
      timestamp: new Date().toISOString(),
    };

    // Add user message immediately
    dispatch({ type: ActionTypes.ADD_MESSAGE, payload: userMessage });

    // Send through ChatService (handles AI or human routing)
    try {
      await ChatService.sendMessage(text.trim());
    } catch (error) {
      console.error('Failed to send message:', error);
      dispatch({
        type: ActionTypes.ADD_MESSAGE,
        payload: {
          id: `error_${Date.now()}`,
          text: "Sorry, there was an error sending your message. Please try again.",
          sender: SenderType.SYSTEM,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }, []);

  const requestHumanAgent = useCallback(() => {
    dispatch({ type: ActionTypes.SET_AGENT_REQUESTED, payload: true });
    ChatService.requestHumanAgent();
    
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: {
        id: `system_${Date.now()}`,
        text: "Connecting you to a human agent. Please wait...",
        sender: SenderType.SYSTEM,
        timestamp: new Date().toISOString(),
      },
    });
  }, []);

  const switchToAI = useCallback(() => {
    ChatService.switchToAI();
    dispatch({ type: ActionTypes.SET_MODE, payload: ChatMode.AI });
    dispatch({ type: ActionTypes.SET_HUMAN_AGENT, payload: null });
    dispatch({ type: ActionTypes.SET_AGENT_REQUESTED, payload: false });
    
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: {
        id: `system_${Date.now()}`,
        text: "You're now chatting with our AI assistant. How can I help you?",
        sender: SenderType.SYSTEM,
        timestamp: new Date().toISOString(),
      },
    });
  }, []);

  const setUserInfo = useCallback((userInfo) => {
    dispatch({ type: ActionTypes.SET_USER_INFO, payload: userInfo });
    ChatService.setUserInfo(userInfo);
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_MESSAGES });
  }, []);

  const markAsRead = useCallback(() => {
    dispatch({ type: ActionTypes.MARK_AS_READ });
  }, []);

  const sendTypingIndicator = useCallback((isTyping) => {
    ChatService.sendTypingIndicator(isTyping);
  }, []);

  // Memoize the context value
  const value = useMemo(() => ({
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
    // Computed properties
    isHumanMode: state.mode === ChatMode.HUMAN,
    isAIMode: state.mode === ChatMode.AI,
    hasHumanAgent: !!state.humanAgent,
  }), [
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
  ]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Specialized hooks for better performance
export const useChatOpen = () => {
  const { isOpen, toggleChat, openChat, closeChat } = useChat();
  return useMemo(() => ({ isOpen, toggleChat, openChat, closeChat }), [isOpen, toggleChat, openChat, closeChat]);
};

export const useChatMessages = () => {
  const { messages, sendMessage, clearMessages } = useChat();
  return useMemo(() => ({ messages, sendMessage, clearMessages }), [messages, sendMessage, clearMessages]);
};

export const useChatStatus = () => {
  const { isTyping, connectionStatus, unreadCount, mode, humanAgent, isAgentRequested } = useChat();
  return useMemo(() => ({ 
    isTyping, connectionStatus, unreadCount, mode, humanAgent, isAgentRequested 
  }), [isTyping, connectionStatus, unreadCount, mode, humanAgent, isAgentRequested]);
};

export const useChatMode = () => {
  const { mode, humanAgent, isAgentRequested, requestHumanAgent, switchToAI, isHumanMode, isAIMode } = useChat();
  return useMemo(() => ({ 
    mode, humanAgent, isAgentRequested, requestHumanAgent, switchToAI, isHumanMode, isAIMode
  }), [mode, humanAgent, isAgentRequested, requestHumanAgent, switchToAI, isHumanMode, isAIMode]);
};

export default ChatContext;
