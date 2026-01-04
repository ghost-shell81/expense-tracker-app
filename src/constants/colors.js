// Shared color palette for the app
const COLORS = {
  primary: "#6366F1",
  primaryLight: "#EEF2FF",
  accent: "#06B6D4",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  neutral: "#6B7280",
  background: "#FFFFFF",
  surface: "#F8FAFC",
};

export const CATEGORY_COLORS = {
  housing: "#EF4444",
  food: "#F59E0B",
  transportation: "#3B82F6",
  utilities: "#0EA5A4",
  insurance: "#8B5CF6",
  health: "#10B981",
  entertainment: "#EF6AB1",
  shopping: "#F97316",
  education: "#60A5FA",
  savings: "#14B8A6",
  other: "#6B7280",
};

export function getCategoryColor(id) {
  return CATEGORY_COLORS[id] || COLORS.neutral;
}

export { COLORS as APP_COLORS };
