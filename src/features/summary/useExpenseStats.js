import { useMemo } from "react";
import {
  calculateTotalSpent,
  calculateBudgetProgress,
} from "../../utils/calculations";

export default function useExpenseStats(
  expenses = [],
  categories = [],
  monthlyBudgets = {}
) {
  return useMemo(() => {
    const catMap = new Map();
    (categories || []).forEach((c) => {
      const id = c.id ?? c.name;
      if (id !== null) catMap.set(String(id), c);
    });

    const ids = new Set();
    (expenses || []).forEach((e) => {
      const cid = e.categoryId ?? "uncategorized";
      ids.add(String(cid));
    });
    Object.keys(monthlyBudgets || {}).forEach((k) => ids.add(String(k)));

    const perCategory = Array.from(ids).map((id) => {
      const cat = catMap.get(id) ?? { id, name: id, color: "#c7d2fe" };
      const spent = Number(calculateTotalSpent(expenses, id)) || 0;
      const rawBudget = monthlyBudgets && monthlyBudgets[id];
      const budget =
        rawBudget == null || rawBudget === "" ? null : Number(rawBudget) || 0;
      const progress =
        budget != null ? calculateBudgetProgress(spent, budget) : null;

      return {
        categoryId: id,
        name: cat.name ?? id,
        color: cat.color ?? "#c7d2fe",
        spent,
        budget,
        progress,
      };
    });

    const totalSpent = perCategory.reduce(
      (s, c) => s + (Number.isFinite(c.spent) ? c.spent : 0),
      0
    );
    const totalBudget = perCategory.reduce(
      (s, c) => s + (Number.isFinite(c.budget) ? c.budget : 0),
      0
    );
    const remainingBudget = totalBudget - totalSpent;

    return {
      totalSpent,
      totalBudget,
      remainingBudget,
      perCategory: perCategory.sort((a, b) => b.spent - a.spent),
    };
  }, [expenses, categories, monthlyBudgets]);
}
