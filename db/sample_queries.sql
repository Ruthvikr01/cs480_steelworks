-- ==========================================
-- sample_queries.sql
-- ==========================================

-- ========================
-- 1️⃣ View all lots with their production summary
-- ========================
SELECT
    l.lot_id,
    l.part_number,
    l.production_date,
    l.status,
    COUNT(pr.id) AS production_runs,
    SUM(pr.units_planned) AS total_units_planned,
    SUM(pr.units_actual) AS total_units_actual,
    SUM(pr.downtime_minutes) AS total_downtime
FROM lots l
LEFT JOIN production_records pr ON pr.lot_id = l.id
GROUP BY l.id, l.lot_id, l.part_number, l.production_date, l.status
ORDER BY l.production_date;

-- ========================
-- 2️⃣ Production line performance
-- ========================
SELECT
    pl.line_name,
    COUNT(pr.id) AS total_runs,
    SUM(pr.units_planned) AS units_planned,
    SUM(pr.units_actual) AS units_actual,
    SUM(pr.downtime_minutes) AS downtime_minutes,
    ROUND(AVG(pr.units_actual::decimal / pr.units_planned),2) AS efficiency_ratio
FROM production_lines pl
LEFT JOIN production_records pr ON pr.production_line_id = pl.id
GROUP BY pl.id, pl.line_name
ORDER BY efficiency_ratio DESC;

-- ========================
-- 3️⃣ Lots with inspection results
-- ========================
SELECT
    l.lot_id,
    l.part_number,
    i.inspection_date,
    i.defect_count,
    i.inspection_result,
    i.inspector
FROM lots l
LEFT JOIN inspection_records i ON i.lot_id = l.id
ORDER BY i.inspection_date;

-- ========================
-- 4️⃣ Lots with shipping status
-- ========================
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
ORDER BY s.ship_date;

-- ========================
-- 5️⃣ Combined “lot lifecycle” view
-- ========================
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
    s.shipment_status
FROM lots l
LEFT JOIN production_records pr ON pr.lot_id = l.id
LEFT JOIN inspection_records i ON i.lot_id = l.id
LEFT JOIN shipping_records s ON s.lot_id = l.id
ORDER BY l.production_date, pr.production_date;

-- ========================
-- 6️⃣ Top lots by defects
-- ========================
SELECT
    l.lot_id,
    SUM(i.defect_count) AS total_defects
FROM lots l
JOIN inspection_records i ON i.lot_id = l.id
GROUP BY l.lot_id
ORDER BY total_defects DESC
LIMIT 5;

-- ========================
-- 7️⃣ Lots on hold for shipping
-- ========================
SELECT
    l.lot_id,
    s.shipment_status,
    s.hold_reason
FROM lots l
JOIN shipping_records s ON s.lot_id = l.id
WHERE s.shipment_status = 'hold';

-- ========================
-- 8️⃣ Production efficiency per shift
-- ========================
SELECT
    pr.shift,
    COUNT(pr.id) AS runs,
    SUM(pr.units_actual) AS units_produced,
    SUM(pr.units_planned) AS units_planned,
    ROUND(SUM(pr.units_actual)::decimal / SUM(pr.units_planned),2) AS efficiency
FROM production_records pr
GROUP BY pr.shift
ORDER BY efficiency DESC;
