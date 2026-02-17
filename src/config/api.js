import axios from "axios";
import { io } from "socket.io-client";

// ============================================
// CONFIGURATION
// ============================================

// API Base URL - uses environment variable in production, localhost in development
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://beautyplug.com.ng";

console.log("🔧 API Configuration:");
console.log("   Base URL:", API_BASE_URL);
console.log("   Environment:", import.meta.env.MODE);

// ============================================
// AXIOS INSTANCE CONFIGURATION
// ============================================

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  // CRITICAL FIX: Enable withCredentials for authentication/cookies
  withCredentials: true,
});

console.log("✅ Axios configured with credentials enabled");

// ============================================
// SOCKET.IO CONFIGURATION
// ============================================

let socket = null;

/**
 * Initialize Socket.IO connection with proper CORS configuration
 * @returns {Socket} Socket.IO instance
 */
export const initSocket = () => {
  if (!socket) {
    console.log("🔌 Initializing Socket.IO connection...");
    console.log("   Server URL:", API_BASE_URL);

    socket = io(API_BASE_URL, {
      // Transport configuration
      transports: ["websocket", "polling"], // Try websocket first for better performance
      
      // Reconnection settings
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      
      // Timeout settings
      timeout: 20000,
      connectTimeout: 20000,
      
      // CRITICAL FIX: Enable withCredentials for authenticated socket connections
      withCredentials: true,
      
      // Additional stability options
      autoConnect: true,
      forceNew: false,
    });

    // ============================================
    // SOCKET EVENT HANDLERS
    // ============================================

    // Connection successful
    socket.on("connect", () => {
      console.log("✅ Socket connected successfully");
      console.log("   Socket ID:", socket.id);
      console.log("   Transport:", socket.io.engine.transport.name);
      console.log("   Connected to:", API_BASE_URL);
    });

    // Disconnection
    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected");
      console.log("   Reason:", reason);
      console.log("   Will reconnect:", socket.io.reconnection);
      
      // Auto-reconnect messages
      if (reason === "io server disconnect") {
        console.log("   💡 Server initiated disconnect. Reconnecting...");
      } else if (reason === "transport close") {
        console.log("   💡 Transport closed. Will auto-reconnect...");
      }
    });

    // Connection errors
    socket.on("connect_error", (error) => {
      console.error("🚨 Socket connection error:", error.message);
      console.error("   Type:", error.type);
      console.error("   Description:", error.description);
      
      // Provide helpful debugging hints
      if (error.message.includes("CORS")) {
        console.error("   💡 CORS issue detected!");
        console.error("   → Check backend CORS configuration");
        console.error("   → Ensure withCredentials is enabled on both sides");
      } else if (error.message.includes("timeout")) {
        console.error("   💡 Connection timeout!");
        console.error("   → Check if backend server is running");
        console.error("   → Verify network connectivity");
      } else if (error.message.includes("xhr poll error")) {
        console.error("   💡 Polling transport failed!");
        console.error("   → May be a network/firewall issue");
        console.error("   → Check backend Socket.IO configuration");
      }
    });

    // Reconnection events
    socket.on("reconnect", (attemptNumber) => {
      console.log(`🔄 Socket reconnected after ${attemptNumber} attempts`);
      console.log("   Socket ID:", socket.id);
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`🔄 Reconnection attempt ${attemptNumber}/5...`);
    });

    socket.on("reconnect_error", (error) => {
      console.error("❌ Reconnection error:", error.message);
    });

    socket.on("reconnect_failed", () => {
      console.error("❌ Socket reconnection failed after all attempts");
      console.error("   💡 Please refresh the page or check your connection");
    });

    // Transport upgrade (polling → websocket)
    socket.io.engine.on("upgrade", (transport) => {
      console.log(`⬆️  Transport upgraded to: ${transport.name}`);
    });

    // Generic error handler
    socket.on("error", (error) => {
      console.error("⚠️  Socket error:", error);
    });

    console.log("✅ Socket event handlers configured");
  }

  return socket;
};

/**
 * Get existing Socket.IO instance
 * @returns {Socket|null} Socket.IO instance or null if not initialized
 */
export const getSocket = () => {
  if (!socket) {
    console.warn("⚠️  Socket not initialized. Call initSocket() first.");
  }
  return socket;
};

/**
 * Disconnect socket manually
 */
export const disconnectSocket = () => {
  if (socket) {
    console.log("🔌 Disconnecting socket manually...");
    socket.disconnect();
    socket = null;
    console.log("✅ Socket disconnected");
  }
};

/**
 * Check if socket is connected
 * @returns {boolean} Connection status
 */
export const isSocketConnected = () => {
  return socket && socket.connected;
};

// ============================================
// AXIOS INTERCEPTORS
// ============================================

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development
    if (import.meta.env.MODE === "development") {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.MODE === "development") {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
      );
    }
    return response;
  },
  (error) => {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`❌ API Error ${status}:`, data?.message || data?.error);

      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.warn("⚠️  Authentication expired. Please log in again.");
          localStorage.removeItem("token");
          
          // Optional: Redirect to login
          // window.location.href = '/login';
          break;

        case 403:
          // Forbidden - CORS or permission issue
          console.warn("⚠️  Access forbidden.");
          
          if (data?.message?.includes("CORS") || data?.error?.includes("CORS")) {
            console.error("💡 CORS error detected!");
            console.error("   → Backend may not allow your origin");
            console.error("   → Check CORS configuration on server");
            console.error("   → Verify withCredentials is enabled");
          } else {
            console.warn("   → You don't have permission for this action");
          }
          break;

        case 404:
          console.warn("⚠️  Resource not found");
          console.warn(`   → Endpoint: ${error.config?.url}`);
          break;

        case 500:
          console.error("❌ Server error. Please try again later.");
          break;

        case 502:
        case 503:
        case 504:
          console.error("❌ Server is temporarily unavailable.");
          console.error("   💡 Backend server may be down or restarting");
          break;

        default:
          console.error(`❌ Unexpected error (${status})`);
          break;
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("❌ Network error - no response from server");
      console.error("   This could be due to:");
      console.error("   • Network connectivity issues");
      console.error("   • Server is down or unreachable");
      console.error("   • CORS configuration blocking the request");
      console.error("   • Firewall/proxy blocking the request");
      console.error("   • Wrong API URL:", API_BASE_URL);
    } else {
      // Something else happened in request setup
      console.error("❌ Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Test CORS configuration
 * @returns {Promise<Object>} Test result
 */
export const testCORS = async () => {
  try {
    console.log("🧪 Testing CORS configuration...");
    const response = await api.get("/api/cors-test");
    console.log("✅ CORS test passed!");
    console.log("   Response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ CORS test failed:", error.message);
    return { 
      success: false, 
      error: error.message,
      details: error.response?.data 
    };
  }
};

/**
 * Test API health
 * @returns {Promise<Object>} Health check result
 */
export const testHealth = async () => {
  try {
    console.log("🏥 Testing API health...");
    const response = await api.get("/health");
    console.log("✅ API is healthy!");
    console.log("   Status:", response.data.status);
    console.log("   Uptime:", Math.round(response.data.uptime), "seconds");
    console.log("   Socket connections:", response.data.socketConnections);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Get current connection status
 * @returns {Object} Connection status for API and Socket
 */
export const getConnectionStatus = () => {
  const status = {
    api: {
      baseURL: API_BASE_URL,
      configured: true,
      withCredentials: true,
    },
    socket: {
      initialized: socket !== null,
      connected: socket?.connected || false,
      id: socket?.id || null,
      transport: socket?.io?.engine?.transport?.name || null,
    },
    timestamp: new Date().toISOString(),
  };

  console.log("📊 Connection Status:", status);
  return status;
};

/**
 * Run comprehensive diagnostics
 * @returns {Promise<Object>} Diagnostic results
 */
export const runDiagnostics = async () => {
  console.log("🔍 Running comprehensive diagnostics...");
  console.log("");

  const results = {
    timestamp: new Date().toISOString(),
    configuration: getConnectionStatus(),
    tests: {},
  };

  // Test 1: Health check
  console.log("Test 1: Health Check");
  results.tests.health = await testHealth();
  console.log("");

  // Test 2: CORS
  console.log("Test 2: CORS Configuration");
  results.tests.cors = await testCORS();
  console.log("");

  // Test 3: Socket.IO
  console.log("Test 3: Socket.IO Connection");
  if (socket && socket.connected) {
    console.log("✅ Socket is connected");
    results.tests.socket = { success: true, connected: true, id: socket.id };
  } else {
    console.log("⚠️  Socket is not connected");
    results.tests.socket = { success: false, connected: false };
  }
  console.log("");

  // Summary
  const allPassed = Object.values(results.tests).every((test) => test.success);
  console.log("═══════════════════════════════════════");
  console.log(allPassed ? "✅ All tests PASSED!" : "⚠️  Some tests FAILED");
  console.log("═══════════════════════════════════════");

  return results;
};


// Export axios instance as default
export default api;

// Export base URL
export { API_BASE_URL };
