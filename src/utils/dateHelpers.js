function toDateOnly(input) {
  if (input == null) return null;
  try {
    const d = input instanceof Date ? new Date(input) : new Date(String(input));
    if (Number.isNaN(d.getTime())) return null;
    // normalize to midnight (local) for comparisons
    d.setHours(0, 0, 0, 0);
    return d;
  } catch {
    return null;
  }
}

export function isInDateRange(date, startDate, endDate) {
  const d = toDateOnly(date);
  if (!d) return false;

  const s = toDateOnly(startDate);
  const e = toDateOnly(endDate);

  if (!s && !e) return true;
  if (s && !e) return d >= s;
  if (!s && e) return d <= e;
  return d >= s && d <= e;
}

export default {
  toDateOnly,
  isInDateRange,
};
