import assert from "node:assert/strict";
import { OperationsAnalyticsService } from "../../src/scaffold/services/operationsAnalyticsService.js";
import test from "node:test";

/**
 * Unit test stubs for OperationsAnalyticsService.
 * No integration tests included.
 */
test("AC5: getProductionIssueSummary delegates to repository and returns line issue summary", async () => {
  // Arrange: representative filter input passed from controller/use-case layer.
  const filters = {
    lotId: "LOT-001",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
  };

  // Arrange: repository response contract expected by consumers of the service.
  const expected = [
    {
      lineName: "Line A",
      issueRuns: 3,
      issueRate: 0.25,
    },
  ];

  // Arrange: lightweight repository mock that also verifies call arguments.
  const repository = {
    async findProductionLineIssueSummary(receivedFilters) {
      assert.deepEqual(receivedFilters, filters);
      return expected;
    },
  };

  // Arrange: service under test with injected mock dependency.
  const service = new OperationsAnalyticsService(repository);

  // Act: execute service method.
  const actual = await service.getProductionIssueSummary(filters);

  // Assert: service should return repository payload unchanged.
  assert.deepEqual(actual, expected);
});

test("AC3: validateFilters accepts valid lotId/startDate/endDate", () => {
  const service = new OperationsAnalyticsService({
    findProductionLineIssueSummary: async () => [],
  });

  assert.throws(
    () =>
      service.validateFilters({
        lotId: "LOT-001",
        startDate: "2025-01-01",
        endDate: "2025-01-31",
      }),
    /Not implemented: validateFilters/,
  );
});

test("AC3: validateFilters rejects invalid date range", () => {
  const service = new OperationsAnalyticsService({
    findProductionLineIssueSummary: async () => [],
  });

  assert.throws(
    () =>
      service.validateFilters({
        lotId: "LOT-001",
        startDate: "2025-02-01",
        endDate: "2025-01-01",
      }),
    /Not implemented: validateFilters/,
  );
});

test("AC1/AC2/AC4/AC10: getAlignedOperationalRecords currently rejects with not implemented", async () => {
  const service = new OperationsAnalyticsService({
    findProductionLineIssueSummary: async () => [],
  });

  await assert.rejects(
    service.getAlignedOperationalRecords({ lotId: "LOT-001" }),
    /Not implemented: getAlignedOperationalRecords/,
  );
});

test("AC6: getShipmentStatusForIssueLots currently rejects with not implemented", async () => {
  const service = new OperationsAnalyticsService({
    findProductionLineIssueSummary: async () => [],
  });

  await assert.rejects(
    service.getShipmentStatusForIssueLots({ lotId: "LOT-001" }),
    /Not implemented: getShipmentStatusForIssueLots/,
  );
});

test("AC7/AC8: getMeetingReadySummary currently rejects with not implemented", async () => {
  const service = new OperationsAnalyticsService({
    findProductionLineIssueSummary: async () => [],
  });

  await assert.rejects(
    service.getMeetingReadySummary({ lotId: "LOT-001" }),
    /Not implemented: getMeetingReadySummary/,
  );
});

test("AC9: repeated calls with same filters fail consistently while unimplemented", async () => {
  const service = new OperationsAnalyticsService({
    findProductionLineIssueSummary: async () => [],
  });

  const firstCall = service.getMeetingReadySummary({ lotId: "LOT-001" });
  const secondCall = service.getMeetingReadySummary({ lotId: "LOT-001" });

  await assert.rejects(firstCall, /Not implemented: getMeetingReadySummary/);
  await assert.rejects(secondCall, /Not implemented: getMeetingReadySummary/);
});

test("AC5: getProductionIssueSummary forwards undefined filters to repository", async () => {
  // Arrange: repository records the raw filters argument for delegation checks.
  const expected = [];
  const repository = {
    async findProductionLineIssueSummary(receivedFilters) {
      assert.equal(receivedFilters, undefined);
      return expected;
    },
  };

  const service = new OperationsAnalyticsService(repository);

  // Act: call service without filters.
  const actual = await service.getProductionIssueSummary();

  // Assert: return contract is passthrough from repository.
  assert.deepEqual(actual, expected);
});

test("AC5: getProductionIssueSummary surfaces repository failures", async () => {
  // Arrange: repository throws domain/data-access error.
  const repositoryError = new Error("repository unavailable");
  const repository = {
    async findProductionLineIssueSummary() {
      throw repositoryError;
    },
  };

  const service = new OperationsAnalyticsService(repository);

  // Act/Assert: service should not swallow or re-map repository errors in scaffold.
  await assert.rejects(
    service.getProductionIssueSummary({ lotId: "LOT-002" }),
    repositoryError,
  );
});
