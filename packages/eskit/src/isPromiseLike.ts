/**
 * Checks if a value is promise-like (thenable).
 * 检查值是否类似Promise（可thenable）。
 *
 * @param obj - The value to check / 要检查的值
 * @returns True if the value is promise-like / 如果值类似Promise则返回true
 *
 * @example
 * ```typescript
 * isPromiseLike(new Promise(resolve => resolve('done'))) // true
 * isPromiseLike(Promise.resolve('value')) // true
 * isPromiseLike(Promise.reject('error')) // true
 *
 * // Thenable objects
 * isPromiseLike({ then: (resolve) => resolve('value') }) // true
 * isPromiseLike({ then: function() {} }) // true
 *
 * // Non-promise-like values
 * isPromiseLike({}) // false
 * isPromiseLike(null) // false
 * isPromiseLike('promise') // false
 * isPromiseLike(123) // false
 * isPromiseLike([]) // false
 * isPromiseLike(function() {}) // false
 * ```
 *
 * @since 1.0.0
 */
const isPromiseLike = (obj: any): boolean =>
  obj !== null && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'

// Promises/A+ https://promisesaplus.com/
export default isPromiseLike
