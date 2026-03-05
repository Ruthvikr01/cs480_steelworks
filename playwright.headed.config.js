import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config.js";

export default defineConfig({
  ...baseConfig,
  fullyParallel: false,
  workers: 1,
  use: {
    ...baseConfig.use,
    launchOptions: {
      slowMo: 3000,
    },
  },
});
