/**
 * Get relative time string using Intl.RelativeTimeFormat if available.
 * 获取相对时间字符串，优先使用 Intl.RelativeTimeFormat。
 *
 * @param date - The date to compare / 要比较的日期
 * @param locale - Locale for formatting / 格式化区域设置
 * @returns Relative time string / 相对时间字符串
 *
 * @example
 * timeAgo(new Date(Date.now() - 60000)) // '1 minute ago'
 */
export function timeAgo(date: Date, locale = 'en-US'): string {
  const now = new Date()
  const diffInMs = date.getTime() - now.getTime()
  const diffInSeconds = Math.round(diffInMs / 1000)

  if (Math.abs(diffInSeconds) < 60) {
    return locale.startsWith('zh') ? '刚刚' : 'just now'
  }

  const units: Array<{ unit: Intl.RelativeTimeFormatUnit; ms: number }> = [
    { unit: 'year', ms: 31536000000 },
    { unit: 'month', ms: 2629800000 },
    { unit: 'day', ms: 86400000 },
    { unit: 'hour', ms: 3600000 },
    { unit: 'minute', ms: 60000 }
  ]

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'always' })

  for (const { unit, ms } of units) {
    if (Math.abs(diffInMs) >= ms) {
      const value = Math.round(diffInMs / ms)
      return rtf.format(value, unit)
    }
  }

  return locale.startsWith('zh') ? '刚刚' : 'just now'
}
