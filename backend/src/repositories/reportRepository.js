/**
 * Module: repositories/reportRepository.js
 * Responsibility: Performs all SQL read operations for analytics/reporting endpoints.
 *
 * Design Notes:
 * - Repository layer contains raw SQL and no HTTP concerns.
 * - Every function uses parameterized queries when user input is involved.
 */
import { query } from "../config/db.js";
import { getLogger } from "../logging/logger.js";

const logger = getLogger("repositories/reportRepository");

/**
 * Builds SQL and parameter list for lifecycle query with optional filters.
 *
 * @param {{ lotId?: string, startDate?: string, endDate?: string }} [filters={}]
 * @returns {{ text: string, params: Array<string> }}
 *
 * Time Complexity: O(1) query text assembly.
 * Space Complexity: O(1) excluding output string size.
 */
export function buildLifecycleQuery(filters = {}) {
  const whereClauses = [];
  const params = [];

  if (filters.lotId) {
    params.push(filters.lotId);
    whereClauses.push(`l.lot_id = $${params.length}`);
  }

  if (filters.startDate) {
    params.push(filters.startDate);
    whereClauses.push(`l.production_date >= $${params.length}`);
  }

  if (filters.endDate) {
    params.push(filters.endDate);
    whereClauses.push(`l.production_date <= $${params.length}`);
  }

  const whereSql =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const text = `
    SELECT
      l.lot_id,
      l.part_number,
      l.production_date AS lot_production_date,
      pr.production_date AS production_run_date,
      pr.shift,
      pr.units_planned,
      pr.units_actual,
      i.inspection_date,
      i.defect_count,
      i.inspection_result,
      s.ship_date,
      s.shipment_status,
      CASE WHEN pr.id IS NULL THEN TRUE ELSE FALSE END AS production_data_missing,
      CASE WHEN i.id IS NULL THEN TRUE ELSE FALSE END AS inspection_data_missing,
      CASE WHEN s.id IS NULL THEN TRUE ELSE FALSE END AS shipping_data_missing
    FROM lots l
    LEFT JOIN production_records pr ON pr.lot_id = l.id
    LEFT JOIN inspection_records i ON i.lot_id = l.id
    LEFT JOIN shipping_records s ON s.lot_id = l.id
    ${whereSql}
    ORDER BY l.production_date, l.lot_id, pr.production_date, i.inspection_date, s.ship_date;
  `;

  return { text, params };
}

/**
 * Fetches lot-level production summary.
 *
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(n + m) for join/group over lots and production rows.
 * Space Complexity: O(k) where k is number of grouped lots in result.
 */
export async function findLotProductionSummary() {
  logger.info("Querying production records");
  const result = await query(
    `
    SELECT
      l.lot_id,
      l.part_number,
      l.production_date,
      l.status,
      COUNT(pr.id) AS production_runs,
      COALESCE(SUM(pr.units_planned), 0) AS total_units_planned,
      COALESCE(SUM(pr.units_actual), 0) AS total_units_actual,
      COALESCE(SUM(pr.downtime_minutes), 0) AS total_downtime
    FROM lots l
    LEFT JOIN production_records pr ON pr.lot_id = l.id
    GROUP BY l.id, l.lot_id, l.part_number, l.production_date, l.status
    ORDER BY l.production_date;
    `,
  );

  logger.info("Production records query completed", {
    number_of_production_records: result.rows.length,
  });

  return result.rows;
}

/**
 * Fetches production line performance metrics.
 *
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(n + m) for line/record join and aggregation.
 * Space Complexity: O(k) where k is number of production lines.
 */
export async function findProductionLinePerformance() {
  const result = await query(
    `
    SELECT
      pl.line_name,
      COUNT(pr.id) AS total_runs,
      COALESCE(SUM(pr.units_planned), 0) AS units_planned,
      COALESCE(SUM(pr.units_actual), 0) AS units_actual,
      COALESCE(SUM(pr.downtime_minutes), 0) AS downtime_minutes,
      COALESCE(SUM(CASE WHEN pr.issue_flag THEN 1 ELSE 0 END), 0) AS issue_runs,
      ROUND(
        CASE
          WHEN COUNT(pr.id) = 0 THEN 0
          ELSE SUM(CASE WHEN pr.issue_flag THEN 1 ELSE 0 END)::decimal / COUNT(pr.id)
        END,
        2
      ) AS issue_rate,
      ROUND(
        COALESCE(
          AVG(
            CASE
              WHEN pr.units_planned > 0 THEN pr.units_actual::decimal / pr.units_planned
              ELSE NULL
            END
          ),
          0
        ),
        2
      ) AS efficiency_ratio
    FROM production_lines pl
    LEFT JOIN production_records pr ON pr.production_line_id = pl.id
    GROUP BY pl.id, pl.line_name
    ORDER BY efficiency_ratio DESC;
    `,
  );

  return result.rows;
}

/**
 * Fetches lots with inspection records.
 *
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(n + i) for lots/inspection join.
 * Space Complexity: O(r) where r is returned row count.
 */
export async function findLotInspectionResults() {
  logger.info("Querying inspection records");
  const result = await query(
    `
    SELECT
      l.lot_id,
      l.part_number,
      i.inspection_date,
      i.defect_count,
      i.inspection_result,
      i.inspector
    FROM lots l
    LEFT JOIN inspection_records i ON i.lot_id = l.id
    ORDER BY i.inspection_date NULLS LAST;
    `,
  );

  logger.info("Inspection records query completed", {
    number_of_inspection_records: result.rows.length,
  });

  return result.rows;
}

/**
 * Fetches lots with shipping status.
 *
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(n + s) for lots/shipping join.
 * Space Complexity: O(r) where r is returned row count.
 */
export async function findLotShippingStatus() {
  logger.info("Querying shipping records");
  const result = await query(
    `
    SELECT
      l.lot_id,
      s.ship_date,
      s.customer,
      s.destination,
      s.carrier,
      s.tracking_number,
      s.quantity_shipped,
      s.shipment_status
    FROM lots l
    LEFT JOIN shipping_records s ON s.lot_id = l.id
    ORDER BY s.ship_date NULLS LAST;
    `,
  );

  logger.info("Shipping records query completed", {
    number_of_shipping_records: result.rows.length,
  });

  return result.rows;
}

/**
 * Fetches combined lifecycle view for lots.
 *
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(n + p + i + s) for multi-join scan and sort.
 * Space Complexity: O(r) where r is returned row count.
 */
export async function findLotLifecycle() {
  logger.info("Querying lifecycle records", {
    lot_id: undefined,
    query_date_range: { startDate: undefined, endDate: undefined },
  });

  const lifecycleQuery = buildLifecycleQuery();
  const result = await query(lifecycleQuery.text, lifecycleQuery.params);

  logger.info("Lifecycle records query completed", {
    number_of_records: result.rows.length,
  });

  return result.rows;
}

/**
 * Fetches combined lifecycle view for lots with lot/date filtering.
 *
 * @param {{ lotId?: string, startDate?: string, endDate?: string }} filters
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(n + p + i + s) database-side scan with optional filtering.
 * Space Complexity: O(r) where r is returned row count.
 */
export async function findLotLifecycleByFilters(filters) {
  logger.info("Querying lifecycle records", {
    lot_id: filters.lotId,
    query_date_range: {
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
  });

  const lifecycleQuery = buildLifecycleQuery(filters);
  const result = await query(lifecycleQuery.text, lifecycleQuery.params);

  logger.info("Lifecycle records query completed", {
    lot_id: filters.lotId,
    query_date_range: {
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
    number_of_records: result.rows.length,
  });

  return result.rows;
}

/**
 * Fetches top lots by total defects.
 *
 * @param {number} limit - Number of top rows to return.
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(i log i) due to aggregation and sort over inspection rows.
 * Space Complexity: O(k) where k is grouped lot count.
 */
export async function findTopLotsByDefects(limit) {
  const result = await query(
    `
    SELECT
      l.lot_id,
      SUM(i.defect_count) AS total_defects
    FROM lots l
    JOIN inspection_records i ON i.lot_id = l.id
    GROUP BY l.lot_id
    ORDER BY total_defects DESC
    LIMIT $1;
    `,
    [limit],
  );

  return result.rows;
}

/**
 * Fetches lots currently on shipping hold.
 *
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(s) with potential index usage on shipment_status.
 * Space Complexity: O(r) where r is returned row count.
 */
export async function findLotsOnShippingHold() {
  const result = await query(
    `
    SELECT
      l.lot_id,
      s.shipment_status,
      s.hold_reason
    FROM lots l
    JOIN shipping_records s ON s.lot_id = l.id
    WHERE s.shipment_status = 'hold';
    `,
  );

  return result.rows;
}

/**
 * Fetches production efficiency by shift.
 *
 * @returns {Promise<object[]>}
 *
 * Time Complexity: O(p) for production scan and grouping.
 * Space Complexity: O(k) where k is distinct number of shifts (small constant in practice).
 */
export async function findProductionEfficiencyByShift() {
  const result = await query(
    `
    SELECT
      pr.shift,
      COUNT(pr.id) AS runs,
      COALESCE(SUM(pr.units_actual), 0) AS units_produced,
      COALESCE(SUM(pr.units_planned), 0) AS units_planned,
      ROUND(
        CASE
          WHEN COALESCE(SUM(pr.units_planned), 0) = 0 THEN 0
          ELSE SUM(pr.units_actual)::decimal / SUM(pr.units_planned)
        END,
        2
      ) AS efficiency
    FROM production_records pr
    GROUP BY pr.shift
    ORDER BY efficiency DESC;
    `,
  );

  return result.rows;
}
