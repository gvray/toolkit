/**
 * Checks if a value is an object (including arrays, but excluding null).
 * 检查值是否为对象（包括数组，但排除null）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an object / 如果值是对象则返回true
 *
 * @example
 * ```typescript
 * isObject({}) // true
 * isObject({ name: 'John' }) // true
 * isObject([1, 2, 3]) // true
 * isObject(new Date()) // true
 * isObject(/regex/) // true
 * isObject(() => {}) // true
 * isObject(null) // false
 * isObject(undefined) // false
 * isObject('string') // false
 * isObject(123) // false
 * ```
 *
 * @since 1.0.0
 */
const isObject = (value: unknown): value is Record<string, unknown> => {
  return (typeof value === 'object' && value !== null) || typeof value === 'function'
}

export default isObject
