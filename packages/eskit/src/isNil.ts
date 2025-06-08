/**
 * Checks if a value is null or undefined.
 * 检查值是否为null或undefined。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is null or undefined / 如果值是null或undefined则返回true
 *
 * @example
 * ```typescript
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(void 0) // true (void 0 is undefined)
 * isNil('') // false
 * isNil(0) // false
 * isNil(false) // false
 * isNil([]) // false
 * isNil({}) // false
 * isNil(NaN) // false
 *
 * // Useful for optional chaining checks
 * const obj = { a: null, b: undefined, c: 'value' }
 * Object.keys(obj).filter(key => !isNil(obj[key])) // ['c']
 * ```
 *
 * @since 1.0.0
 */
const isNil = (value: unknown): value is null | undefined => value === null || value === undefined
export default isNil
