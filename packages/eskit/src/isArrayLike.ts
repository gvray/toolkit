/**
 * Checks if a value is array-like (has length property and is indexable).
 * 检查值是否类似数组（具有length属性且可索引）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is array-like / 如果值类似数组则返回true
 *
 * @example
 * ```typescript
 * // Array-like values
 * isArrayLike('abc') // true (strings are array-like)
 * isArrayLike([1, 2, 3]) // true (arrays are array-like)
 * isArrayLike({ 0: 'a', 1: 'b', 2: 'c', length: 3 }) // true (object with length)
 *
 * // In browser environment
 * isArrayLike(document.querySelectorAll('div')) // true (NodeList)
 * isArrayLike(document.getElementsByTagName('p')) // true (HTMLCollection)
 *
 * // Function arguments object
 * function testArgs() {
 *   console.log(isArrayLike(arguments)) // true
 * }
 *
 * // Typed arrays
 * isArrayLike(new Uint8Array([1, 2, 3])) // true
 * isArrayLike(new Int32Array(5)) // true
 *
 * // Non-array-like values
 * isArrayLike(function() {}) // false (functions)
 * isArrayLike({}) // false (no length property)
 * isArrayLike({ length: 'not a number' }) // false (length not finite)
 * isArrayLike(null) // false
 * isArrayLike(undefined) // false
 * isArrayLike(42) // false
 *
 * // Edge cases
 * isArrayLike({ length: -1 }) // false (negative length)
 * isArrayLike({ length: Infinity }) // false (infinite length)
 * ```
 *
 * @since 1.0.0
 */
const isArrayLike = (value: any): boolean => {
  return value !== null && typeof value !== 'function' && isFinite(value.length)
}

export default isArrayLike
