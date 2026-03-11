import fs from "node:fs";
import path from "node:path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, errors, printf } = format;

const defaultLogDirectory = path.resolve(process.cwd(), "logs");

const rootLogger = createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  defaultMeta: { module: "app" },
  transports: [new transports.Console()],
});

let isConfigured = false;

const logLineFormatter = printf((info) => {
  const {
    timestamp: logTimestamp,
    level,
    module,
    message,
    stack,
    ...meta
  } = info;

  const baseMessage = `${logTimestamp} [${level.toUpperCase()}] [${module}] ${message}`;

  if (stack) {
    return `${baseMessage} ${stack}`;
  }

  if (Object.keys(meta).length === 0) {
    return baseMessage;
  }

  return `${baseMessage} ${JSON.stringify(meta)}`;
});

export function initLogger() {
  if (isConfigured) {
    return rootLogger;
  }

  const logDirectory = process.env.LOG_DIR ?? defaultLogDirectory;
  fs.mkdirSync(logDirectory, { recursive: true });

  rootLogger.configure({
    level: process.env.LOG_LEVEL ?? "info",
    defaultMeta: { module: "app" },
    format: combine(timestamp(), errors({ stack: true }), logLineFormatter),
    transports: [
      new transports.Console(),
      new DailyRotateFile({
        filename: path.join(logDirectory, "application-%DATE%.log"),
        datePattern: "YYYY-MM-DD",
        zippedArchive: false,
        maxSize: "5m",
        maxFiles: "3",
      }),
    ],
  });

  isConfigured = true;
  return rootLogger;
}

export function getLogger(moduleName) {
  return rootLogger.child({ module: moduleName });
}
