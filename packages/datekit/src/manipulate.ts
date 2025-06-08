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
