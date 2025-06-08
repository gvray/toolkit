import isType from './isType'
/**
 * Checks if a value is a function.
 * 检查值是否为函数。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a function / 如果值是函数则返回true
 *
 * @example
 * ```typescript
 * isFunction(() => {}) // true
 * isFunction(function() {}) // true
 * isFunction(async function() {}) // true
 * isFunction(function* generator() {}) // true
 * isFunction(class MyClass {}) // true
 * isFunction(Array.isArray) // true
 * isFunction(console.log) // true
 * isFunction(42) // false
 * isFunction('function') // false
 * isFunction({}) // false
 * isFunction([]) // false
 * ```
 *
 * @since 1.0.0
 */
const isFunction = (value: unknown): value is (...args: any[]) => any => {
  return typeof value === 'function'
}

export default isFunction
