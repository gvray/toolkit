import isType from './isType'
/**
 * Checks if a value is a boolean.
 * 检查值是否为布尔值。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a boolean / 如果值是布尔值则返回true
 *
 * @example
 * ```typescript
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(Boolean(1)) // true
 * isBoolean(new Boolean(false)) // true
 * isBoolean(0) // false
 * isBoolean(1) // false
 * isBoolean('true') // false
 * isBoolean('false') // false
 * isBoolean(null) // false
 * isBoolean(undefined) // false
 * ```
 *
 * @since 1.0.0
 */
const isBoolean = (value: unknown): value is boolean => value === true || value === false || isType('Boolean', value)
export default isBoolean
