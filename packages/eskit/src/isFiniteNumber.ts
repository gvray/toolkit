import isNumber from './isNumber'

/**
 * Checks whether a value is a finite number.
 * 检查值是否为有限数字。
 *
 * @param value - The value to check / 要检查的值
 * @returns `true` when the value is a finite number / 值是有限数字时返回 `true`
 * @example
 * isFiniteNumber(NaN)
 * // -> false
 */
const isFiniteNumber = (value: unknown): value is number => {
  return isNumber(value)
}

export default isFiniteNumber
