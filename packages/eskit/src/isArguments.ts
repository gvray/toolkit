import isType from './isType'
/**
 * Checks if a value is an arguments object.
 * 检查值是否为arguments对象。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an arguments object / 如果值是arguments对象则返回true
 *
 * @example
 * ```typescript
 * // Inside a function, arguments is an arguments object
 * function testFunction() {
 *   console.log(isArguments(arguments)) // true
 *   console.log(isArguments([1, 2, 3])) // false
 * }
 *
 * // Arrow functions don't have arguments object
 * const arrowFunc = () => {
 *   // console.log(isArguments(arguments)) // ReferenceError
 * }
 *
 * // Test with various values
 * isArguments([1, 2, 3]) // false (regular array)
 * isArguments('arguments') // false (string)
 * isArguments({ 0: 'a', 1: 'b', length: 2 }) // false (array-like object)
 * isArguments(null) // false
 * isArguments(undefined) // false
 *
 * // Real arguments object example
 * function sum() {
 *   if (isArguments(arguments)) {
 *     return Array.from(arguments).reduce((a, b) => a + b, 0)
 *   }
 *   return 0
 * }
 * sum(1, 2, 3, 4) // 10
 * ```
 *
 * @since 1.0.0
 */
const isArguments = (value: unknown): boolean => isType('Arguments', value)
export default isArguments
