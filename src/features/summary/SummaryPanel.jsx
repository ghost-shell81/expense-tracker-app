import React from "react";
import useExpenseStats from "./useExpenseStats";
import StatCard from "./StatCard";

function formatCurrency(v) {
  if (v == null || v === "") return "—";
  const n = Number(v);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "NPR",
  }).format(n);
}

export default function SummaryPanel({
  expenses = [],
  categories = [],
  monthlyBudgets = {},
  topN = 5,
}) {
  const { totalSpent, totalBudget, remainingBudget, perCategory } =
    useExpenseStats(expenses, categories, monthlyBudgets);

  const top = (perCategory || []).slice(0, topN);

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <StatCard label="Total Spent" value={totalSpent} positiveGood={false} />
        <StatCard
          label="Total Budget"
          value={totalBudget}
          positiveGood={true}
        />
        <StatCard
          label="Remaining"
          value={remainingBudget}
          positiveGood={true}
          sub={remainingBudget < 0 ? "Over budget" : ""}
        />
      </div>

      <div>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14 }}>
          Top Spending Categories
        </h3>
        <div style={{ display: "grid", gap: 8 }}>
          {top.length === 0 && (
            <div style={{ color: "#6b7280" }}>No categories to show</div>
          )}
          {top.map((c) => {
            const pct = c.progress == null ? 0 : Math.round(c.progress);
            const clamped = Math.max(0, Math.min(200, pct));
            const barColor =
              pct > 100 ? "#ef4444" : pct > 75 ? "#f59e0b" : "#10b981";

            return (
              <div
                key={c.categoryId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  borderRadius: 8,
                  background: "#fff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: c.color || "#c7d2fe",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}
                    >
                      Spent {formatCurrency(c.spent)} • Budget{" "}
                      {c.budget != null ? formatCurrency(c.budget) : "—"}
                    </div>
                  </div>
                </div>

                <div style={{ width: 160, marginLeft: 12 }}>
                  <div
                    style={{
                      height: 8,
                      background: "#e5e7eb",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(clamped, 100)}%`,
                        height: "100%",
                        background: barColor,
                        transition: "width 240ms",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#374151",
                      marginTop: 6,
                    }}
                  >
                    {c.progress == null ? "—" : `${Math.round(c.progress)}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
