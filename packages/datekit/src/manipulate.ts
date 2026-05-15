import { assertValidDate } from './validate'

export type StartEndUnit = 'day' | 'week' | 'month' | 'year' | 'quarter'

export type SetDateUnit =
  | 'year'
  | 'month'
  | 'date'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

/**
 * Return a copy of a date (new Date with the same time value).
 * 返回日期的副本（相同时间戳的新 Date）。
 *
 * @param date - Source date / 源日期
 * @returns New Date instance / 新的 Date 实例
 *
 * @example
 * const d = new Date('2026-05-08T12:00:00')
 * clone(d).setHours(0) // d 仍为 12 点
 */
export function clone(date: Date): Date {
  assertValidDate(date)
  return new Date(date.getTime())
}

/**
 * Set the start of a calendar unit (local time). Week starts on Monday.
 * 将日期对齐到某个日历单位的开始（本地时间）。一周从周一开始。
 *
 * @param date - Input date / 输入日期
 * @param unit - Calendar unit / 日历单位
 * @returns New Date / 新日期
 *
 * @example
 * startOf(new Date('2026-05-08T15:30:00'), 'day') // 当天 00:00:00.000
 * startOf(new Date('2026-05-08T15:30:00'), 'month') // 2026-05-01 00:00:00.000
 */
export function startOf(date: Date, unit: StartEndUnit): Date {
  assertValidDate(date)
  const d = clone(date)
  const m = d.getMonth()

  switch (unit) {
    case 'day':
      d.setHours(0, 0, 0, 0)
      return d
    case 'week': {
      d.setHours(0, 0, 0, 0)
      const day = d.getDay()
      const daysFromMonday = (day + 6) % 7
      d.setDate(d.getDate() - daysFromMonday)
      return d
    }
    case 'month':
      d.setMonth(m, 1)
      d.setHours(0, 0, 0, 0)
      return d
    case 'year':
      d.setMonth(0, 1)
      d.setHours(0, 0, 0, 0)
      return d
    case 'quarter': {
      const qStartMonth = Math.floor(m / 3) * 3
      d.setMonth(qStartMonth, 1)
      d.setHours(0, 0, 0, 0)
      return d
    }
  }
}

/**
 * Set the end of a calendar unit (local time). Week ends on Sunday 23:59:59.999.
 * 将日期对齐到某个日历单位的结束（本地时间）。一周结束于周日 23:59:59.999。
 *
 * @param date - Input date / 输入日期
 * @param unit - Calendar unit / 日历单位
 * @returns New Date / 新日期
 *
 * @example
 * endOf(new Date('2026-05-08T10:00:00'), 'month') // 2026-05-31 23:59:59.999
 */
export function endOf(date: Date, unit: StartEndUnit): Date {
  assertValidDate(date)
  const d = clone(date)
  const m = d.getMonth()

  switch (unit) {
    case 'day':
      d.setHours(23, 59, 59, 999)
      return d
    case 'week': {
      const sod = startOf(date, 'week')
      const e = clone(sod)
      e.setDate(e.getDate() + 6)
      e.setHours(23, 59, 59, 999)
      return e
    }
    case 'month':
      d.setMonth(m + 1, 0)
      d.setHours(23, 59, 59, 999)
      return d
    case 'year':
      d.setMonth(12, 0)
      d.setHours(23, 59, 59, 999)
      return d
    case 'quarter': {
      const q = Math.floor(m / 3)
      const lastMonthOfQuarter = q * 3 + 2
      d.setMonth(lastMonthOfQuarter + 1, 0)
      d.setHours(23, 59, 59, 999)
      return d
    }
  }
}

/**
 * Set a single date field on a copy of the date (local time). `month` uses 0–11 like `Date#getMonth`.
 * 在日期副本上设置单个分量（本地时间）。`month` 使用 0–11，与 `Date#getMonth` 一致。
 *
 * @param date - Input date / 输入日期
 * @param unit - Field to set / 要设置的分量
 * @param value - Numeric value / 数值
 * @returns New Date / 新日期
 *
 * @example
 * set(new Date('2026-05-08T10:00:00'), 'hour', 9) // 当天 09:00:00.000
 */
export function set(date: Date, unit: SetDateUnit, value: number): Date {
  assertValidDate(date)
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number')
  }
  const d = clone(date)
  switch (unit) {
    case 'year':
      d.setFullYear(value)
      return d
    case 'month':
      d.setMonth(value)
      return d
    case 'date':
      d.setDate(value)
      return d
    case 'hour':
      d.setHours(value)
      return d
    case 'minute':
      d.setMinutes(value)
      return d
    case 'second':
      d.setSeconds(value)
      return d
    case 'millisecond':
      d.setMilliseconds(value)
      return d
  }
}

/**
 * Add time to a date.
 * 向日期添加时间。
 */
export function add(
  date: Date,
  amount: number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  const result = new Date(date)

  switch (unit) {
    case 'years':
      result.setFullYear(result.getFullYear() + amount)
      break
    case 'months':
      result.setMonth(result.getMonth() + amount)
      break
    case 'days':
      result.setDate(result.getDate() + amount)
      break
    case 'hours':
      result.setHours(result.getHours() + amount)
      break
    case 'minutes':
      result.setMinutes(result.getMinutes() + amount)
      break
    case 'seconds':
      result.setSeconds(result.getSeconds() + amount)
      break
    case 'milliseconds':
      result.setMilliseconds(result.getMilliseconds() + amount)
      break
  }

  return result
}

/**
 * Subtract time from a date.
 * 从日期减去时间。
 */
export function subtract(
  date: Date,
  amount: number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  return add(date, -amount, unit)
}
