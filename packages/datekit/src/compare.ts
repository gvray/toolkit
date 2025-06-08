/**
 * Check if two dates are equal.
 * 检查两个日期是否相等。
 */
export function isEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime()
}

/**
 * Check if first date is before second date.
 * 检查第一个日期是否在第二个日期之前。
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime()
}

/**
 * Check if first date is after second date.
 * 检查第一个日期是否在第二个日期之后。
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime()
}
