import { useMemo } from "react";
import { isInDateRange } from "../../utils/dateHelpers";

export default function useFilteredExpenses(expenses = [], filters = {}) {
  const { startDate = null, endDate = null, categoryId = null } = filters || {};

  return useMemo(() => {
    if (!Array.isArray(expenses)) return [];

    return expenses.filter((exp) => {
      const okDate = isInDateRange(exp.date, startDate, endDate);
      if (!okDate) return false;

      if (!categoryId || categoryId === "all") return true;

      const expCat = exp.categoryId ?? exp.category ?? null;
      return expCat === categoryId;
    });
  }, [expenses, startDate, endDate, categoryId]);
}
