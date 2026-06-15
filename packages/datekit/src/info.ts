/**
 * Number of days in the month of `date` (local calendar).
 * 该日期所在自然月的天数（本地日历）。
 *
 * @example
 * daysInMonth(new Date(2026, 1, 1)) // 2026-02 → 28
 * @since 1.0.0
 */
export function daysInMonth(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m + 1, 0).getDate();
}

/**
 * Calendar quarter 1–4 (local time).
 * 自然季度 1–4（本地时间）。
 *
 * @example
 * quarter(new Date(2026, 4, 8)) // May → 2
 * @since 1.0.0
 */
export function quarter(date: Date): number {
  return Math.floor(date.getMonth() / 3) + 1;
}

/**
 * ISO week number (1–53) for a date in local time.
 * 本地时间下的 ISO 周序号（1–53）。
 *
 * @example
 * weekOfYear(new Date(2026, 4, 8)) // => 19
 * @since 1.0.0
 */
export function weekOfYear(date: Date): number {
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = (target.getDay() + 6) % 7;
  target.setDate(target.getDate() - day + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDay = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDay + 3);
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / 604800000);
}

/**
 * Day of year (1–366) in local time.
 * 本地时间下的年内第几天（1–366）。
 *
 * @example
 * dayOfYear(new Date(2026, 4, 8)) // => 128
 * @since 1.0.0
 */
export function dayOfYear(date: Date): number {
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const start = Date.UTC(date.getFullYear(), 0, 0);
  return Math.floor((current - start) / 86400000);
}
