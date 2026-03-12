import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for React single-page application.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["cs480-steelworks-3.onrender.com"]
  }
});
