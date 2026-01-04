import React, { useState } from "react";
import "./App.css";

import Header from "./components/layout/Header";
import Dashboard from "./components/layout/Dashboard";

import * as defaultCategoriesModule from "./constants/defaultCategories";
import * as useLocalStorageModule from "./hooks/useLocalStorage";

import BudgetOverview from "./features/budgets/BudgetOverview";
import ExpenseSection from "./features/expenses/ExpenseSection";

const useLocalStorage =
  useLocalStorageModule.default || useLocalStorageModule.useLocalStorage;

const initialCategories =
  defaultCategoriesModule.DEFAULT_CATEGORIES ??
  defaultCategoriesModule.default ??
  [];

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [categories, setCategories] = useLocalStorage(
    "categories",
    initialCategories
  );
  const [editingExpense, setEditingExpense] = useState(null);
  const [monthlyBudgets, setMonthlyBudgets] = useLocalStorage(
    "monthlyBudgets",
    {}
  );

  function handleAddExpense(expense) {
    setExpenses((prev = []) => {
      return [...prev, expense];
    });
  }

  function handleDeleteExpense(id) {
    if (!id) return;
    setExpenses((prev = []) => {
      if (!Array.isArray(prev)) return prev;
      return prev.filter((e) => e.id !== id);
    });
  }

  function handleEditClick(expense) {
    setEditingExpense(expense || null);
    // scroll into view or focus could be added here
  }

  function handleUpdateExpense(updated) {
    if (!updated || !updated.id) return;
    setExpenses((prev = []) => {
      if (!Array.isArray(prev)) return prev;
      return prev.map((e) => (e.id === updated.id ? updated : e));
    });
    setEditingExpense(null);
  }

  function handleCancelEdit() {
    setEditingExpense(null);
  }

  const handleUpdateBudget = (categoryId, amount) => {
    setMonthlyBudgets((prev = {}) => {
      const next = { ...(prev || {}) };
      if (amount == null) {
        delete next[categoryId];
      } else {
        next[categoryId] = amount;
      }
      return next;
    });
  };

  return (
    <>
      <Header />
      <Dashboard
        expenses={expenses}
        setExpenses={setExpenses}
        categories={categories}
        setCategories={setCategories}
        monthlyBudgets={monthlyBudgets}
        setMonthlyBudgets={setMonthlyBudgets}
      >
        <BudgetOverview
          categories={categories}
          expenses={expenses}
          monthlyBudgets={monthlyBudgets}
          onUpdateBudget={handleUpdateBudget}
        />

        <ExpenseSection
          expenses={expenses}
          categories={categories}
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditClick}
          editingExpense={editingExpense}
          onCancelEdit={handleCancelEdit}
        />
      </Dashboard>
    </>
  );
}

export default App;

// financialIntellect
// user3010-arch
