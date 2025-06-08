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
 * // Basic currying / 基本柯里化
 * const add = (a: number, b: number, c: number) => a + b + c
 * const curriedAdd = curry(add)
 *
 * // Partial application / 部分应用
 * const add5 = curriedAdd(5)
 * const add5And3 = add5(3)
 * console.log(add5And3(2)) // 10
 *
 * // Or call with all arguments at once / 或一次性传入所有参数
 * console.log(curriedAdd(1)(2)(3)) // 6
 * console.log(curriedAdd(1, 2, 3)) // 6
 *
 * // Practical example: creating specialized functions / 实际示例：创建专用函数
 * const multiply = (a: number, b: number, c: number) => a * b * c
 * const curriedMultiply = curry(multiply)
 *
 * const double = curriedMultiply(2)
 * const doubleAndTriple = double(3)
 * console.log(doubleAndTriple(4)) // 24
 *
 * // Function composition / 函数组合
 * const formatMessage = curry((prefix: string, type: string, message: string) =>
 *   `[${prefix}] ${type}: ${message}`
 * )
 *
 * const logError = formatMessage('APP')('ERROR')
 * const logWarning = formatMessage('APP')('WARNING')
 *
 * console.log(logError('Something went wrong')) // "[APP] ERROR: Something went wrong"
 * console.log(logWarning('This is a warning')) // "[APP] WARNING: This is a warning"
 * ```
 *
 * @since 1.0.0
 */
function curry(fn: (...args: any[]) => any) {
  return function curried(...args: any[]): (...args: any[]) => any {
    return args.length >= fn.length ? fn(...args) : (...moreArgs: any[]) => curried(...args, ...moreArgs)
  }
}
export default curry
