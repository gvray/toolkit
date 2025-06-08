/**
 * Check if a date is valid.
 * 检查日期是否有效。
 */
export function isValid(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}
