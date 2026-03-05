/**
 * Module: services/reportService.js
 * Responsibility: Encapsulates business rules for reporting endpoints.
 *
 * Service-layer intent:
 * - Keep controllers thin.
 * - Centralize validation and simple orchestration.
 */
import {
  findLotInspectionResults,
  findLotLifecycle,
  findLotLifecycleByFilters,
  findLotProductionSummary,
  findLotShippingStatus,
  findLotsOnShippingHold,
  findProductionEfficiencyByShift,
  findProductionLinePerformance,
  findTopLotsByDefects,
} from "../repositories/reportRepository.js";
import { createHttpError } from "../utils/httpError.js";

/**
 * Validates and normalizes lifecycle filters.
 *
 * @param {{ lotId?: string, startDate?: string, endDate?: string }} [filters={}]
 * @returns {{ lotId?: string, startDate?: string, endDate?: string }}
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function validateLifecycleFilters(filters = {}) {
  const normalized = {};

  if (
    filters.lotId !== undefined &&
    filters.lotId !== null &&
    String(filters.lotId).trim() !== ""
  ) {
    normalized.lotId = String(filters.lotId).trim();
  }

  if (filters.startDate) {
    const startDate = String(filters.startDate);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      throw createHttpError(400, "startDate must be in YYYY-MM-DD format.");
    }
    normalized.startDate = startDate;
  }

  if (filters.endDate) {
    const endDate = String(filters.endDate);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      throw createHttpError(400, "endDate must be in YYYY-MM-DD format.");
    }
    normalized.endDate = endDate;
  }

  if (
    normalized.startDate &&
    normalized.endDate &&
    normalized.startDate > normalized.endDate
  ) {
    throw createHttpError(
      400,
      "startDate must be less than or equal to endDate.",
    );
  }

  return normalized;
}

/**
 * Returns lot summary data.
 *
 * @returns {Promise<object[]>}
 * Time Complexity: O(n + m) delegated to repository/database.
 * Space Complexity: O(k) delegated to repository/database result size.
 */
export async function getLotProductionSummary() {
  return findLotProductionSummary();
}

/**
 * Returns production line performance data.
 *
 * @returns {Promise<object[]>}
 */
export async function getProductionLinePerformance() {
  return findProductionLinePerformance();
}

/**
 * Returns inspection result data.
 *
 * @returns {Promise<object[]>}
 */
export async function getLotInspectionResults() {
  return findLotInspectionResults();
}

/**
 * Returns shipping status data.
 *
 * @returns {Promise<object[]>}
 */
export async function getLotShippingStatus() {
  return findLotShippingStatus();
}

/**
 * Returns lifecycle data.
 *
 * @returns {Promise<object[]>}
 */
export async function getLotLifecycle() {
  return findLotLifecycle();
}

/**
 * Returns lifecycle data with optional lot/date filtering.
 *
 * @param {{ lotId?: string, startDate?: string, endDate?: string }} filters
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(1) service orchestration + repository/database cost.
 * Space Complexity: O(1) service state + repository result size.
 */
export async function getLotLifecycleByFilters(filters) {
  const validatedFilters = validateLifecycleFilters(filters);
  return findLotLifecycleByFilters(validatedFilters);
}

/**
 * Returns top lots by defect count.
 *
 * @param {number} limit - User-supplied limit.
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(i log i) database-side for aggregation/sort.
 * Space Complexity: O(k) database-side grouped result.
 */
export async function getTopLotsByDefects(limit) {
  // Validates limit at service boundary to avoid invalid DB calls.
  if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
    throw createHttpError(400, "limit must be an integer between 1 and 100.");
  }

  return findTopLotsByDefects(limit);
}

/**
 * Returns shipping-hold data.
 *
 * @returns {Promise<object[]>}
 */
export async function getLotsOnShippingHold() {
  return findLotsOnShippingHold();
}

/**
 * Returns shift efficiency data.
 *
 * @returns {Promise<object[]>}
 */
export async function getProductionEfficiencyByShift() {
  return findProductionEfficiencyByShift();
}

/**
 * Returns a meeting-ready dashboard bundle in one response.
 *
 * @param {{ lotId?: string, startDate?: string, endDate?: string, topDefectsLimit?: number }} [options={}]
 * @returns {Promise<{
 *   lotsSummary: object[],
 *   linePerformance: object[],
 *   inspections: object[],
 *   shipping: object[],
 *   lifecycle: object[],
 *   topDefects: object[],
 *   holds: object[],
 *   shiftEfficiency: object[]
 * }>}
 *
 * Time Complexity: O(k) orchestrating k report calls + total DB time.
 * Space Complexity: O(total response payload).
 */
export async function getDashboardBundle(options = {}) {
  const topDefectsLimit = options.topDefectsLimit ?? 5;

  const [
    lotsSummary,
    linePerformance,
    inspections,
    shipping,
    lifecycle,
    topDefects,
    holds,
    shiftEfficiency,
  ] = await Promise.all([
    getLotProductionSummary(),
    getProductionLinePerformance(),
    getLotInspectionResults(),
    getLotShippingStatus(),
    getLotLifecycleByFilters({
      lotId: options.lotId,
      startDate: options.startDate,
      endDate: options.endDate,
    }),
    getTopLotsByDefects(topDefectsLimit),
    getLotsOnShippingHold(),
    getProductionEfficiencyByShift(),
  ]);

  return {
    lotsSummary,
    linePerformance,
    inspections,
    shipping,
    lifecycle,
    topDefects,
    holds,
    shiftEfficiency,
  };
}
