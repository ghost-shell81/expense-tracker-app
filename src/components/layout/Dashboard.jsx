import React from "react";
import SummaryPanel from "../../features/summary/SummaryPanel";

export default function Dashboard({
  children,
  expenses = [],
  setExpenses,
  categories = [],
  setCategories,
  monthlyBudgets = {},
  setMonthlyBudgets,
}) {
  return (
    <main className="dashboard-container">
      <section className="dashboard-content">{children}</section>

      <aside className="dashboard-sidebar">
        <div style={{ marginBottom: 12 }}>
          <SummaryPanel
            expenses={expenses}
            categories={categories}
            monthlyBudgets={monthlyBudgets}
          />
        </div>
        <div className="widget">
          <div className="widget-title">Expenses</div>
          <div>{expenses.length}</div>
        </div>

        <div className="widget">
          <div className="widget-title">Categories</div>
          <div>{categories.length}</div>
        </div>

        <div className="widget">
          <div className="widget-title">Monthly Budgets</div>
          <div>{Object.keys(monthlyBudgets || {}).length}</div>
        </div>
      </aside>
    </main>
  );
}
