/**
 * Module: controllers/reportController.js
 * Responsibility: HTTP controller functions that transform request/response shapes.
 */
import {
  getDashboardBundle,
  getLotInspectionResults,
  getLotLifecycle,
  getLotLifecycleByFilters,
  getLotProductionSummary,
  getLotShippingStatus,
  getLotsOnShippingHold,
  getProductionEfficiencyByShift,
  getProductionLinePerformance,
  getTopLotsByDefects,
} from "../services/reportService.js";

/**
 * Wraps async route handlers to forward errors into Express error middleware.
 *
 * @template T
 * @param {(req: import("express").Request, res: import("express").Response) => Promise<T>} handler
 * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void}
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function asyncHandler(handler) {
  return (req, res, next) => {
    handler(req, res).catch(next);
  };
}

/**
 * GET /api/health
 */
export const getHealth = asyncHandler(async (_req, res) => {
  res.json({
    status: "ok",
    service: "operations-analytics-backend",
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/lots/summary
 */
export const getLotsSummary = asyncHandler(async (_req, res) => {
  const data = await getLotProductionSummary();
  res.json(data);
});

/**
 * GET /api/production-lines/performance
 */
export const getLinesPerformance = asyncHandler(async (_req, res) => {
  const data = await getProductionLinePerformance();
  res.json(data);
});

/**
 * GET /api/lots/inspections
 */
export const getInspections = asyncHandler(async (_req, res) => {
  const data = await getLotInspectionResults();
  res.json(data);
});

/**
 * GET /api/lots/shipping
 */
export const getShipping = asyncHandler(async (_req, res) => {
  const data = await getLotShippingStatus();
  res.json(data);
});

/**
 * GET /api/lots/lifecycle
 */
export const getLifecycle = asyncHandler(async (_req, res) => {
  const data = await getLotLifecycle();
  res.json(data);
});

/**
 * GET /api/lots/lifecycle/filter?lotId=LOT-123&startDate=2026-01-01&endDate=2026-01-31
 */
export const getLifecycleByFilter = asyncHandler(async (req, res) => {
  const data = await getLotLifecycleByFilters({
    lotId: req.query.lotId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  });
  res.json(data);
});

/**
 * GET /api/lots/top-defects?limit=5
 */
export const getTopDefects = asyncHandler(async (req, res) => {
  // Parses optional query parameter with default fallback.
  const limit = Number(req.query.limit ?? 5);
  const data = await getTopLotsByDefects(limit);
  res.json(data);
});

/**
 * GET /api/lots/holds
 */
export const getShippingHolds = asyncHandler(async (_req, res) => {
  const data = await getLotsOnShippingHold();
  res.json(data);
});

/**
 * GET /api/production/efficiency-by-shift
 */
export const getShiftEfficiency = asyncHandler(async (_req, res) => {
  const data = await getProductionEfficiencyByShift();
  res.json(data);
});

/**
 * GET /api/dashboard?lotId=LOT-123&startDate=2026-01-01&endDate=2026-01-31&topDefectsLimit=5
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const topDefectsLimit = req.query.topDefectsLimit
    ? Number(req.query.topDefectsLimit)
    : 5;

  const data = await getDashboardBundle({
    lotId: req.query.lotId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    topDefectsLimit,
  });

  res.json(data);
});
