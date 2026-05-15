/**
 * Check if a date is valid.
 * 检查日期是否有效。
 */
export function isValid(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Throws if the value is not a valid Date instance.
 * 若不是有效 Date 则抛出异常。
 *
 * @param date - Value to check / 待检查的值
 * @param paramName - Name for error message / 错误信息中的参数名
 */
export function assertValidDate(date: Date, paramName = 'date'): void {
  if (!isValid(date)) {
    throw new RangeError(`${paramName} is not a valid Date`)
  }
}
