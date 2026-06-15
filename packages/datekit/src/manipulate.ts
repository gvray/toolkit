export type StartEndUnit = 'day' | 'week' | 'month' | 'year' | 'quarter';

export type SetDateUnit = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second' | 'millisecond';

/**
 * Return a copy of a date (new Date with the same time value).
 * 返回日期的副本（相同时间戳的新 Date）。
 *
 * @example
 * const d = new Date('2026-05-08T12:00:00')
 * const c = clone(d)
 * c.getTime() === d.getTime() // => true
 * c === d // => false
 * @since 1.0.0
 */
export function clone(date: Date): Date {
  return new Date(date.getTime());
}

/**
 * Set the start of a calendar unit (local time). Week starts on Monday.
 * 将日期对齐到某个日历单位的开始（本地时间）。一周从周一开始。
 *
 * @example
 * startOf(new Date('2026-05-08T15:30:00'), 'day') // 当天 00:00:00.000
 * startOf(new Date('2026-05-08T15:30:00'), 'month') // 2026-05-01 00:00:00.000
 * @since 1.0.0
 */
export function startOf(date: Date, unit: StartEndUnit): Date {
  const d = clone(date);
  const m = d.getMonth();

  switch (unit) {
    case 'day':
      d.setHours(0, 0, 0, 0);
      return d;
    case 'week': {
      d.setHours(0, 0, 0, 0);
      const day = d.getDay();
      d.setDate(d.getDate() - ((day + 6) % 7));
      return d;
    }
    case 'month':
      d.setMonth(m, 1);
      d.setHours(0, 0, 0, 0);
      return d;
    case 'year':
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      return d;
    case 'quarter': {
      d.setMonth(Math.floor(m / 3) * 3, 1);
      d.setHours(0, 0, 0, 0);
      return d;
    }
  }
}

/**
 * Set the end of a calendar unit (local time). Week ends on Sunday 23:59:59.999.
 * 将日期对齐到某个日历单位的结束（本地时间）。一周结束于周日 23:59:59.999。
 *
 * @example
 * endOf(new Date('2026-05-08T10:00:00'), 'month') // 2026-05-31 23:59:59.999
 * @since 1.0.0
 */
export function endOf(date: Date, unit: StartEndUnit): Date {
  const d = clone(date);
  const m = d.getMonth();

  switch (unit) {
    case 'day':
      d.setHours(23, 59, 59, 999);
      return d;
    case 'week': {
      const sod = startOf(date, 'week');
      sod.setDate(sod.getDate() + 6);
      sod.setHours(23, 59, 59, 999);
      return sod;
    }
    case 'month':
      d.setMonth(m + 1, 0);
      d.setHours(23, 59, 59, 999);
      return d;
    case 'year':
      d.setMonth(12, 0);
      d.setHours(23, 59, 59, 999);
      return d;
    case 'quarter': {
      const q = Math.floor(m / 3);
      d.setMonth(q * 3 + 3, 0);
      d.setHours(23, 59, 59, 999);
      return d;
    }
  }
}

/**
 * Set a single date field on a copy of the date (local time). `month` uses 0–11 like `Date#getMonth`.
 * 在日期副本上设置单个分量（本地时间）。`month` 使用 0–11，与 `Date#getMonth` 一致。
 *
 * @example
 * set(new Date('2026-05-08T10:00:00'), 'hour', 9) // 当天 09:00:00.000
 * @since 1.0.0
 */
export function set(date: Date, unit: SetDateUnit, value: number): Date {
  const d = clone(date);
  switch (unit) {
    case 'year':
      d.setFullYear(value);
      break;
    case 'month':
      d.setMonth(value);
      break;
    case 'date':
      d.setDate(value);
      break;
    case 'hour':
      d.setHours(value);
      break;
    case 'minute':
      d.setMinutes(value);
      break;
    case 'second':
      d.setSeconds(value);
      break;
    case 'millisecond':
      d.setMilliseconds(value);
      break;
  }
  return d;
}

/**
 * Add time to a date.
 * 向日期添加时间。
 *
 * @example
 * add(new Date('2024-01-15'), 7, 'days') // 2024-01-22
 * @since 1.0.0
 */
export function add(
  date: Date,
  amount: number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  const d = clone(date);
  switch (unit) {
    case 'years':
      d.setFullYear(d.getFullYear() + amount);
      break;
    case 'months':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'days':
      d.setDate(d.getDate() + amount);
      break;
    case 'hours':
      d.setHours(d.getHours() + amount);
      break;
    case 'minutes':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'seconds':
      d.setSeconds(d.getSeconds() + amount);
      break;
    case 'milliseconds':
      d.setMilliseconds(d.getMilliseconds() + amount);
      break;
  }
  return d;
}

/**
 * Subtract time from a date.
 * 从日期减去时间。
 *
 * @example
 * subtract(new Date('2024-01-15'), 7, 'days') // 2024-01-08
 * @since 1.0.0
 */
export function subtract(
  date: Date,
  amount: number,
  unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  return add(date, -amount, unit);
}

/**
 * Clamp a date within [min, max]. Returns a clone of the nearest bound if out of range.
 * 将日期限制在 [min, max] 范围内，超出范围时返回对应边界的副本。
 *
 * @example
 * const d = new Date('2026-06-01')
 * clamp(d, new Date('2026-01-01'), new Date('2026-05-31')) // 2026-05-31
 * @since 1.0.0
 */
export function clamp(date: Date, min: Date, max: Date): Date {
  const t = date.getTime();
  if (t < min.getTime()) return clone(min);
  if (t > max.getTime()) return clone(max);
  return clone(date);
}
