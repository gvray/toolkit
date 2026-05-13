/**
 * Composes multiple functions into a single function that executes from left to right.
 * 将多个函数组合成一个从左到右执行的单一函数。
 *
 * @template T - The input and output type / 输入输出类型
 * @param funcs - The functions to compose / 要组合的函数
 * @returns A composed function / 组合后的函数
 * @example
 * pipe((value) => value + 1, (value) => value * 2)(3)
 * // -> 8
 */
const pipe = <T>(...funcs: Array<(arg: T) => T>): ((arg: T) => T) => {
  return (arg: T): T => funcs.reduce((accumulator: T, func: (arg: T) => T) => func(accumulator), arg)
}

export default pipe
