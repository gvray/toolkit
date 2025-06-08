import isType from './isType'
/**
 * Checks if a value is a number (including NaN and Infinity).
 * 检查值是否为数字（包括NaN和Infinity）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a number / 如果值是数字则返回true
 *
 * @example
 * ```typescript
 * isNumber(42) // true
 * isNumber(3.14) // true
 * isNumber(NaN) // true (NaN is type 'number')
 * isNumber(Infinity) // true
 * isNumber(-Infinity) // true
 * isNumber('42') // false
 * isNumber(null) // false
 * isNumber(undefined) // false
 * isNumber([]) // false
 * isNumber({}) // false
 * ```
 *
 * @since 1.0.0
 */
const isNumber = (value: unknown): value is number => isType('Number', value)
export default isNumber
