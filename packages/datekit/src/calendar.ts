import { assertValidDate } from './validate'
import { add, startOf } from './manipulate'

/**
 * Number of days in the month of `date` (local calendar).
 * 该日期所在自然月的天数（本地日历）。
 *
 * @param date - Any instant in the target month / 该月内任意时刻
 * @returns Day count 28–31 / 天数
 *
 * @example
 * daysInMonth(new Date(2026, 1, 1)) // 2026-02 → 28
 */
export function daysInMonth(date: Date): number {
  assertValidDate(date)
  const y = date.getFullYear()
  const m = date.getMonth()
  return new Date(y, m + 1, 0).getDate()
}

/**
 * Calendar quarter 1–4 (local time).
 * 自然季度 1–4（本地时间）。
 *
 * @param date - Input date / 输入日期
 * @returns Quarter index / 季度编号
 *
 * @example
 * quarter(new Date(2026, 4, 8)) // 五月 → 2
 */
export function quarter(date: Date): number {
  assertValidDate(date)
  return Math.floor(date.getMonth() / 3) + 1
}

/**
 * Six-by-seven grid of Dates for a month view; weeks start on Monday (same as `startOf(..., 'week')`).
 * 月视图 6×7 日期矩阵；周一开始（与 `startOf(..., 'week')` 一致）。
 *
 * @param year - Full year e.g. 2026 / 四位年份
 * @param month - Month 1–12 (January = 1) / 月份 1–12，一月为 1
 * @returns 6 rows of 7 Dates / 6 行每行 7 个 Date
 *
 * @example
 * calendarMatrix(2026, 5)[0][0] // 网格左上角：含上月补位的周一
 */
export function calendarMatrix(year: number, month: number): Date[][] {
  if (!Number.isInteger(year)) {
    throw new RangeError('year must be an integer')
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError('month must be an integer from 1 to 12')
  }
  const first = new Date(year, month - 1, 1)
  const gridStart = startOf(first, 'week')
  const rows: Date[][] = []
  for (let r = 0; r < 6; r++) {
    const row: Date[] = []
    for (let c = 0; c < 7; c++) {
      const idx = r * 7 + c
      row.push(add(gridStart, idx, 'days'))
    }
    rows.push(row)
  }
  return rows
}
