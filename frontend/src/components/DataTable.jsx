/**
 * Module: components/DataTable.jsx
 * Responsibility: Generic reusable table for rendering array-of-object datasets.
 */
import React from "react";

/**
 * Renders a table.
 *
 * @param {{
 *   title: string,
 *   rows: Array<Record<string, unknown>>,
 *   maxRows?: number
 * }} props
 * @returns {JSX.Element}
 *
 * Time Complexity: O(r * c) where r is displayed row count and c is column count.
 * Space Complexity: O(c) for column list and O(r) for sliced rows references.
 */
export default function DataTable({ title, rows, maxRows = 10 }) {
  // Derives visible rows with a hard cap to keep UI readable and rendering fast.
  const visibleRows = rows.slice(0, maxRows);

  // Safely derives columns from first row if available; empty dataset yields no columns.
  const columns = visibleRows.length > 0 ? Object.keys(visibleRows[0]) : [];

  return (
    <section className="table-section">
      <h2>{title}</h2>

      {visibleRows.length === 0 ? (
        <p className="empty-message">No data available.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={`${title}-${column}`}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, rowIndex) => (
                <tr key={`${title}-row-${rowIndex}`}>
                  {columns.map((column) => (
                    <td key={`${title}-${rowIndex}-${column}`}>
                      {formatValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/**
 * Converts cell values into readable strings.
 *
 * @param {unknown} value
 * @returns {string}
 *
 * Time Complexity: O(1) for primitive values.
 * Space Complexity: O(1)
 */
function formatValue(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  if (typeof value === "string") {
    const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
    if (isoDateTimePattern.test(value)) {
      return value.slice(0, 10);
    }
  }

  return String(value);
}
