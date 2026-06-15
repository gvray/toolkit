/**
 * Check if two dates represent the same moment.
 * 检查两个日期是否表示同一时刻。
 *
 * @example
 * isEqual(new Date('2024-01-15'), new Date('2024-01-15')) // => true
 * @since 1.0.0
 */
export function isEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

/**
 * Check if `date1` is strictly before `date2`.
 * 检查 `date1` 是否严格早于 `date2`。
 *
 * @example
 * isBefore(new Date('2024-01-01'), new Date('2024-06-01')) // => true
 * @since 1.0.0
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

/**
 * Check if `date1` is strictly after `date2`.
 * 检查 `date1` 是否严格晚于 `date2`。
 *
 * @example
 * isAfter(new Date('2024-06-01'), new Date('2024-01-01')) // => true
 * @since 1.0.0
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/**
 * Whether a date falls within a closed interval [min(start,end), max(start,end)] (inclusive).
 * Order-insensitive: automatically normalises which bound is lower.
 * 判断日期是否在闭区间内（含端点），自动处理 start/end 的大小顺序。
 *
 * @example
 * isBetween(new Date('2026-05-10'), new Date('2026-05-01'), new Date('2026-05-31')) // => true
 * @since 1.0.0
 */
export function isBetween(date: Date, start: Date, end: Date): boolean {
  const lo = start.getTime() <= end.getTime() ? start.getTime() : end.getTime();
  const hi = start.getTime() <= end.getTime() ? end.getTime() : start.getTime();
  const t = date.getTime();
  return t >= lo && t <= hi;
}
