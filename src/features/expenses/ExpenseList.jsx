import React from "react";
import Card from "../../components/common/Card";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({
  expenses = [],
  categories = [],
  onDeleteExpense,
  onEditExpense,
}) {
  const findCategory = (categoryId) =>
    categories.find((c) => c.id === categoryId || c.name === categoryId) ||
    null;

  const sorted = Array.isArray(expenses)
    ? [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  if (sorted.length === 0) {
    return (
      <Card style={{ color: "#6b7280" }}>
        <div>No expenses yet</div>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {sorted.map((exp) => (
        <ExpenseItem
          key={exp.id ?? `${exp.date}-${exp.amount}`}
          expense={exp}
          onDelete={onDeleteExpense}
          onEdit={onEditExpense}
          category={findCategory(exp.categoryId)}
        />
      ))}
    </div>
  );
}
