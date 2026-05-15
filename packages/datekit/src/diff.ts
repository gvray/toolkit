import { assertValidDate } from './validate'
import { startOf } from './manipulate'

export type DiffUnit =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds'

const MS_DAY = 86400000
const MS_WEEK = 7 * MS_DAY

/**
 * Signed difference from `dateLeft` to `dateRight` in the given unit (local calendar for years/months/days/weeks).
 * 从 `dateLeft` 到 `dateRight` 的带符号差值；年/月/日/周按本地日历对齐计算。
 *
 * @param dateLeft - Earlier or later bound / 左端日期
 * @param dateRight - Earlier or later bound / 右端日期
 * @param unit - Unit of result / 结果单位
 * @returns Integer or float difference (milliseconds can be non-integer only if using float paths — here integer ms) / 差值
 *
 * @example
 * diff(new Date('2026-05-01'), new Date('2026-05-08'), 'days') // → 7
 */
export function diff(dateLeft: Date, dateRight: Date, unit: DiffUnit): number {
  assertValidDate(dateLeft, 'dateLeft')
  assertValidDate(dateRight, 'dateRight')

  switch (unit) {
    case 'milliseconds':
      return dateRight.getTime() - dateLeft.getTime()
    case 'seconds':
      return Math.trunc((dateRight.getTime() - dateLeft.getTime()) / 1000)
    case 'minutes':
      return Math.trunc((dateRight.getTime() - dateLeft.getTime()) / (60 * 1000))
    case 'hours':
      return Math.trunc((dateRight.getTime() - dateLeft.getTime()) / (60 * 60 * 1000))
    case 'days': {
      const a = startOf(dateLeft, 'day').getTime()
      const b = startOf(dateRight, 'day').getTime()
      return Math.round((b - a) / MS_DAY)
    }
    case 'weeks': {
      const a = startOf(dateLeft, 'week').getTime()
      const b = startOf(dateRight, 'week').getTime()
      return Math.round((b - a) / MS_WEEK)
    }
    case 'months':
      return (
        (dateRight.getFullYear() - dateLeft.getFullYear()) * 12 +
        (dateRight.getMonth() - dateLeft.getMonth())
      )
    case 'years':
      return dateRight.getFullYear() - dateLeft.getFullYear()
  }
}
