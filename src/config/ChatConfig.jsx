/**
 * Chat Widget Configuration
 *
 * This configuration controls the behavior and appearance of the
 * BeautyOnWheel real-time chat support widget with AI and human agent support.
 */

const ChatConfig = {
  // Appearance
  primaryColor: "#6366f1", // Indigo - changes to green in human mode
  position: "bottom-right",

  // Header
  headerTitle: "BeautyOnWheel Support",
  headerSubtitle: "AI-powered support with human backup",

  // Input
  inputPlaceholder: "Type your message...",

  // Welcome Message (shown as first AI message)
  welcomeMessage:
    "Hello! I'm your BeautyOnWheel AI assistant. How can I help you today? Ask about our services, booking, pricing, or request to speak with a human agent anytime!",

  // Offline Message (when server is unreachable)
  offlineMessage:
    "We're currently in AI-only mode. You can still chat with our AI assistant!",

  // Real-time Server Configuration
  // Set this to your Socket.io server URL for human agent support
  // Leave null for AI-only mode

  serverUrl: import.meta.env.VITE_CHAT_SERVER_URL || null, //Production: http://167.71.150.48

  // Enable real-time features (requires serverUrl)
  enableRealtime: true,

  // Session Management
  sessionId: null, // Auto-generated if null

  // Features
  showOnlineStatus: true,
  enableQuickReplies: true,
  enableTypingIndicator: true,
  enableSoundNotifications: true,
  enableAgentMode: true, // Allow switching between AI and human

  // AI Configuration
  ai: {
    enabled: true,
    typingDelay: { min: 500, max: 1500 }, // Simulate typing
    responseDelay: { min: 1000, max: 2000 }, // Response time
  },

  // Human Agent Configuration
  humanAgent: {
    enabled: true,
    queueEnabled: true,
    businessHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Africa/Lagos", // WAT
    },
  },
};

export default ChatConfig;
