/**
 * Module: routes/index.js
 * Responsibility: Declares all HTTP API routes and their controller bindings.
 */
import { Router } from "express";
import {
  getDashboard,
  getHealth,
  getInspections,
  getLifecycle,
  getLifecycleByFilter,
  getLinesPerformance,
  getLotsSummary,
  getShiftEfficiency,
  getShipping,
  getShippingHolds,
  getTopDefects,
} from "../controllers/reportController.js";

// Creates modular API router.
export const apiRouter = Router();

// Health check endpoint used by humans and orchestration systems.
apiRouter.get("/health", getHealth);

// Analytics endpoints.
apiRouter.get("/lots/summary", getLotsSummary);
apiRouter.get("/production-lines/performance", getLinesPerformance);
apiRouter.get("/lots/inspections", getInspections);
apiRouter.get("/lots/shipping", getShipping);
apiRouter.get("/lots/lifecycle", getLifecycle);
apiRouter.get("/lots/lifecycle/filter", getLifecycleByFilter);
apiRouter.get("/lots/top-defects", getTopDefects);
apiRouter.get("/lots/holds", getShippingHolds);
apiRouter.get("/production/efficiency-by-shift", getShiftEfficiency);
apiRouter.get("/dashboard", getDashboard);
