import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import FilterPanel from "../filters/FilterPanel";

import useFilteredExpenses from "./useFilteredExpenses";

export default function ExpenseSection({
  expenses = [],
  categories = [],
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  onEditExpense,
  editingExpense = null,
  onCancelEdit,
}) {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    categoryId: "all",
  });

  const filteredExpenses = useFilteredExpenses(expenses, filters);

  const handleApplyFilters = (next) => {
    setFilters({
      startDate: next?.startDate ?? null,
      endDate: next?.endDate ?? null,
      categoryId: next?.categoryId ?? "all",
    });
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <FilterPanel
        categories={categories}
        initialFilters={filters}
        onApply={handleApplyFilters}
      />
      <ExpenseForm
        onAddExpense={onAddExpense}
        categories={categories}
        editingExpense={editingExpense}
        onUpdateExpense={onUpdateExpense}
        onCancelEdit={onCancelEdit}
      />

      <ExpenseList
        expenses={filteredExpenses}
        categories={categories}
        onDeleteExpense={onDeleteExpense}
        onEditExpense={onEditExpense}
      />
    </div>
  );
}
