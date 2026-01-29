import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext.jsx";
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/ChatWidget.css";

export const ChatWidget = () => {
  const config = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickReplies = [
    "Book an appointment",
    "View services",
    "Pricing info",
    "Contact support"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Simulate bot response
  const simulateBotResponse = (userMessage) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = {
        "book an appointment": "Great! You can book an appointment by visiting our 'Book a Session' page. Would you like me to guide you there?",
        "view services": "We offer a wide range of beauty services including makeup, hair styling, manicure, pedicure, and massage. Check out our Services section for more details!",
        "pricing info": "Our prices vary depending on the service. Basic services start from $30. Visit our pricing page for detailed information.",
        "contact support": "You can reach our support team at support@beautyonwheel.com or call us at +1-234-567-8900.",
        "default": "Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to explore our services."
      };

      const lowerMessage = userMessage.toLowerCase();
      let botResponse = responses.default;
      
      for (const key of Object.keys(responses)) {
        if (lowerMessage.includes(key)) {
          botResponse = responses[key];
          break;
        }
      }

      setMessages(prev => [...prev, {
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    simulateBotResponse(message);
  };

  const handleQuickReply = (reply) => {
    setMessage(reply);
    const newMessage = {
      text: reply,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    simulateBotResponse(reply);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
            style={{ "--primary-color": config.primaryColor }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <FaRobot />
                  <span className="online-indicator"></span>
                </div>
                <div className="chat-header-text">
                  <h6>{config.headerTitle}</h6>
                  <span className="status-text">Online | Typically replies instantly</span>
                </div>
              </div>
              <button 
                className="chat-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages Area */}
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-welcome">
                  <div className="welcome-icon">
                    <FaComments />
                  </div>
                  <h5>Welcome to BeautyOnWheel!</h5>
                  <p>How can we help you today? Choose a quick option below or type your message.</p>
                  
                  {/* Quick Replies */}
                  <div className="quick-replies">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        className="quick-reply-btn"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      className={`message ${msg.sender}`}
                      initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="message-avatar">
                        {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
                      </div>
                      <div className="message-content">
                        <div className="message-bubble">
                          {msg.text}
                        </div>
                        <span className="message-time">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className="message bot"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="message-avatar">
                        <FaRobot />
                      </div>
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="chat-input-area">
              <input
                ref={inputRef}
                type="text"
                value={message}
                placeholder={config.inputPlaceholder || "Type your message..."}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="chat-input"
              />
              <button
                onClick={handleSendMessage}
                className="chat-send-btn"
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>

            {/* Footer */}
            <div className="chat-footer">
              <span>Powered by BeautyOnWheel</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ backgroundColor: config.primaryColor }}
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
        {!isOpen && messages.length > 0 && (
          <span className="unread-badge">{messages.length}</span>
        )}
      </motion.button>
    </div>
  );
};
