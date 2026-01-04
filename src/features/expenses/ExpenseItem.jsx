import React from "react";
import Card from "../../components/common/Card";

export default function ExpenseItem({
  expense = {},
  category = null,
  onDelete,
  onEdit,
}) {
  const amountFormatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 2,
  }).format(Number(expense.amount ?? 0));

  const dateLabel = expense.date
    ? new Date(expense.date).toLocaleDateString()
    : "";

  const categoryName = category?.name || expense.category || "Uncategorized";
  const color = category?.color || "#e5e7eb";

  return (
    <Card style={{ padding: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          <div
            aria-hidden
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {categoryName}
            </div>
            {expense.description ? (
              <div
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  marginTop: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {expense.description}
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ textAlign: "right", minWidth: 120 }}>
          <div style={{ fontWeight: 700, color: "#111827" }}>
            {amountFormatted}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
            {dateLabel}
          </div>
          <div>
            <button
              onClick={() => {
                if (typeof onEdit === "function") onEdit(expense);
              }}
              aria-label="Edit expenses"
              style={{
                background: "transparent",
                border: "1px solid #d5e7eb",
                color: "#111827",
                cursor: "pointer",
                fontSize: 13,
                padding: "6px 8px",
                borderRadius: 6,
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                const ok = window.confirm("Delete this expense?");
                if (!ok) return;
                if (typeof onDelete === "function") {
                  onDelete(expense.id);
                }
              }}
              aria-label="Delete expense"
              style={{
                background: "transparent",
                border: "none",
                color: "#ef4444",
                cursor: "pointer",
                fontSize: 13,
                padding: 6,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
