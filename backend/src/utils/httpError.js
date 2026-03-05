/**
 * Module: utils/httpError.js
 * Responsibility: Provides a typed HTTP error creator for service/controller usage.
 */

/**
 * Creates an Error object with HTTP status metadata.
 *
 * @param {number} statusCode - HTTP status code to return.
 * @param {string} message - Human-readable error message.
 * @returns {Error & { statusCode: number }}
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
