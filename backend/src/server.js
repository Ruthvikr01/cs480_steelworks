import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import { createApp } from "./app.js";
import { getLogger, initLogger } from "./logging/logger.js";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const envFilePath = path.join(
  projectRoot,
  process.env.NODE_ENV === "test" ? ".env.test" : ".env",
);

dotenv.config({
  path: envFilePath,
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.0,
  sendDefaultPii: false,
});

initLogger();
const logger = getLogger("server");

const PORT = Number(process.env.PORT ?? 4000);

export function createServer() {
  const app = createApp();
  return http.createServer(app);
}

export function startServer(port = PORT) {
  const server = createServer();
  logger.info("Application startup initiated", {
    port,
    environment: process.env.NODE_ENV ?? "development",
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      const address = server.address();
      const activePort =
        typeof address === "object" && address ? address.port : port;
      logger.info("Application startup completed", {
        listen_url: `http://localhost:${activePort}`,
      });
      resolve(server);
    });
  });
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await startServer();
}
