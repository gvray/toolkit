import isType from './isType'
/**
 * Checks if a value is a Date object.
 * 检查值是否为Date对象。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a Date object / 如果值是Date对象则返回true
 *
 * @example
 * ```typescript
 * isDate(new Date()) // true
 * isDate(new Date('2023-01-01')) // true
 * isDate(new Date(Date.now())) // true
 * isDate(Date.now()) // false (number timestamp)
 * isDate('2022-03-30') // false
 * isDate(1640995200000) // false
 * isDate({}) // false
 * isDate(null) // false
 * isDate(undefined) // false
 *
 * // Note: Invalid dates are still Date objects
 * isDate(new Date('invalid')) // true
 * ```
 *
 * @since 1.0.0
 */
const isDate = (value: unknown): value is Date => isType('Date', value)
export default isDate
