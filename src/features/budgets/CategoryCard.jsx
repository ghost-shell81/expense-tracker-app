import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/common/Card";
import ProgressBar from "../../components/common/ProgressBar";
import {
  calculateTotalSpent,
  calculateBudgetProgress,
} from "../../utils/calculations";
import { validateBudget } from "../../utils/validators";

export default function CategoryCard({
  category = {},
  budget = null,
  onUpdateBudget,
  expenses = [],
}) {
  const { id, name, color } = category || {};
  const amount = typeof budget === "number" ? budget : null;
  const formatted =
    amount != null
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "NPR",
        }).format(amount)
      : "--";

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    amount != null ? String(amount) : ""
  );
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const spent = calculateTotalSpent(expenses, category.id);
  const percent = budget ? calculateBudgetProgress(spent, budget) : 0;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(amount != null ? String(amount) : "");
  }, [amount]);

  function save() {
    setError("");
    const validation = validateBudget(editValue);
    if (validation && Object.keys(validation).length > 0) {
      setError(validation.amount || "Invalid budget value.");
      return;
    }

    const parsed = parseFloat(editValue);
    if (Number.isNaN(parsed)) {
      if (typeof onUpdateBudget === "function") onUpdateBudget(id, null);
    } else {
      if (typeof onUpdateBudget === "function") onUpdateBudget(id, parsed);
    }
    setIsEditing(false);
    setError("");
  }

  function cancel() {
    setEditValue(amount != null ? String(amount) : "");
    setIsEditing(false);
  }

  return (
    <Card className="category-card" style={{ padding: 12 }}>
      <div
        className="category-row"
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
            className="category-icon"
            title={name}
            style={{
              // width: 12,
              // height: 12,
              // borderRadius: "50%",
              background: color || "#6b7280",
              flexShrink: 0,
            }}
          >
            {name ? name[0].toUpperCase() : "#"}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
                whiteSpace: "nowrap",
                // overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name || "Unnamed"}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              Category
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right", minWidth: 160 }}>
          {!isEditing ? (
            <>
              <div style={{ fontWeight: 700, color: "#111827" }}>
                {formatted}
              </div>
              {/* <div style={{ marginTop: 6 }}>
                <ProgressBar percentage={percent} showLabel={true} />
              </div> */}
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <span>Budget</span>
                <button
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit budget"
                  style={{
                    background: "transparent",
                    border: "1px solid rgb(213, 231, 235)",
                    color: "#2563eb",
                    cursor: "pointer",
                    fontSize: 13,
                    padding: "2px 8px",
                    borderRadius: "3px",
                  }}
                >
                  Edit
                </button>
              </div>
              <div style={{ marginTop: 6 }}>
                <ProgressBar percentage={percent} showLabel={true} />
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") cancel();
                }}
                placeholder="amount"
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #e5e7eb",
                  width: 100,
                }}
              />
              {error && (
                <div style={{ color: "crimson", fontSize: 12, marginTop: 6 }}>
                  {error}
                </div>
              )}
              <button
                onClick={save}
                style={{ padding: "6px 8px", borderRadius: 6 }}
              >
                Save
              </button>
              <button
                onClick={cancel}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
