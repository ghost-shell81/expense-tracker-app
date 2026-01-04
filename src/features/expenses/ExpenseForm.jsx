import React, { useState, useEffect } from "react";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { validateExpense } from "../../utils/validators";

export default function ExpenseForm({
  onAddExpense,
  onUpdateExpense,
  onCancelEdit,
  editingExpense = null,
  categories = [],
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setAmount("");
    setCategoryId("");
    setDate("");
    setDescription("");
    setError("");

    if (typeof onCancelEdit === "function") onCancelEdit();
  };

  // prefill form when editingExpense is set
  useEffect(() => {
    if (editingExpense) {
      setAmount(String(editingExpense.amount ?? ""));
      setCategoryId(
        editingExpense.categoryId ?? categories[0]?.id ?? "Uncategorized"
      );
      setDate(
        editingExpense.date
          ? new Date(editingExpense.date).toISOString().slice(0, 10)
          : today
      );
      setDescription(editingExpense.description ?? "");
      setError("");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const validation = validateExpense({
      amount,
      date,
      categoryId,
      description,
    });

    if (validation && Object.keys(validation).length > 0) {
      const first = validation[Object.keys(validation)[0]];
      setError(first);
      return;
    }

    const parsed = parseFloat(amount);

    const expense = {
      id:
        editingExpense?.id ||
        (typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString()),

      amount: parsed,
      description: description ?? "",
      categoryId: categoryId ?? "uncategorized",
      date: new Date(date).toISOString(),
      createdAt: editingExpense?.createdAt || new Date().toISOString(),
    };

    if (editingExpense) {
      if (typeof onUpdateExpense === "function") onUpdateExpense(expense);
    } else {
      if (typeof onAddExpense === "function") onAddExpense(expense);
    }

    reset();
  };

  return (
    <Card style={{ marginBottom: 16, marginTop: 16 }}>
      <form onSubmit={handleSubmit} aria-label="Add expense form">
        <div className="expense-row">
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount e.g. 50"
            type="number"
            step="0.01"
            min="0"
            name="amount"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "#fff",
              cursor: "pointer",
            }}
            name="category"
          >
            <option value="">Uncategorized</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id ?? c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="expense-row-2">
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            name="description"
          />
        </div>

        {error && (
          <div style={{ color: "crimson", marginTop: 8, fontSize: 13 }}>
            {error}
          </div>
        )}

        <div className="expense-actions">
          <Button
            type="submit"
            variant="primary"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "6px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {editingExpense ? "Save" : "Add Expense"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            style={{
              background: "#f3f4f6",
              color: "#111827",
              border: "none",
              padding: "6px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={reset}
          >
            {editingExpense ? "Cancel" : "Reset"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
