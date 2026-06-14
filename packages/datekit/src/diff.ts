import { startOf } from './manipulate';

export type DiffUnit =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds';

const MS_DAY = 86400000;
const MS_WEEK = 7 * MS_DAY;

/**
 * Signed difference from `dateLeft` to `dateRight` in the given unit.
 * Years/months use calendar arithmetic; days/weeks align to start-of-day/week.
 * 从 `dateLeft` 到 `dateRight` 的带符号差值；年/月按日历对齐，日/周对齐到自然日/周起始。
 *
 * @example
 * diff(new Date('2026-05-01'), new Date('2026-05-08'), 'days') // => 7
 * diff(new Date('2026-01-01'), new Date('2026-04-01'), 'months') // => 3
 * @since 1.0.0
 */
export function diff(dateLeft: Date, dateRight: Date, unit: DiffUnit): number {
  switch (unit) {
    case 'milliseconds':
      return dateRight.getTime() - dateLeft.getTime();
    case 'seconds':
      return Math.trunc((dateRight.getTime() - dateLeft.getTime()) / 1000);
    case 'minutes':
      return Math.trunc((dateRight.getTime() - dateLeft.getTime()) / 60000);
    case 'hours':
      return Math.trunc((dateRight.getTime() - dateLeft.getTime()) / 3600000);
    case 'days': {
      const a = startOf(dateLeft, 'day').getTime();
      const b = startOf(dateRight, 'day').getTime();
      return Math.round((b - a) / MS_DAY);
    }
    case 'weeks': {
      const a = startOf(dateLeft, 'week').getTime();
      const b = startOf(dateRight, 'week').getTime();
      return Math.round((b - a) / MS_WEEK);
    }
    case 'months':
      return (
        (dateRight.getFullYear() - dateLeft.getFullYear()) * 12 +
        (dateRight.getMonth() - dateLeft.getMonth())
      );
    case 'years':
      return dateRight.getFullYear() - dateLeft.getFullYear();
  }
}
