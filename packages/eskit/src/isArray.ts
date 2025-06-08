import isType from './isType'
/**
 * Checks if a value is an array.
 * 检查值是否为数组。
 *
 * This function uses the native Array.isArray when available, falling back
 * to a type check for older environments.
 * 此函数在可用时使用原生Array.isArray，在较旧环境中回退到类型检查。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an array / 如果值是数组则返回true
 *
 * @example
 * ```typescript
 * isArray([1, 2, 3]) // true
 * isArray([]) // true
 * isArray(new Array(5)) // true
 * isArray('abc') // false
 * isArray({ 0: 'a', 1: 'b', length: 2 }) // false (array-like but not array)
 * isArray(null) // false
 * isArray(undefined) // false
 * isArray(arguments) // false (arguments object is not an array)
 * ```
 *
 * @since 1.0.0
 */
const isArray = (value: any): value is Array<any> => (Array.isArray ? Array.isArray(value) : isType('Array', value))

export default isArray
