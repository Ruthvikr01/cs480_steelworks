import assert from "node:assert/strict";
import { OperationsAnalyticsController } from "../../src/scaffold/controllers/operationsAnalyticsController.js";
import test from "node:test";

/**
 * Unit test stubs for OperationsAnalyticsController.
 * No integration tests included.
 */

test("getAlignedOperationalRecords currently rejects with not implemented error", async () => {
  const controller = new OperationsAnalyticsController({});

  await assert.rejects(
    controller.getAlignedOperationalRecords({ query: {} }, {}, () => {}),
    /Not implemented: getAlignedOperationalRecords/,
  );
});

test("getProductionIssueSummary currently rejects with not implemented error", async () => {
  const controller = new OperationsAnalyticsController({});

  await assert.rejects(
    controller.getProductionIssueSummary({ query: {} }, {}, () => {}),
    /Not implemented: getProductionIssueSummary/,
  );
});

test("getShipmentStatusForIssueLots currently rejects with not implemented error", async () => {
  const controller = new OperationsAnalyticsController({});

  await assert.rejects(
    controller.getShipmentStatusForIssueLots({ query: {} }, {}, () => {}),
    /Not implemented: getShipmentStatusForIssueLots/,
  );
});

test("getMeetingReadySummary currently rejects with not implemented error", async () => {
  const controller = new OperationsAnalyticsController({});

  await assert.rejects(
    controller.getMeetingReadySummary({ query: {} }, {}, () => {}),
    /Not implemented: getMeetingReadySummary/,
  );
});

test("controller methods can be forwarded to next middleware by route wrapper", async () => {
  const controller = new OperationsAnalyticsController({});
  let forwardedError;

  const next = (error) => {
    forwardedError = error;
  };

  await controller
    .getAlignedOperationalRecords({ query: {} }, {}, next)
    .catch((error) => next(error));

  assert.match(forwardedError?.message ?? "", /Not implemented/);
});
