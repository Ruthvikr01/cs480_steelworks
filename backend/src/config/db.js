/**
 * Module: config/db.js
 * Responsibility: Owns PostgreSQL connection pooling and query execution helper.
 *
 * Resource Safety:
 * - Uses pg.Pool to reuse connections efficiently.
 * - Pool is closed explicitly via closePool() during graceful shutdown.
 */
import { Pool } from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { getLogger } from "../logging/logger.js";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
);
const envFilePath = path.join(
  projectRoot,
  process.env.NODE_ENV === "test" ? ".env.test" : ".env",
);

dotenv.config({ path: envFilePath });

const logger = getLogger("config/db");

const useSsl = String(process.env.DB_SSL ?? "false").toLowerCase() === "true";

// Creates one shared connection pool for the whole process.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: useSsl
    ? {
      rejectUnauthorized: false,
    }
    : false,
});

/**
 * Executes a parameterized SQL query.
 *
 * @param {string} text - SQL text with placeholders ($1, $2, ...).
 * @param {unknown[]} [params=[]] - Ordered query parameters.
 * @returns {Promise<import("pg").QueryResult>} Query result from PostgreSQL.
 *
 * Time Complexity: O(q) where q is database execution time.
 * Space Complexity: O(r) where r is number of rows returned.
 */
export async function query(text, params = []) {
  // Parameterized execution helps prevent SQL injection.
  try {
    return await pool.query(text, params);
  } catch (error) {
    logger.error("Database query failure", {
      error_message: error instanceof Error ? error.message : String(error),
      parameter_count: params.length,
    });
    throw error;
  }
}

/**
 * Closes all pool clients and releases sockets.
 *
 * @returns {Promise<void>}
 *
 * Time Complexity: O(c) where c is number of active clients.
 * Space Complexity: O(1)
 */
export async function closePool() {
  await pool.end();
}
