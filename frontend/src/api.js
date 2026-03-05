/**
 * Module: api.js
 * Responsibility: Provides a small API client for backend reporting endpoints.
 *
 * Design Notes:
 * - Keeps network logic in one place.
 * - Throws descriptive errors on non-2xx responses.
 */

// Uses environment-configured base URL, with local fallback for developer convenience.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

/**
 * Performs a GET request and parses JSON.
 *
 * @param {string} path - API path relative to /api.
 * @returns {Promise<unknown>}
 *
 * Time Complexity: O(n) where n is response payload size due to JSON parsing.
 * Space Complexity: O(n) to hold parsed response in memory.
 */
async function getJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    const message = `Request failed: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return response.json();
}

/**
 * Fetches all dashboard datasets in parallel for faster page load.
 *
 * @returns {Promise<{
 *   lotsSummary: unknown,
 *   linePerformance: unknown,
 *   inspections: unknown,
 *   shipping: unknown,
 *   lifecycle: unknown,
 *   topDefects: unknown,
 *   holds: unknown,
 *   shiftEfficiency: unknown
 * }>}
 *
 * Time Complexity: O(k) orchestration time + network/database time; k is endpoint count.
 * Space Complexity: O(total response size) for all datasets combined.
 */
export async function fetchDashboardData(filters = {}) {
  const params = new URLSearchParams();

  if (filters.lotId && String(filters.lotId).trim() !== "") {
    params.set("lotId", String(filters.lotId).trim());
  }

  if (filters.startDate) {
    params.set("startDate", String(filters.startDate));
  }

  if (filters.endDate) {
    params.set("endDate", String(filters.endDate));
  }

  params.set("topDefectsLimit", "5");

  const queryString = params.toString();
  const path = queryString.length > 0 ? `/dashboard?${queryString}` : "/dashboard";

  return getJson(path);
}
