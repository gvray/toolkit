import isNumber from './isNumber'
/**
 * Checks if a value is a decimal number (has fractional part).
 * 检查值是否为小数（带有小数部分）。
 *
 * @param num - The value to check / 要检查的值
 * @returns True if the value is a decimal number / 如果值是小数则返回true
 *
 * @example
 * ```typescript
 * isDecimal(1.5) // true
 * isDecimal(3.14) // true
 * isDecimal(-2.5) // true
 * isDecimal(0.1) // true
 * isDecimal(3) // false
 * isDecimal(0) // false
 * isDecimal(-10) // false
 * isDecimal(NaN) // false
 * isDecimal(Infinity) // false
 * isDecimal('1.23') // false
 * isDecimal(null) // false
 * isDecimal(undefined) // false
 * ```
 *
 * @since 1.0.0
 */
const isDecimal = (num: unknown): boolean => isNumber(num) && Number.isFinite(num) && (num as number) % 1 !== 0
export default isDecimal
