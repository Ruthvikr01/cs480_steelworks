/**
 * Module: middleware/errorHandlers.js
 * Responsibility: Handles not-found routes and centralized API error responses.
 */
import { getLogger } from "../logging/logger.js";

const logger = getLogger("middleware/errorHandlers");

/**
 * Handles unknown API endpoints.
 *
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @returns {void}
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function notFoundHandler(_req, res) {
  res.status(404).json({
    error: "NotFound",
    message: "The requested endpoint does not exist.",
  });
}

/**
 * Centralized error handler for all uncaught route/service errors.
 *
 * @param {Error & { statusCode?: number }} error
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 * @returns {void}
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode ?? 500;

  logger.error("Unexpected exception when retrieving records", {
    status_code: statusCode,
    error_message: error.message ?? "Unexpected server error.",
  });

  res.status(statusCode).json({
    error: statusCode === 500 ? "InternalServerError" : "RequestError",
    message: error.message ?? "Unexpected server error.",
  });
}
