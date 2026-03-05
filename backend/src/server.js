import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createApp } from "./app.js";

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

const PORT = Number(process.env.PORT ?? 4000);

export function createServer() {
  const app = createApp();
  return http.createServer(app);
}

export function startServer(port = PORT) {
  const server = createServer();
  return new Promise((resolve) => {
    server.listen(port, () => {
      const address = server.address();
      const activePort =
        typeof address === "object" && address ? address.port : port;
      console.log(
        `Backend scaffold listening on http://localhost:${activePort}`,
      );
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
