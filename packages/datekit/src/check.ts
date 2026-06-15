import { startOf } from './manipulate';

/**
 * Check if a value is a valid Date instance.
 * 检查值是否为有效的 Date 实例。
 *
 * @example
 * isValid(new Date('2024-01-15')) // => true
 * isValid(new Date('invalid')) // => false
 * @since 1.0.0
 */
export function isValid(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Check if the given year or the year of the given date is a leap year.
 * 检查给定年份（或 Date 的年份）是否为闰年。
 *
 * @example
 * isLeapYear(2024) // => true
 * isLeapYear(2023) // => false
 * @since 1.0.0
 */
export function isLeapYear(yearOrDate: number | Date): boolean {
  const year = yearOrDate instanceof Date ? yearOrDate.getFullYear() : yearOrDate;
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Same calendar day in local time.
 * 本地时间是否为同一自然日。
 *
 * @example
 * isSameDay(new Date(2026, 4, 8, 1), new Date(2026, 4, 8, 23)) // => true
 * @since 1.0.0
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Same ISO week (Monday–Sunday) in local time.
 * 本地时间是否为同一个 ISO 周（周一至周日）。
 *
 * @example
 * isSameWeek(new Date(2026, 4, 4), new Date(2026, 4, 10)) // => true (Mon–Sun of same week)
 * @since 1.0.0
 */
export function isSameWeek(date1: Date, date2: Date): boolean {
  return startOf(date1, 'week').getTime() === startOf(date2, 'week').getTime();
}

/**
 * Same calendar month in local time.
 * 本地时间是否为同一自然月。
 *
 * @example
 * isSameMonth(new Date(2026, 4, 1), new Date(2026, 4, 31)) // => true
 * @since 1.0.0
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}

/**
 * Same calendar year in local time.
 * 本地时间是否为同一年。
 *
 * @example
 * isSameYear(new Date(2026, 0, 1), new Date(2026, 11, 31)) // => true
 * @since 1.0.0
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

/**
 * Check if the given date is today in local time.
 * 检查日期是否为今天（本地时间）。
 *
 * @example
 * isToday(new Date()) // => true
 * @since 1.0.0
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Check if the given date is yesterday in local time.
 * 检查日期是否为昨天（本地时间）。
 *
 * @example
 * isYesterday(new Date(Date.now() - 86400000)) // => true (approximately)
 * @since 1.0.0
 */
export function isYesterday(date: Date): boolean {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return isSameDay(date, d);
}

/**
 * Check if the given date is tomorrow in local time.
 * 检查日期是否为明天（本地时间）。
 *
 * @example
 * isTomorrow(new Date(Date.now() + 86400000)) // => true (approximately)
 * @since 1.0.0
 */
export function isTomorrow(date: Date): boolean {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return isSameDay(date, d);
}

/**
 * Saturday or Sunday in local time.
 * 本地时间是否为周六或周日。
 *
 * @example
 * isWeekend(new Date(2026, 4, 9)) // 2026-05-09 is Saturday → true
 * @since 1.0.0
 */
export function isWeekend(date: Date): boolean {
  if (!isValid(date)) return false;
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Monday–Friday in local time.
 * 本地时间是否为周一至周五。
 *
 * @example
 * isWeekday(new Date(2026, 4, 8)) // 2026-05-08 is Friday → true
 * @since 1.0.0
 */
export function isWeekday(date: Date): boolean {
  return !isWeekend(date);
}
