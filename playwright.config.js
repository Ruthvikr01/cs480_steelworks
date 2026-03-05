import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm --prefix frontend run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
    timeout: 120000,
    env: {
      VITE_API_BASE_URL: "http://127.0.0.1:4000/api",
    },
  },
});
