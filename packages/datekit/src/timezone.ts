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

/**
 * Local IANA time zone from `Intl` (e.g. `Asia/Shanghai`).
 * 通过 `Intl` 获取本地 IANA 时区名。
 *
 * @returns IANA zone id / IANA 时区字符串
 *
 * @example
 * getLocalTimezone() // → 例如 'Asia/Shanghai' 或 'America/New_York'
 */
export function getLocalTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (typeof tz === 'string' && tz.length > 0) {
      return tz
    }
  } catch {
    // ignore
  }
  return 'UTC'
}
