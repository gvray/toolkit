/**
 * Convert date to different timezone.
 * 将日期转换为不同时区。
 */
export function toTimezone(date: Date, timezone: string): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }))
}

/**
 * Get timezone offset in minutes.
 * 获取时区偏移量（分钟）。
 */
export function getTimezoneOffset(date: Date = new Date()): number {
  return date.getTimezoneOffset()
}
