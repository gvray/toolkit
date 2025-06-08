import isNumber from './isNumber'
/**
 * Checks if a value is an integer.
 * 检查值是否为整数。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an integer / 如果值是整数则返回true
 *
 * @example
 * ```typescript
 * isInteger(0) // true
 * isInteger(5) // true
 * isInteger(-10) // true
 * isInteger(42) // true
 * isInteger(Number.MAX_SAFE_INTEGER) // true
 * isInteger(2.5) // false
 * isInteger(3.14) // false
 * isInteger(NaN) // false
 * isInteger(Infinity) // false
 * isInteger(-Infinity) // false
 * isInteger('42') // false
 * isInteger(null) // false
 * isInteger(undefined) // false
 * ```
 *
 * @since 1.0.0
 */
const isInteger = Number.isInteger
  ? Number.isInteger
  : (num: any): boolean => {
      return isNumber(num) && num % 1 === 0
    }

export default isInteger
