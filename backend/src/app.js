/**
 * Module: app.js
 * Responsibility: Configures and returns the Express application instance.
 *
 * Time/Space Complexity:
 * - App creation and middleware registration are O(1) time and O(1) space.
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";

/**
 * Creates and configures the Express application.
 *
 * @returns {import("express").Express}
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function createApp() {
  const app = express();

  // Adds security-related HTTP headers.
  app.use(helmet());

  // Allows browser clients from configured origin to call this API.
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ?? "*",
    }),
  );

  // Parses incoming JSON bodies into req.body. Memory use is proportional to payload size O(n).
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/", (_req, res) => {
    res.json({
      message: "Operations Analytics scaffold backend is running.",
    });
  });

  // Mounts all API routes under /api.
  app.use("/api", apiRouter);

  // Handles unknown routes after all route declarations.
  app.use(notFoundHandler);

  // Centralized error middleware should be registered last.
  app.use(errorHandler);

  return app;
}
