import axios from "axios";

// API Base URL - uses environment variable in production, localhost in development
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://beautyplug.com.ng";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.warn("Authentication expired");
          // Optionally redirect to login
          break;
        case 403:
          console.warn("Access forbidden");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          break;
      }
    } else if (error.request) {
      // Network error
      console.error("Network error - please check your connection");
    }
    return Promise.reject(error);
  },
);

// Export the configured instance
export default api;

// Export the base URL for cases where you need it directly
export { API_BASE_URL };
