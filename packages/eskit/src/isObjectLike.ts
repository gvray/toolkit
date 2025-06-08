/**
 * Checks if a value is object-like (not null and type is 'object').
 * 检查值是否类似对象（非null且类型为'object'）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is object-like / 如果值类似对象则返回true
 *
 * @example
 * ```typescript
 * // Object-like values
 * isObjectLike({}) // true (plain object)
 * isObjectLike([1, 2, 3]) // true (arrays are objects)
 * isObjectLike(new Date()) // true (Date objects)
 * isObjectLike(/regex/) // true (RegExp objects)
 * isObjectLike(new Error('test')) // true (Error objects)
 * isObjectLike(new Map()) // true (Map objects)
 * isObjectLike(new Set()) // true (Set objects)
 *
 * // Typed arrays are object-like
 * isObjectLike(new Uint8Array([1, 2, 3])) // true
 * isObjectLike(new ArrayBuffer(8)) // true
 *
 * // Not object-like values
 * isObjectLike(null) // false (null is not object-like)
 * isObjectLike(undefined) // false
 * isObjectLike(42) // false (number)
 * isObjectLike('hello') // false (string)
 * isObjectLike(true) // false (boolean)
 * isObjectLike(Symbol('test')) // false (symbol)
 * isObjectLike(function() {}) // false (functions are not object-like)
 *
 * // Practical usage - filtering object-like values
 * const mixedValues = [
 *   {},
 *   [],
 *   42,
 *   'hello',
 *   new Date(),
 *   null,
 *   function() {}
 * ]
 *
 * const objectLikeValues = mixedValues.filter(isObjectLike)
 * // Results: [{}, [], new Date()]
 * ```
 *
 * @since 1.0.0
 */

const isObjectLike = (value: unknown): boolean => {
  return value !== null && typeof value === 'object'
}

export default isObjectLike
