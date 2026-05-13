/**
 * Partially applies leading arguments to a function.
 * 为函数预绑定前置参数。
 *
 * @template TArgs - The full argument tuple / 完整参数元组
 * @template TBound - The bound leading arguments / 预绑定前置参数
 * @template TResult - The return type / 返回值类型
 * @param fn - The target function / 目标函数
 * @param boundArgs - The leading arguments to bind / 要预绑定的前置参数
 * @returns A partially applied function / 部分应用后的函数
 * @example
 * partial(Math.max, 0)(5)
 * // -> 5
 */
const partial = <TBound extends unknown[], TArgs extends unknown[], TResult>(
  fn: (...args: [...TBound, ...TArgs]) => TResult,
  ...boundArgs: TBound
): ((...args: TArgs) => TResult) => {
  return (...args: TArgs): TResult => fn(...boundArgs, ...args)
}

export default partial
