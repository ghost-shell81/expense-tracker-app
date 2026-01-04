// Basic validators for expenses and budgets
export function validateExpense({
  amount,
  date,
  categoryId,
  description,
} = {}) {
  const errors = {};

  const parsed = typeof amount === "string" ? parseFloat(amount) : amount;

  if (amount === undefined || amount === null || amount === "") {
    errors.amount = "Amount is required.";
  } else if (Number.isNaN(parsed) || parsed <= 0) {
    errors.amount = "Enter a valid amount, greater than 0.";
  }

  if (!date) {
    errors.date = "Select a date.";
  }

  if (!categoryId) {
    errors.categoryId = "Select a category.";
  }

  // description is optional

  return errors;
}

export function validateBudget(value) {
  const errors = {};

  // empty value means "no budget" and is allowed
  if (value === null || value === undefined || value === "") return errors;

  const parsed = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(parsed) || parsed < 0) {
    errors.amount = "Budget must be a positive number or empty.";
  }

  return errors;
}

export default {
  validateExpense,
  validateBudget,
};
