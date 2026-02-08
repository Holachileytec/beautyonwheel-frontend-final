import { useCallback, useMemo } from 'react';
import { useChat, ChatMode, SenderType } from '../context/ChatContext';

/**
 * Custom hook for programmatic control of the BeautyOnWheel chat widget
 * Use this hook in your components to interact with the chat widget
 * 
 * Features:
 * - Control chat window open/close
 * - Send messages programmatically
 * - Switch between AI and human modes
 * - Access chat state and messages
 */
export function useChatWidget() {
  const context = useChat();
  
  if (!context) {
    throw new Error('useChatWidget must be used within a ChatProvider');
  }

  const {
    isOpen,
    messages,
    unreadCount,
    isTyping,
    connectionStatus,
    userInfo,
    mode,
    humanAgent,
    isAgentRequested,
    queuePosition,
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    setUserInfo,
    clearMessages,
    markAsRead,
    requestHumanAgent,
    switchToAI,
    sendTypingIndicator,
    isHumanMode,
    isAIMode,
  } = context;

  // Send a message programmatically with validation
  const send = useCallback((text) => {
    if (text && typeof text === 'string') {
      const trimmed = text.trim();
      if (trimmed) {
        sendMessage(trimmed);
        return true;
      }
    }
    return false;
  }, [sendMessage]);

  // Set user information for the chat session
  const identifyUser = useCallback((info) => {
    if (!info || typeof info !== 'object') {
      console.warn('identifyUser requires an object with user information');
      return false;
    }
    
    setUserInfo({
      id: info.id,
      name: info.name,
      email: info.email,
      phone: info.phone,
      ...info,
    });
    return true;
  }, [setUserInfo]);

  // Request a human agent
  const connectToHuman = useCallback(() => {
    if (!isHumanMode && !isAgentRequested) {
      requestHumanAgent();
      return true;
    }
    return false;
  }, [isHumanMode, isAgentRequested, requestHumanAgent]);

  // Switch back to AI mode
  const useAI = useCallback(() => {
    if (isHumanMode) {
      switchToAI();
      return true;
    }
    return false;
  }, [isHumanMode, switchToAI]);

  // Get message count
  const messageCount = useMemo(() => messages.length, [messages]);

  // Check if chat is ready
  const isReady = useMemo(
    () => connectionStatus === 'connected' || connectionStatus === 'ai_only',
    [connectionStatus]
  );

  // Get latest message
  const latestMessage = useMemo(
    () => messages.length > 0 ? messages[messages.length - 1] : null,
    [messages]
  );

  // Get messages by sender type
  const getMessagesBySender = useCallback((senderType) => {
    return messages.filter(msg => msg.sender === senderType);
  }, [messages]);

  // Get user messages
  const userMessages = useMemo(
    () => messages.filter(msg => msg.sender === SenderType.USER),
    [messages]
  );

  // Get AI messages
  const aiMessages = useMemo(
    () => messages.filter(msg => msg.sender === SenderType.AI),
    [messages]
  );

  // Get human agent messages
  const humanMessages = useMemo(
    () => messages.filter(msg => msg.sender === SenderType.HUMAN),
    [messages]
  );

  return useMemo(() => ({
    // State
    isOpen,
    messages,
    unreadCount,
    isTyping,
    connectionStatus,
    userInfo,
    mode,
    humanAgent,
    isAgentRequested,
    queuePosition,
    
    // Derived state
    messageCount,
    isReady,
    latestMessage,
    isHumanMode,
    isAIMode,
    userMessages,
    aiMessages,
    humanMessages,
    
    // Actions - Chat window
    open: openChat,
    close: closeChat,
    toggle: toggleChat,
    
    // Actions - Messaging
    send,
    clearMessages,
    markAsRead,
    sendTypingIndicator,
    
    // Actions - User
    identifyUser,
    
    // Actions - Mode switching
    connectToHuman,
    requestHumanAgent,
    useAI,
    switchToAI,
    
    // Utility
    getMessagesBySender,
    
    // Constants for external use
    ChatMode,
    SenderType,
  }), [
    isOpen,
    messages,
    unreadCount,
    isTyping,
    connectionStatus,
    userInfo,
    mode,
    humanAgent,
    isAgentRequested,
    queuePosition,
    messageCount,
    isReady,
    latestMessage,
    isHumanMode,
    isAIMode,
    userMessages,
    aiMessages,
    humanMessages,
    openChat,
    closeChat,
    toggleChat,
    send,
    clearMessages,
    markAsRead,
    sendTypingIndicator,
    identifyUser,
    connectToHuman,
    requestHumanAgent,
    useAI,
    switchToAI,
    getMessagesBySender,
  ]);
}

/**
 * Hook for chat state only - better performance for components
 * that only need to read state
 */
export function useChatState() {
  const { isOpen, unreadCount, isTyping, connectionStatus, mode, humanAgent, isAgentRequested } = useChat();
  
  return useMemo(() => ({
    isOpen,
    unreadCount,
    isTyping,
    connectionStatus,
    mode,
    humanAgent,
    isAgentRequested,
    isReady: connectionStatus === 'connected' || connectionStatus === 'ai_only',
    isHumanMode: mode === ChatMode.HUMAN,
    isAIMode: mode === ChatMode.AI,
  }), [isOpen, unreadCount, isTyping, connectionStatus, mode, humanAgent, isAgentRequested]);
}

/**
 * Hook for chat actions only - stable references
 */
export function useChatActions() {
  const { 
    openChat, 
    closeChat, 
    toggleChat, 
    sendMessage, 
    clearMessages, 
    markAsRead,
    requestHumanAgent,
    switchToAI,
    sendTypingIndicator,
  } = useChat();
  
  return useMemo(() => ({
    open: openChat,
    close: closeChat,
    toggle: toggleChat,
    send: sendMessage,
    clear: clearMessages,
    markAsRead,
    requestHumanAgent,
    switchToAI,
    sendTypingIndicator,
  }), [openChat, closeChat, toggleChat, sendMessage, clearMessages, markAsRead, requestHumanAgent, switchToAI, sendTypingIndicator]);
}

/**
 * Hook for messages only
 */
export function useChatMessages() {
  const { messages } = useChat();
  
  return useMemo(() => ({
    messages,
    count: messages.length,
    latest: messages.length > 0 ? messages[messages.length - 1] : null,
    isEmpty: messages.length <= 1, // Only welcome message
    userMessages: messages.filter(msg => msg.sender === SenderType.USER),
    aiMessages: messages.filter(msg => msg.sender === SenderType.AI),
    humanMessages: messages.filter(msg => msg.sender === SenderType.HUMAN),
  }), [messages]);
}

/**
 * Hook for mode management
 */
export function useChatMode() {
  const { mode, humanAgent, isAgentRequested, queuePosition, requestHumanAgent, switchToAI } = useChat();
  
  return useMemo(() => ({
    mode,
    humanAgent,
    isAgentRequested,
    queuePosition,
    isHumanMode: mode === ChatMode.HUMAN,
    isAIMode: mode === ChatMode.AI,
    hasAgent: !!humanAgent,
    requestHumanAgent,
    switchToAI,
  }), [mode, humanAgent, isAgentRequested, queuePosition, requestHumanAgent, switchToAI]);
}

export default useChatWidget;
