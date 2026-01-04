export function calculateTotalSpent(expenses = [], categoryId) {
  if (!Array.isArray(expenses)) return 0;

  return expenses.reduce((sum, exp) => {
    if (!exp) return sum;
    if (categoryId !== null && exp.categoryId !== categoryId) return sum;
    const raw = exp.amount;
    let amt = 0;
    if (typeof raw === "number" && Number.isFinite(raw)) {
      amt = raw;
    } else if (raw != null) {
      const parsed = parseFloat(String(raw).replace(/[^0-9.-]+/g, ""));
      if (Number.isFinite(parsed)) amt = parsed;
    }
    return sum + amt;
  }, 0);
}

export function calculateBudgetProgress(spent, budget) {
  if (budget == null) return null;
  const b = Number(budget);
  const s = Number(spent) || 0;

  if (!Number.isFinite(b) || b <= 0) {
    return s === 0 ? 0 : 100;
  }

  return (s / b) * 100;
}
