import React from "react";

function formatCurrency(v) {
  if (v == null || v === "") return "—";
  const n = Number(v);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "NPR",
  }).format(n);
}

export default function StatCard({ label, value, sub, positiveGood = true }) {
  const n = typeof value === "number" ? value : Number(value);
  const isPositive = Number.isFinite(n) ? n >= 0 : null;
  const color =
    isPositive == null
      ? "#374151"
      : isPositive === positiveGood
      ? "#10b981"
      : "#ef4444";

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        minWidth: 160,
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color }}>
        {formatCurrency(n)}
      </div>
      {sub ? (
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
}
