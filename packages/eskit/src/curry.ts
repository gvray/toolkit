/**
 * Creates a curried version of a function that can be called with partial arguments.
 * 创建函数的柯里化版本，可以使用部分参数调用。
 *
 * Currying transforms a function that takes multiple arguments into a sequence
 * of functions that each take a single argument. This enables partial application
 * and function composition patterns.
 * 柯里化将接受多个参数的函数转换为一系列每个都接受单个参数的函数。
 * 这使得部分应用和函数组合模式成为可能。
 *
 * @param fn - The function to be curried / 要柯里化的函数
 * @returns A curried function / 柯里化的函数
 *
 * @example
 * ```typescript
 * const add = (a, b, c) => a + b + c
 * const curriedAdd = curry(add)
 *
 * curriedAdd(5)(3)(2) // => 10
 * curriedAdd(1)(2)(3) // => 6
 * curriedAdd(1, 2, 3) // => 6
 *
 * const multiply = (a, b, c) => a * b * c
 * const double = curry(multiply)(2)
 * double(3)(4) // => 24
 *
 * const formatMessage = curry((prefix, type, message) => `[${prefix}] ${type}: ${message}`)
 * const logError = formatMessage('APP')('ERROR')
 * logError('Something went wrong') // => "[APP] ERROR: Something went wrong"
 * ```
 *
 * @since 1.0.0
 */
function curry(fn: (...args: any[]) => any) {
  return function curried(...args: any[]): (...args: any[]) => any {
    return args.length >= fn.length
      ? fn(...args)
      : (...moreArgs: any[]) => curried(...args, ...moreArgs);
  };
}
export default curry;
