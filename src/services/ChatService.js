import { io } from "socket.io-client";

const AI_CONFIG = {
  typingDelay: { min: 500, max: 1500 },
  responseDelay: { min: 1000, max: 2000 },
};

const AI_KNOWLEDGE_BASE = {
  greetings: [
    "Hello! Welcome to BeautyOnWheel. I'm your AI assistant. How can I help you today?",
    "Hi there! I'm your BeautyOnWheel AI assistant. What can I help you with?",
    "Welcome! I'm here to help with your beauty service needs. How may I assist you?",
  ],
  services: {
    keywords: [
      "service",
      "services",
      "offer",
      "what do you",
      "available",
      "provide",
      "do you do",
    ],
    responses: [
      "We offer a wide range of mobile beauty services including:\n\n• Hair styling & treatments\n• Professional makeup application\n• Manicure & pedicure\n• Facial treatments\n• Relaxing massage therapy\n• Bridal packages\n\nAll services come to your location! Would you like details on any specific service?",
    ],
  },
  booking: {
    keywords: [
      "book",
      "appointment",
      "schedule",
      "reserve",
      "available time",
      "slot",
      "session",
    ],
    responses: [
      "I'd be happy to help you book an appointment! Here's how to get started:\n\n1. Click on 'Book a Session' in the menu\n2. Select your desired service\n3. Choose a beautician\n4. Pick a convenient date and time\n5. Confirm your location\n\nWould you like me to connect you with a human agent to assist with your booking?",
    ],
  },
  pricing: {
    keywords: [
      "price",
      "cost",
      "how much",
      "pricing",
      "rate",
      "fee",
      "charge",
      "expensive",
    ],
    responses: [
      "Our pricing varies based on the service and beautician. Here's a general overview:\n\n• Basic services: Starting from ₦5,000\n• Premium services: Starting from ₦15,000\n• Bridal packages: Custom pricing\n• Home service fee: Included!\n\nFor exact pricing, check our services page or I can connect you with our team.",
    ],
  },
  location: {
    keywords: [
      "location",
      "area",
      "where",
      "city",
      "coverage",
      "come to",
      "address",
      "lagos",
      "abuja",
    ],
    responses: [
      "BeautyOnWheel is a mobile beauty service - we come to YOU! We currently serve:\n\n• Lagos and surrounding areas\n• Abuja and surrounding areas\n• Other major cities (limited availability)\n\nJust provide your address when booking, and our beauticians will come to your location.",
    ],
  },
  beautician: {
    keywords: [
      "beautician",
      "stylist",
      "professional",
      "who will",
      "expert",
      "artist",
      "makeup artist",
    ],
    responses: [
      "All our beauticians are certified professionals with extensive experience. You can:\n\n• Browse beautician profiles on our platform\n• View ratings and customer reviews\n• See their portfolio of work\n• Choose your preferred professional\n• Read about their specialties\n\nWould you like recommendations based on your service needs?",
    ],
  },
  payment: {
    keywords: [
      "pay",
      "payment",
      "card",
      "cash",
      "transfer",
      "method",
      "paystack",
    ],
    responses: [
      "We accept multiple payment methods for your convenience:\n\n• Card payments (Visa, Mastercard)\n• Bank transfers\n• Mobile payments\n• Cash on service completion\n\nAll online payments are secured and processed through Paystack. You can pay before or after your service.",
    ],
  },
  cancel: {
    keywords: [
      "cancel",
      "reschedule",
      "change appointment",
      "modify booking",
      "postpone",
    ],
    responses: [
      "To cancel or reschedule your appointment:\n\n1. Go to your User Dashboard\n2. Find 'My Bookings'\n3. Select the appointment\n4. Choose 'Reschedule' or 'Cancel'\n\nNote: Cancellations within 2 hours of the appointment may incur a fee. Need help with a specific booking?",
    ],
  },
  account: {
    keywords: [
      "account",
      "login",
      "sign up",
      "register",
      "password",
      "profile",
    ],
    responses: [
      "For account-related queries:\n\n• To create an account: Click 'Sign Up' in the navigation\n• To log in: Click 'Login' and enter your credentials\n• Forgot password: Use the 'Forgot Password' link\n• Update profile: Go to your User Dashboard\n\nWould you like help with anything specific?",
    ],
  },
  humanRequest: {
    keywords: [
      "human",
      "agent",
      "person",
      "real person",
      "speak to someone",
      "talk to",
      "representative",
      "support team",
      "live chat",
      "customer service",
    ],
    responses: [
      "I understand you'd like to speak with a human agent. Let me connect you with one of our support team members. Please wait a moment while I find an available agent...",
    ],
    action: "REQUEST_HUMAN",
  },
  thanks: {
    keywords: ["thank", "thanks", "appreciate", "helpful"],
    responses: [
      "You're welcome! Is there anything else I can help you with?",
      "Happy to help! Feel free to ask if you have more questions.",
      "My pleasure! Let me know if you need any other assistance.",
    ],
  },
  bye: {
    keywords: ["bye", "goodbye", "see you", "later", "that's all"],
    responses: [
      "Goodbye! Thank you for choosing BeautyOnWheel. Have a beautiful day!",
      "Take care! Don't hesitate to reach out if you need anything.",
      "See you next time! Enjoy your beauty experience with us.",
    ],
  },
  fallback: [
    "I'm not sure I fully understand. Could you please rephrase your question?",
    "I'd like to help! Could you provide more details about what you're looking for?",
    "That's a great question! For more detailed assistance, would you like me to connect you with a human agent?",
    "I'm still learning! You can also check our FAQ page or I can connect you with our support team.",
  ],
};

class ChatServiceClass {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.sessionId = null;
    this.mode = "ai";
    this.humanAgent = null;
    this.isAgentRequested = false; // ← initialized here
    this.eventHandlers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.serverUrl = null;
  }

  init(options = {}) {
    this.serverUrl =
      options.serverUrl || import.meta.env.VITE_CHAT_SERVER_URL || null;
    this.sessionId = options.sessionId || this.generateSessionId();
    if (this.serverUrl && options.enableRealtime !== false) {
      this.connect();
    }
    return this;
  }

  connect() {
    if (!this.serverUrl || this.socket?.connected) return;
    try {
      this.socket = io(`${this.serverUrl}/chat`, {
        transports: ["websocket", "polling"],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        auth: { sessionId: this.sessionId },
      });
      this.setupSocketListeners();
    } catch (error) {
      console.error("Failed to connect to chat server:", error);
      this.emit("connectionError", error);
    }
  }

  setupSocketListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit("connected", { sessionId: this.sessionId });
    });

    this.socket.on("disconnect", (reason) => {
      this.isConnected = false;
      this.emit("disconnected", { reason });
    });

    this.socket.on("connect_error", (error) => {
      this.reconnectAttempts++;
      this.emit("connectionError", { error, attempts: this.reconnectAttempts });
    });

   
    this.socket.on("agent:message", (data) => {
      this.emit("messageReceived", {
        ...data,
        sender: "human",
        senderName: this.humanAgent?.name || "Support Agent",
      });
    });

    // ✅ Correct placement — inside setupSocketListeners
    this.socket.on("agent:connected", (agent) => {
      this.humanAgent = agent;
      this.mode = "human";
      this.isAgentRequested = false; // ← reset
      this.emit("agentConnected", agent);
    });
    // Add inside setupSocketListeners()
    this.socket.on("session:initialized", (data) => {
      // Server confirms the session — no action needed but good to log
      console.log("Session initialized:", data.sessionId, "mode:", data.mode);
      if (data.mode === "human" && data.agentInfo?.name) {
        // Reconnected into an existing human session
        this.mode = "human";
        this.humanAgent = data.agentInfo;
        this.emit("agentConnected", data.agentInfo);
      }
    });
    this.socket.on("agent:disconnected", () => {
      this.humanAgent = null;
      this.mode = "ai";
      this.isAgentRequested = false; // ← reset
      this.emit("agentDisconnected");
    });

    this.socket.on("agent:typing", ({ isTyping }) => {
      this.emit("agentTyping", isTyping);
    });

    this.socket.on("queue:position", (position) => {
      this.emit("queuePosition", position);
    });

    this.socket.on("mode:changed", (data) => {
      this.mode = data.mode || data;
      this.emit("modeChanged", this.mode);
    });
  }

  async sendMessage(text) {
    const userMessage = {
      id: this.generateMessageId(),
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    this.emit("messageSent", userMessage);

    if (this.mode === "human" || this.humanAgent || this.isAgentRequested) {
      if (this.isConnected && this.socket) {
        this.socket.emit("user:message", {
          sessionId: this.sessionId,
          message: userMessage,
        });
      } else {
        // FIX: socket unavailable while in human/queue mode — surface an error
        // instead of silently dropping the message
        this.emit("messageReceived", {
          id: this.generateMessageId(),
          text: "Your message could not be sent. Please check your connection.",
          sender: "system",
          timestamp: new Date().toISOString(),
        });
      }
      return userMessage;
    }

    return this.getAIResponse(text);
  }
  async getAIResponse(text) {
    this.emit("aiTyping", true);
    await this.delay(
      this.randomBetween(AI_CONFIG.typingDelay.min, AI_CONFIG.typingDelay.max),
    );
    const response = this.generateAIResponse(text);
    await this.delay(
      this.randomBetween(
        AI_CONFIG.responseDelay.min,
        AI_CONFIG.responseDelay.max,
      ),
    );
    this.emit("aiTyping", false);

    const aiMessage = {
      id: this.generateMessageId(),
      text: response.text,
      sender: "ai",
      senderName: "BeautyOnWheel AI",
      timestamp: new Date().toISOString(),
    };

    this.emit("messageReceived", aiMessage);

    if (response.action === "REQUEST_HUMAN") {
      setTimeout(() => this.requestHumanAgent(), 1500);
    }

    return aiMessage;
  }

  generateAIResponse(text) {
    const lowerText = text.toLowerCase().trim();
    if (
      /^(hi|hello|hey|good\s?(morning|afternoon|evening)|howdy)/.test(lowerText)
    ) {
      return { text: this.randomChoice(AI_KNOWLEDGE_BASE.greetings) };
    }
    for (const [category, data] of Object.entries(AI_KNOWLEDGE_BASE)) {
      if (category === "greetings" || category === "fallback") continue;
      if (
        data.keywords &&
        data.keywords.some((keyword) => lowerText.includes(keyword))
      ) {
        return {
          text: this.randomChoice(data.responses),
          action: data.action || null,
        };
      }
    }
    return { text: this.randomChoice(AI_KNOWLEDGE_BASE.fallback) };
  }

  requestHumanAgent() {
    this.isAgentRequested = true; // ← set flag

    if (this.isConnected && this.socket) {
      this.socket.emit("user:requestAgent", {
        sessionId: this.sessionId,
        userInfo: this.getUserInfo(),
      });
      this.emit("agentRequested");
    } else {
      this.emit("messageReceived", {
        id: this.generateMessageId(),
        text: "I'm connecting you to a human agent. Our support team typically responds within a few minutes during business hours (9 AM - 6 PM WAT). Please describe your issue in detail while you wait.",
        sender: "system",
        timestamp: new Date().toISOString(),
      });
      this.emit("agentRequested");
    }
  }

  // ✅ Correct placement — standalone method inside the class
  switchToAI() {
    this.mode = "ai";
    this.humanAgent = null;
    this.isAgentRequested = false; // ← reset
    this.emit("modeChanged", "ai");
    if (this.isConnected && this.socket) {
      this.socket.emit("user:endHumanChat", { sessionId: this.sessionId });
    }
  }

  sendTypingIndicator(isTyping) {
    if (this.isConnected && this.mode === "human" && this.socket) {
      this.socket.emit("user:typing", { sessionId: this.sessionId, isTyping });
    }
  }

  getConnectionStatus() {
    if (!this.socket) return "ai_only";
    if (this.isConnected) return "connected";
    if (this.reconnectAttempts > 0) return "reconnecting";
    return "disconnected";
  }

  getMode() {
    return this.mode;
  }
  getHumanAgent() {
    return this.humanAgent;
  }
  getUserInfo() {
    return this.userInfo || {};
  }

  setUserInfo(info) {
    this.userInfo = info;
    if (this.isConnected && this.socket) {
      this.socket.emit("user:updateInfo", {
        sessionId: this.sessionId,
        userInfo: info,
      });
    }
  }

  on(event, handler) {
    if (!this.eventHandlers.has(event)) this.eventHandlers.set(event, []);
    this.eventHandlers.get(event).push(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (!this.eventHandlers.has(event)) return;
    const handlers = this.eventHandlers.get(event);
    const index = handlers.indexOf(handler);
    if (index > -1) handlers.splice(index, 1);
  }

  emit(event, data) {
    if (!this.eventHandlers.has(event)) return;
    this.eventHandlers.get(event).forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in handler for event ${event}:`, error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnected = false;
    this.humanAgent = null;
    this.mode = "ai";
    this.isAgentRequested = false;
  }

  generateSessionId() {
    try {
      const stored = localStorage.getItem("chat_session_id");
      if (stored) return stored;
      const id = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("chat_session_id", id);
      return id;
    } catch {
      // SSR or storage blocked — fall back to in-memory ID
      return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
  }

  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

const ChatService = new ChatServiceClass();
export default ChatService;
export { ChatService };
