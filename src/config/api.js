import axios from "axios";
import { io } from "socket.io-client";

// ============================================
// CONFIGURATION
// ============================================

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

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  // FIX #2: withCredentials must be true on the client when the server sets
  // credentials: true in its CORS config. Keep both in sync.
  withCredentials: true,
});

console.log("✅ Axios instance configured");

// ============================================
// SOCKET.IO
// ============================================

let socket = null;

/**
 * Initialize Socket.IO connection
 * @returns {Socket} Socket.IO instance
 */
export const initSocket = () => {
  if (!socket) {
    console.log("🔌 Initializing Socket.IO...");
    console.log("   Server:", SOCKET_URL);

    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      connectTimeout: 20000,
      withCredentials: true,
      autoConnect: true,
      forceNew: false,
    });

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

    socket.io.engine.on("upgrade", (transport) => {
      console.log(`⬆️  Transport upgraded to: ${transport.name}`);
    });

    console.log("✅ Socket event handlers registered");
  }

  return socket;
};

export const getSocket = () => {
  if (!socket)
    console.warn("⚠️  Socket not initialized. Call initSocket() first.");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("✅ Socket disconnected");
  }
};

export const isSocketConnected = () => socket?.connected || false;

// ============================================
// AXIOS INTERCEPTORS
// ============================================

// Request — attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (import.meta.env.MODE === "development") {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request setup error:", error);
    return Promise.reject(error);
  }
);

// Response — unified error handling
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === "development") {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`,
      );
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`❌ API Error ${status}:`, data?.message || data?.error);

      switch (status) {
        case 401:
          console.warn("⚠️  Session expired — please log in again");
          localStorage.removeItem("token");
          // window.location.href = '/login'; // Uncomment to auto-redirect
          break;

        case 403:
          console.warn("⚠️  Access forbidden");
          break;

        case 404:
          console.warn(`⚠️  Not found: ${error.config?.url}`);
          break;

        case 500:
          console.error("❌ Server error — please try again later");
          break;

        case 502:
        case 503:
        case 504:
          console.error("❌ Server temporarily unavailable");
          break;

        default:
          console.error(`❌ Unexpected error (${status})`);
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
    }

    return Promise.reject(error);
  }
);

// ============================================
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
