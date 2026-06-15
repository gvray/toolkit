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
 * const add1 = (x) => x + 1
 * const multiply2 = (x) => x * 2
 * const square = (x) => x * x
 *
 * // square(multiply2(add1(3))) = square(multiply2(4)) = square(8) = 64
 * const composed = compose(square, multiply2, add1)
 * composed(3) // => 64
 *
 * const addExclamation = (s) => s + '!'
 * const toUpperCase = (s) => s.toUpperCase()
 * const addPrefix = (s) => 'RESULT: ' + s
 * const transform = compose(addPrefix, toUpperCase, addExclamation)
 * transform('hello') // => "RESULT: HELLO!"
 * ```
 *
 * @since 1.0.0
 */
const compose = <T>(...funcs: Array<(arg: T) => T>): ((arg: T) => T) => {
  return (arg: T): T => funcs.reduceRight((acc, func) => func(acc), arg);
};

export default compose;
