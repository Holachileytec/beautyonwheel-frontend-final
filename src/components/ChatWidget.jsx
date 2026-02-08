import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { useChat, SenderType, ChatMode } from "../context/ChatContext.jsx";
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaUser, 
  FaRobot, 
  FaHeadset,
  FaExchangeAlt,
  FaInfoCircle
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/ChatWidget.css";

// Time formatter
const timeFormatter = new Intl.DateTimeFormat(undefined, { 
  hour: '2-digit', 
  minute: '2-digit' 
});

const formatTime = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return timeFormatter.format(date);
  } catch {
    return '';
  }
};

// Message Avatar Component
const MessageAvatar = memo(({ sender }) => {
  const getAvatarConfig = () => {
    switch (sender) {
      case SenderType.AI:
        return { icon: <FaRobot />, className: 'avatar-ai' };
      case SenderType.HUMAN:
        return { icon: <FaHeadset />, className: 'avatar-human' };
      case SenderType.SYSTEM:
        return { icon: <FaInfoCircle />, className: 'avatar-system' };
      default:
        return { icon: <FaUser />, className: 'avatar-user' };
    }
  };

  const { icon, className } = getAvatarConfig();

  return (
    <div className={`message-avatar ${className}`}>
      {icon}
    </div>
  );
});

// Sender Label Component
const SenderLabel = memo(({ sender, senderName }) => {
  const getLabel = () => {
    switch (sender) {
      case SenderType.AI:
        return 'AI Assistant';
      case SenderType.HUMAN:
        return senderName || 'Support Agent';
      case SenderType.SYSTEM:
        return 'System';
      default:
        return null;
    }
  };

  const label = getLabel();
  if (!label) return null;

  return <span className={`sender-label sender-${sender}`}>{label}</span>;
});

// Single Message Component
const Message = memo(({ message }) => {
  const { text, sender, timestamp, senderName } = message;
  const isUser = sender === SenderType.USER;
  const isSystem = sender === SenderType.SYSTEM;

  if (isSystem) {
    return (
      <motion.div
        className="message system"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="system-message-content">
          <FaInfoCircle />
          <span>{text}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`message ${isUser ? 'user' : 'bot'} ${sender}`}
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      {!isUser && <MessageAvatar sender={sender} />}
      <div className="message-content">
        {!isUser && <SenderLabel sender={sender} senderName={senderName} />}
        <div className={`message-bubble bubble-${sender}`}>
          {text}
        </div>
        <span className="message-time">
          {formatTime(timestamp)}
        </span>
      </div>
      {isUser && <MessageAvatar sender={sender} />}
    </motion.div>
  );
});

// Typing Indicator Component
const TypingIndicator = memo(({ isHumanMode, agentName }) => {
  return (
    <motion.div
      className={`message bot typing-message ${isHumanMode ? 'human' : 'ai'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={`message-avatar ${isHumanMode ? 'avatar-human' : 'avatar-ai'}`}>
        {isHumanMode ? <FaHeadset /> : <FaRobot />}
      </div>
      <div className="message-content">
        <span className={`sender-label sender-${isHumanMode ? 'human' : 'ai'}`}>
          {isHumanMode ? (agentName || 'Agent') : 'AI'} is typing
        </span>
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.div>
  );
});

// Agent Mode Indicator Component
const AgentModeIndicator = memo(({ 
  mode, 
  humanAgent, 
  isAgentRequested, 
  onSwitchToHuman, 
  onSwitchToAI 
}) => {
  const isHumanMode = mode === ChatMode.HUMAN;
  
  const statusText = useMemo(() => {
    if (isHumanMode && humanAgent) {
      return `Connected with ${humanAgent.name}`;
    }
    if (isAgentRequested) {
      return 'Connecting to agent...';
    }
    return 'AI Assistant';
  }, [isHumanMode, humanAgent, isAgentRequested]);

  return (
    <div className={`agent-mode-indicator ${isHumanMode ? 'human' : 'ai'}`}>
      <div className="mode-info">
        <div className={`mode-icon ${isHumanMode ? 'human' : 'ai'}`}>
          {isHumanMode ? <FaHeadset /> : <FaRobot />}
        </div>
        <span className="mode-text">{statusText}</span>
        {isAgentRequested && !isHumanMode && (
          <span className="connecting-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        )}
      </div>
      <button 
        className="mode-switch-btn"
        onClick={isHumanMode ? onSwitchToAI : onSwitchToHuman}
        disabled={isAgentRequested && !isHumanMode}
        title={isHumanMode ? 'Switch to AI' : 'Talk to human'}
      >
        <FaExchangeAlt />
        <span>{isHumanMode ? 'Use AI' : 'Human'}</span>
      </button>
    </div>
  );
});

// Queue Indicator Component
const QueueIndicator = memo(({ position }) => {
  if (!position) return null;
  
  return (
    <motion.div 
      className="queue-indicator"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <FaInfoCircle />
      <span>You are #{position} in queue. An agent will be with you shortly.</span>
    </motion.div>
  );
});

// Quick Replies Component
const QuickReplies = memo(({ onReply }) => {
  const quickReplies = [
    "Book an appointment",
    "View services",
    "Pricing info",
    "Talk to human"
  ];

  return (
    <div className="quick-replies">
      {quickReplies.map((reply, idx) => (
        <motion.button
          key={idx}
          className="quick-reply-btn"
          onClick={() => onReply(reply)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
});

// Welcome Screen Component
const WelcomeScreen = memo(({ onQuickReply }) => {
  return (
    <div className="chat-welcome">
      <div className="welcome-icon">
        <FaComments />
      </div>
      <h5>Welcome to BeautyOnWheel!</h5>
      <p>
        I'm your AI assistant. Ask me about our services, booking, or pricing.
        You can also request to speak with a human agent anytime!
      </p>
      <QuickReplies onReply={onQuickReply} />
    </div>
  );
});

// Main ChatWidget Component
export const ChatWidget = () => {
  const {
    config,
    messages,
    isTyping,
    unreadCount,
    mode,
    humanAgent,
    isAgentRequested,
    queuePosition,
    connectionStatus,
    isOpen,
    toggleChat,
    sendMessage,
    requestHumanAgent,
    switchToAI,
    isHumanMode,
  } = useChat();

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle send message
  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;
    
    sendMessage(inputMessage.trim());
    setInputMessage("");
  }, [inputMessage, sendMessage]);

  // Handle quick reply
  const handleQuickReply = useCallback((reply) => {
    sendMessage(reply);
  }, [sendMessage]);

  // Handle key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Get header status text
  const headerStatus = useMemo(() => {
    if (isHumanMode && humanAgent) {
      return `Connected with ${humanAgent.name}`;
    }
    if (connectionStatus === 'connected') {
      return 'Online | AI-powered support';
    }
    if (connectionStatus === 'disconnected') {
      return 'Reconnecting...';
    }
    return 'Online | AI Assistant';
  }, [isHumanMode, humanAgent, connectionStatus]);

  // Check if should show welcome screen
  const showWelcome = messages.length <= 1;

  if (!config) return null;

  return (
    <div className="chat-widget-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ "--primary-color": config.primaryColor || "#e91e63" }}
          >
            {/* Header */}
            <div className={`chat-header ${isHumanMode ? 'human-mode' : 'ai-mode'}`}>
              <div className="chat-header-info">
                <div className="chat-avatar">
                  {isHumanMode ? <FaHeadset /> : <FaRobot />}
                  <span className={`online-indicator ${connectionStatus}`}></span>
                </div>
                <div className="chat-header-text">
                  <h6>{isHumanMode && humanAgent ? humanAgent.name : config.headerTitle}</h6>
                  <span className="status-text">{headerStatus}</span>
                </div>
              </div>
              <button 
                className="chat-close-btn"
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Agent Mode Indicator */}
            <AgentModeIndicator
              mode={mode}
              humanAgent={humanAgent}
              isAgentRequested={isAgentRequested}
              onSwitchToHuman={requestHumanAgent}
              onSwitchToAI={switchToAI}
            />

            {/* Queue Indicator */}
            {isAgentRequested && !isHumanMode && (
              <QueueIndicator position={queuePosition} />
            )}

            {/* Messages Area */}
            <div className="chat-messages">
              {showWelcome ? (
                <WelcomeScreen onQuickReply={handleQuickReply} />
              ) : null}

              {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
              ))}
              
              {isTyping && (
                <TypingIndicator 
                  isHumanMode={isHumanMode} 
                  agentName={humanAgent?.name} 
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chat-input-area">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                placeholder={config.inputPlaceholder || "Type your message..."}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="chat-input"
              />
              <button
                onClick={handleSendMessage}
                className="chat-send-btn"
                disabled={!inputMessage.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>

            {/* Footer */}
            <div className="chat-footer">
              <span>Powered by BeautyOnWheel AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ backgroundColor: config.primaryColor || "#e91e63" }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaComments />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && unreadCount > 0 && (
          <motion.span 
            className="unread-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
