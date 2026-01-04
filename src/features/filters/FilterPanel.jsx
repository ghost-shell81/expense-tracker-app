import React, { useState } from "react";
import Card from "../../components/common/Card";

export default function FilterPanel({ categories = [], onApply }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  function handleApply() {
    const payload = {
      startDate: startDate || null,
      endDate: endDate || null,
      categoryId: categoryId || null,
    };
    if (typeof onApply === "function") onApply(payload);
  }

  function handleReset() {
    setStartDate("");
    setEndDate("");
    setCategoryId("");
    if (typeof onApply === "function")
      onApply({ startDate: null, endDate: null, categoryId: null });
  }

  return (
    <Card className="filter-panel">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
          Start
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
          End
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
          }}
        >
          <option value="">All categories</option>
          {(categories || []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleApply} style={{ padding: "6px 10px" }}>
          Apply
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: "6px 10px",
            background: "transparent",
            border: "1px solid #e5e7eb",
          }}
        >
          Reset
        </button>
      </div>
    </Card>
  );
}
