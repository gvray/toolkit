import isType from './isType'
/**
 * Checks if a value is an Error instance.
 * 检查值是否为Error实例。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an Error instance / 如果值是Error实例则返回true
 *
 * @example
 * ```typescript
 * isError(new Error('Example error')) // true
 * isError(new TypeError('Type error')) // true
 * isError(new ReferenceError()) // true
 * isError(new SyntaxError()) // true
 * isError(new RangeError()) // true
 *
 * const customError = class extends Error {}
 * isError(new customError()) // true
 *
 * isError('Error') // false
 * isError({ message: 'error' }) // false
 * isError(null) // false
 * isError(undefined) // false
 * ```
 *
 * @since 1.0.0
 */
const isError = (value: unknown): value is Error => {
  return isType('Error', value)
}

export default isError
