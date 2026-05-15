import { assertValidDate } from './validate'

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

/**
 * Whether a date falls within a closed interval [min(start,end), max(start,end)] (inclusive).
 * 判断日期是否在闭区间 [较小端, 较大端] 内（含端点）。
 *
 * @param date - Date to test / 待判断的日期
 * @param start - Interval bound / 区间一端
 * @param end - Interval bound / 区间另一端
 * @returns True if inside / 在区间内为 true
 *
 * @example
 * isBetween(new Date('2026-05-10'), new Date('2026-05-01'), new Date('2026-05-31')) // → true
 */
export function isBetween(date: Date, start: Date, end: Date): boolean {
  assertValidDate(date)
  assertValidDate(start, 'start')
  assertValidDate(end, 'end')
  const lo = start.getTime() <= end.getTime() ? start : end
  const hi = start.getTime() <= end.getTime() ? end : start
  const t = date.getTime()
  return t >= lo.getTime() && t <= hi.getTime()
}

/**
 * Same calendar day in local time.
 * 本地时间是否同一自然日。
 *
 * @param date1 - First date / 第一个日期
 * @param date2 - Second date / 第二个日期
 * @returns True if same local calendar day / 同一自然日则为 true
 *
 * @example
 * isSameDay(new Date(2026, 4, 8, 1), new Date(2026, 4, 8, 23)) // → true
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  assertValidDate(date1, 'date1')
  assertValidDate(date2, 'date2')
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Same calendar month in local time.
 * 本地时间是否同一自然月。
 *
 * @param date1 - First date / 第一个日期
 * @param date2 - Second date / 第二个日期
 * @returns True if same year-month / 同年同月则为 true
 *
 * @example
 * isSameMonth(new Date(2026, 4, 1), new Date(2026, 4, 31)) // → true
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  assertValidDate(date1, 'date1')
  assertValidDate(date2, 'date2')
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}

/**
 * Same calendar year in local time.
 * 本地时间是否同一年。
 *
 * @param date1 - First date / 第一个日期
 * @param date2 - Second date / 第二个日期
 * @returns True if same year / 同年则为 true
 *
 * @example
 * isSameYear(new Date(2026, 0, 1), new Date(2026, 11, 31)) // → true
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  assertValidDate(date1, 'date1')
  assertValidDate(date2, 'date2')
  return date1.getFullYear() === date2.getFullYear()
}

/**
 * Saturday or Sunday in local time.
 * 本地时间是否为周六或周日。
 *
 * @param date - Date to check / 待检查的日期
 * @returns True if weekend / 周末则为 true
 *
 * @example
 * isWeekend(new Date(2026, 4, 9)) // 2026-05-09 为周六 → true
 */
export function isWeekend(date: Date): boolean {
  assertValidDate(date)
  const day = date.getDay()
  return day === 0 || day === 6
}

/**
 * Monday–Friday in local time.
 * 本地时间是否为周一至周五。
 *
 * @param date - Date to check / 待检查的日期
 * @returns True if weekday / 工作日则为 true
 *
 * @example
 * isWeekday(new Date(2026, 4, 8)) // 2026-05-08 为周五 → true
 */
export function isWeekday(date: Date): boolean {
  assertValidDate(date)
  return !isWeekend(date)
}
