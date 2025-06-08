import isType from './isType'
/**
 * Checks if a value is a string.
 * 检查值是否为字符串。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a string / 如果值是字符串则返回true
 *
 * @example
 * ```typescript
 * isString('hello') // true
 * isString('') // true
 * isString(`template`) // true
 * isString(123) // false
 * isString(null) // false
 * isString(undefined) // false
 * isString([]) // false
 * ```
 *
 * @since 1.0.0
 */
const isString = (value: unknown): value is string => {
  return isType('String', value)
}
export default isString
