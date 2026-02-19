import axios from "axios";
import { io } from "socket.io-client";

// ============================================
// CONFIGURATION
// ============================================

<<<<<<< HEAD
// FIX #1: In development, use a RELATIVE base URL ("/") so Vite's proxy
// handles the request locally — the browser never makes a cross-origin call.
// In production the real domain is used (served by Nginx on same origin or
// with proper CORS headers).
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "" // ← relative: requests go to localhost:5173 → Vite proxy → backend
    : "https://beautyplug.com.ng");

// The socket always needs an absolute URL to connect.
// In dev we connect directly to the backend; in prod, through Nginx.
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://beautyplug.com.ng");

console.log("🔧 API Configuration:");
console.log("   Base URL:", API_BASE_URL || "(relative — using Vite proxy)");
console.log("   Socket URL:", SOCKET_URL);
console.log("   Environment:", import.meta.env.MODE);

// ============================================
// AXIOS INSTANCE
// ============================================

=======
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
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
<<<<<<< HEAD
  // FIX #2: withCredentials must be true on the client when the server sets
  // credentials: true in its CORS config. Keep both in sync.
  withCredentials: true,
});

console.log("✅ Axios instance configured");

// ============================================
// SOCKET.IO
=======
  // CRITICAL FIX: Enable withCredentials for authentication/cookies
  withCredentials: true,
});

console.log("✅ Axios configured with credentials enabled");

// ============================================
// SOCKET.IO CONFIGURATION
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
// ============================================

let socket = null;

/**
<<<<<<< HEAD
 * Initialize Socket.IO connection
=======
 * Initialize Socket.IO connection with proper CORS configuration
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
 * @returns {Socket} Socket.IO instance
 */
export const initSocket = () => {
  if (!socket) {
<<<<<<< HEAD
    console.log("🔌 Initializing Socket.IO...");
    console.log("   Server:", SOCKET_URL);

    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
=======
    console.log("🔌 Initializing Socket.IO connection...");
    console.log("   Server URL:", API_BASE_URL);

    socket = io(API_BASE_URL, {
      // Transport configuration
      transports: ["websocket", "polling"], // Try websocket first for better performance
      
      // Reconnection settings
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
<<<<<<< HEAD
      timeout: 20000,
      connectTimeout: 20000,
      withCredentials: true,
=======
      
      // Timeout settings
      timeout: 20000,
      connectTimeout: 20000,
      
      // CRITICAL FIX: Enable withCredentials for authenticated socket connections
      withCredentials: true,
      
      // Additional stability options
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
      autoConnect: true,
      forceNew: false,
    });

<<<<<<< HEAD
    // --- Event Handlers ---

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      console.log("   Transport:", socket.io.engine.transport.name);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        console.log("   💡 Server closed connection. Reconnecting...");
        socket.connect();
      }
    });

    socket.on("connect_error", (error) => {
      console.error("🚨 Socket error:", error.message);
      if (error.message.includes("CORS")) {
        console.error(
          "   💡 CORS issue — check backend Socket.IO origin config",
        );
      }
    });

    socket.on("reconnect", (n) =>
      console.log(`🔄 Reconnected after ${n} attempt(s)`),
    );
    socket.on("reconnect_attempt", (n) =>
      console.log(`🔄 Reconnect attempt ${n}/5...`),
    );
    socket.on("reconnect_failed", () =>
      console.error("❌ All reconnection attempts failed — please refresh"),
    );

=======
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
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
    socket.io.engine.on("upgrade", (transport) => {
      console.log(`⬆️  Transport upgraded to: ${transport.name}`);
    });

<<<<<<< HEAD
    console.log("✅ Socket event handlers registered");
=======
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
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
  }

  return socket;
};

<<<<<<< HEAD
export const getSocket = () => {
  if (!socket)
    console.warn("⚠️  Socket not initialized. Call initSocket() first.");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
=======
/**
 * Disconnect socket manually
 */
export const disconnectSocket = () => {
  if (socket) {
    console.log("🔌 Disconnecting socket manually...");
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
    socket.disconnect();
    socket = null;
    console.log("✅ Socket disconnected");
  }
};

<<<<<<< HEAD
export const isSocketConnected = () => socket?.connected || false;
=======
/**
 * Check if socket is connected
 * @returns {boolean} Connection status
 */
export const isSocketConnected = () => {
  return socket && socket.connected;
};
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34

// ============================================
// AXIOS INTERCEPTORS
// ============================================

<<<<<<< HEAD
// Request — attach auth token
=======
// Request interceptor - Add auth token
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (import.meta.env.MODE === "development") {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    }

<<<<<<< HEAD
    return config;
  },
  (error) => {
    console.error("❌ Request setup error:", error);
=======
    // Log requests in development
    if (import.meta.env.MODE === "development") {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
    return Promise.reject(error);
  }
);

<<<<<<< HEAD
// Response — unified error handling
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === "development") {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`,
=======
// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.MODE === "development") {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
      );
    }
    return response;
  },
  (error) => {
<<<<<<< HEAD
    if (error.response) {
=======
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
      const { status, data } = error.response;
      console.error(`❌ API Error ${status}:`, data?.message || data?.error);

      switch (status) {
        case 401:
<<<<<<< HEAD
          console.warn("⚠️  Session expired — please log in again");
          localStorage.removeItem("token");
          // window.location.href = '/login'; // Uncomment to auto-redirect
=======
          // Unauthorized - token expired or invalid
          console.warn("⚠️  Authentication expired. Please log in again.");
          localStorage.removeItem("token");
          
          // Optional: Redirect to login
          // window.location.href = '/login';
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
          break;

        case 403:
<<<<<<< HEAD
          console.warn("⚠️  Access forbidden");
          break;
        case 404:
          console.warn(`⚠️  Not found: ${error.config?.url}`);
=======
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
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
          break;

        case 404:
          console.warn("⚠️  Resource not found");
          console.warn(`   → Endpoint: ${error.config?.url}`);
          break;

        case 500:
<<<<<<< HEAD
          console.error("❌ Server error — please try again later");
          break;
        case 502:
        case 503:
        case 504:
          console.error("❌ Server temporarily unavailable");
=======
          console.error("❌ Server error. Please try again later.");
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
          break;

        case 502:
        case 503:
        case 504:
          console.error("❌ Server is temporarily unavailable.");
          console.error("   💡 Backend server may be down or restarting");
          break;

        default:
          console.error(`❌ Unexpected error (${status})`);
<<<<<<< HEAD
      }
    } else if (error.request) {
      // FIX #3: This branch fires when there's NO response (CORS blocks the
      // preflight before the response arrives, or the server is down).
      // Vite proxy in dev eliminates this class of error for HTTP requests.
      console.error("❌ No response received — possible causes:");
      console.error("   • Server is down");
      console.error("   • CORS preflight was blocked");
      console.error("   • Network/firewall issue");
      console.error("   • API URL wrong:", API_BASE_URL || SOCKET_URL);
    } else {
      console.error("❌ Axios config error:", error.message);
=======
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
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
    }

    return Promise.reject(error);
  }
);

// ============================================
<<<<<<< HEAD
// UTILITY / DIAGNOSTIC HELPERS
// ============================================

export const testCORS = async () => {
  try {
    const response = await api.get("/api/cors-test");
    console.log("✅ CORS test passed:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ CORS test failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const testHealth = async () => {
  try {
    const response = await api.get("/health");
    console.log("✅ API healthy:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const getConnectionStatus = () => ({
  api: {
    baseURL: API_BASE_URL || "(relative)",
    socketURL: SOCKET_URL,
    withCredentials: true,
  },
  socket: {
    initialized: socket !== null,
    connected: socket?.connected || false,
    id: socket?.id || null,
    transport: socket?.io?.engine?.transport?.name || null,
  },
  timestamp: new Date().toISOString(),
});

export const runDiagnostics = async () => {
  console.log("🔍 Running diagnostics...\n");
  const results = {
    timestamp: new Date().toISOString(),
    configuration: getConnectionStatus(),
    tests: {},
  };

  results.tests.health = await testHealth();
  results.tests.cors = await testCORS();
  results.tests.socket = socket?.connected
    ? { success: true, connected: true, id: socket.id }
    : { success: false, connected: false };

  const allPassed = Object.values(results.tests).every((t) => t.success);
  console.log(allPassed ? "\n✅ All tests PASSED!" : "\n⚠️  Some tests FAILED");
  return results;
};

// ============================================
// EXPORTS
// ============================================

export default api;
export { API_BASE_URL, SOCKET_URL };
=======
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
>>>>>>> 84a3202958ddb70c999e1a7299442c081a4e7a34
