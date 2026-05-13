import isType from './isType'
/**
 * Checks if a value is a finite number.
 * 检查值是否为有限数字。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a finite number / 如果值是有限数字则返回true
 *
 * @example
 * ```typescript
 * isNumber(42) // true
 * isNumber(3.14) // true
 * isNumber(NaN) // false
 * isNumber(Infinity) // false
 * isNumber(-Infinity) // false
 * isNumber('42') // false
 * isNumber(null) // false
 * isNumber(undefined) // false
 * isNumber([]) // false
 * isNumber({}) // false
 * ```
 *
 * @since 1.0.0
 */
const isNumber = (value: unknown): value is number => isType('Number', value) && Number.isFinite(value)
export default isNumber
