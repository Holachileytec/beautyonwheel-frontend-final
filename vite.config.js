import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    // ---------------------------------------------------------------
    // Dev Proxy — eliminates ALL CORS issues in development.
    //
    // How it works:
    //   Browser → localhost:5173/api/... → Vite proxy → localhost:8000
    //   The browser only ever talks to localhost:5173 (same origin),
    //   so no preflight / CORS header is ever needed in dev.
    //
    // In api.js we set baseURL to "" (empty) in dev mode so Axios
    // sends requests to localhost:5173 which Vite then forwards here.
    // ---------------------------------------------------------------
    proxy: {
      // All /api/* requests → Express backend
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },

      // Health check endpoint
      "/health": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },

      // Socket.IO — must use ws: protocol and enable ws: true
      "/socket.io": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        ws: true, // ← enables WebSocket proxying
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
