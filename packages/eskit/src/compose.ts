/**
 * Composes multiple functions into a single function that executes from right to left.
 * 将多个函数组合成一个从右到左执行的单一函数。
 *
 * Function composition allows you to chain operations together, where the output
 * of one function becomes the input of the next function.
 * 函数组合允许您将操作链接在一起，其中一个函数的输出成为下一个函数的输入。
 *
 * @template T - The type of the input and output value / 输入和输出值的类型
 * @param funcs - An array of functions to compose / 要组合的函数数组
 * @returns A new function that executes the input functions from right to left / 从右到左执行输入函数的新函数
 *
 * @example
 * ```typescript
 * const add1 = (x: number) => x + 1
 * const multiply2 = (x: number) => x * 2
 * const square = (x: number) => x * x
 *
 * // Compose functions: square(multiply2(add1(x)))
 * const composed = compose(square, multiply2, add1)
 *
 * console.log(composed(3)) // ((3 + 1) * 2)² = (4 * 2)² = 8² = 64
 *
 * // String transformations
 * const addExclamation = (s: string) => s + '!'
 * const toUpperCase = (s: string) => s.toUpperCase()
 * const addPrefix = (s: string) => 'RESULT: ' + s
 *
 * const transform = compose(addPrefix, toUpperCase, addExclamation)
 * console.log(transform('hello')) // "RESULT: HELLO!"
 * ```
 *
 * @since 1.0.0
 */
const compose = <T>(...funcs: Array<(arg: T) => T>): ((arg: T) => T) => {
  return (arg: T): T => funcs.reduceRight((acc, func) => func(acc), arg)
}

export default compose
