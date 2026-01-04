import React from "react";
import CategoryCard from "./CategoryCard";

export default function BudgetOverview({
  categories = [],
  expenses = [],
  monthlyBudgets = {},
  onUpdateBudget,
}) {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 12,
        }}
      >
        {(categories || []).map((cat) => (
          <CategoryCard
            key={cat.id ?? cat.name}
            category={cat}
            budget={monthlyBudgets ? monthlyBudgets[cat.id] : null}
            expenses={expenses}
            onUpdateBudget={onUpdateBudget}
          />
        ))}
      </div>
    </section>
  );
}
