/**
 * Convert date to different timezone.
 * 将日期转换为不同时区。
 *
 * @param date - Source date / 源日期
 * @param timezone - IANA timezone string / IANA 时区字符串
 * @returns New Date adjusted to the target timezone / 调整到目标时区的新 Date
 *
 * @example
 * const d = new Date('2024-01-15')
 * toTimezone(d, 'America/New_York') // Date in New York time
 * @since 1.0.0
 */
export function toTimezone(date: Date, timezone: string): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
}

/**
 * Get timezone offset in minutes.
 * 获取时区偏移量（分钟）。
 *
 * @param date - Date to get offset for (defaults to now) / 要获取偏移量的日期（默认为当前时间）
 * @returns Timezone offset in minutes / 时区偏移量（分钟）
 *
 * @example
 * const d = new Date('2024-01-15')
 * getTimezoneOffset(d) // e.g. -480 for UTC+8
 * @since 1.0.0
 */
export function getTimezoneOffset(date: Date = new Date()): number {
  return date.getTimezoneOffset();
}

/**
 * Local IANA time zone from `Intl` (e.g. `Asia/Shanghai`).
 * 通过 `Intl` 获取本地 IANA 时区名。
 *
 * @returns IANA zone id / IANA 时区字符串
 *
 * @example
 * getLocalTimezone() // => 例如 'Asia/Shanghai' 或 'America/New_York'
 * @since 1.0.0
 */
export function getLocalTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (typeof tz === 'string' && tz.length > 0) {
      return tz;
    }
  } catch {
    // ignore
  }
  return 'UTC';
}
