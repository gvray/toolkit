import isArrayLike from './isArrayLike'
import isObject from './isObject'

/**
 * Checks if a value is an array-like object (not string or function).
 * 检查值是否为类数组对象（非字符串或函数）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an array-like object / 如果值是类数组对象则返回true
 *
 * @example
 * ```typescript
 * // Array-like objects
 * isArrayLikeObject([1, 2, 3]) // true (arrays)
 * isArrayLikeObject({ 0: 'a', 1: 'b', length: 2 }) // true (object with length)
 * isArrayLikeObject(new Uint8Array([1, 2, 3])) // true (typed arrays)
 *
 * // In browser environment
 * isArrayLikeObject(document.querySelectorAll('div')) // true (NodeList)
 * isArrayLikeObject(document.getElementsByTagName('p')) // true (HTMLCollection)
 *
 * // Function arguments object
 * function testArgs() {
 *   console.log(isArrayLikeObject(arguments)) // true
 * }
 *
 * // Not array-like objects
 * isArrayLikeObject('abc') // false (string, not object)
 * isArrayLikeObject(function() {}) // false (function)
 * isArrayLikeObject({}) // false (no length property)
 * isArrayLikeObject(null) // false (not object)
 * isArrayLikeObject(undefined) // false (not object)
 * isArrayLikeObject(42) // false (not object)
 *
 * // Useful for filtering out strings and functions
 * const mixedValues = [
 *   [1, 2, 3],
 *   'hello',
 *   { 0: 'a', length: 1 },
 *   function() {},
 *   new Uint8Array([1, 2])
 * ]
 *
 * const arrayLikeObjects = mixedValues.filter(isArrayLikeObject)
 * // Results: [[1, 2, 3], { 0: 'a', length: 1 }, Uint8Array]
 * ```
 *
 * @since 1.0.0
 */

const isArrayLikeObject = (value: unknown): boolean => {
  return isObject(value) && isArrayLike(value)
}

export default isArrayLikeObject
