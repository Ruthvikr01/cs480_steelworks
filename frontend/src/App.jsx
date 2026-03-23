/**
 * Module: App.jsx
 * Responsibility: Main dashboard page composing all analytics tables.
 */
import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "./api.js";
import DataTable from "./components/DataTable.jsx";

/**
 * Main application component.
 *
 * @returns {JSX.Element}
 *
 * Time Complexity: O(k + render_cost) where k is endpoint orchestration count.
 * Space Complexity: O(total dataset size) due to stateful data storage.
 */
export default function App() {
  // Stores all dashboard datasets once loaded.
  const [data, setData] = useState(null);

  // Tracks loading status for initial and future refreshes.
  const [isLoading, setIsLoading] = useState(true);

  // Captures network/API errors for user-friendly messaging.
  const [error, setError] = useState("");

  // Lot/date filters that map directly to user story selection criteria.
  const [filters, setFilters] = useState({
    lotId: "",
    startDate: "",
    endDate: ""
  });

  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    // Local flag prevents state updates after unmount (avoids React memory leak warning).
    let isMounted = true;

    /**
     * Loads dashboard datasets.
     *
     * Time Complexity: O(k) orchestration + network/database time.
     * Space Complexity: O(total response size).
     */
    async function load() {
      try {
        setIsLoading(true);
        setError("");

        const dashboardData = await fetchDashboardData(filters);

        // Guards against updating unmounted component.
        if (isMounted) {
          setData(dashboardData);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Unknown error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void load();

    // Cleanup flips mount flag so in-flight promises do not update stale state.
    return () => {
      isMounted = false;
    };
  }, [filters]);

  /**
   * Updates an individual filter field.
   *
   * @param {"lotId"|"startDate"|"endDate"} field
   * @param {string} value
   * @returns {void}
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  function updateFilter(field, value) {
    setDraftFilters((previous) => ({
      ...previous,
      [field]: value
    }));
  }

  /**
   * Applies draft filter values and triggers data reload via useEffect dependency.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  function applyFilters() {
    setFilters(draftFilters);
  }

  /**
   * Applies filters when user presses Enter inside a filter input.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   * @returns {void}
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  function handleEnter(event) {
    if (event.key === "Enter") {
      applyFilters();
    }
  }


  /**
   * Resets all filters to show full dataset.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  function clearFilters() {
    const empty = { lotId: "", startDate: "", endDate: "" };
    setDraftFilters(empty);
    setFilters(empty);
  }

  const hasAppliedFilters =
    String(filters.lotId).trim() !== "" ||
    String(filters.startDate).trim() !== "" ||
    String(filters.endDate).trim() !== "";


  if (isLoading) {
    return <main className="container">Loading dashboard...</main>;
  }

  if (error) {
    return <main className="container error">Failed to load data: {error}</main>;
  }

  return (
    <main className="container">
      <header>
        <h1>Operations Analytics Dashboard</h1>
         <h2>CD TEST</h2>
        <p>Read-only reporting UI backed by PostgreSQL analytics queries.</p>

        <section className="filters" aria-label="Dashboard filters">
          <label>
            Lot ID
            <input
              type="text"
              value={draftFilters.lotId}

              onChange={(event) => {
                updateFilter("lotId", event.target.value);
              }}
              onKeyDown={handleEnter}
              placeholder="e.g., LOT-001"
            />
          </label>

          <label>
            Start Date
            <input
              type="date"
              value={draftFilters.startDate}
              onChange={(event) => {
                updateFilter("startDate", event.target.value);
              }}
              onKeyDown={handleEnter}
            />
          </label>

          <label>
            End Date
            <input
              type="date"
              value={draftFilters.endDate}
              onChange={(event) => {
                updateFilter("endDate", event.target.value);
              }}
              onKeyDown={handleEnter}
            />
          </label>

          <button type="button" onClick={clearFilters}>
            Clear Filters
          </button>
        </section>
      </header>

      {data && (
        <div className="grid">
          {hasAppliedFilters && <DataTable title="Lot Lifecycle" rows={data.lifecycle} />}
          <DataTable title="Lots Production Summary" rows={data.lotsSummary} />
          <DataTable title="Production Line Performance" rows={data.linePerformance} />
          <DataTable title="Lot Inspection Results" rows={data.inspections} />
          <DataTable title="Lot Shipping Status" rows={data.shipping} />
          {!hasAppliedFilters && <DataTable title="Lot Lifecycle" rows={data.lifecycle} />}
          <DataTable title="Top Defects" rows={data.topDefects} />
          <DataTable title="Shipping Holds" rows={data.holds} />
          <DataTable title="Shift Efficiency" rows={data.shiftEfficiency} />
        </div>
      )}
    </main>
  );
}
