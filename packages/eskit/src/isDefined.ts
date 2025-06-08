/**
 * Checks if a value is defined (not undefined or null).
 * 检查值是否已定义（非undefined或null）。
 *
 * @typeParam T - The type of the value to check / 要检查的值的类型
 * @param val - The value to check / 要检查的值
 * @returns True if the value is defined / 如果值已定义则返回true
 *
 * @example
 * ```typescript
 * isDefined(1) // true
 * isDefined('hello') // true
 * isDefined(false) // true
 * isDefined(0) // true
 * isDefined('') // true
 * isDefined([]) // true
 * isDefined({}) // true
 * isDefined(null) // false
 * isDefined(undefined) // false
 * isDefined(void 0) // false
 *
 * // Useful for filtering arrays
 * const arr = [1, null, 'test', undefined, 0]
 * const filtered = arr.filter(isDefined) // [1, 'test', 0]
 * ```
 *
 * @since 1.0.0
 */
const isDefined = <T>(val: T | undefined | null): val is T => {
  return val !== undefined && val !== null
}
export default isDefined
