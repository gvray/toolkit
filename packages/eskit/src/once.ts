/**
 * Creates a function that can only run once.
 * 创建一个只能执行一次的函数。
 *
 * @template TArgs - The argument tuple / 参数元组类型
 * @template TResult - The return type / 返回值类型
 * @param fn - The target function / 目标函数
 * @returns A function that reuses the first result / 重复返回首次结果的函数
 * @example
 * const init = once(() => 1)
 * init()
 * // -> 1
 */
const once = <TArgs extends unknown[], TResult>(fn: (...args: TArgs) => TResult): ((...args: TArgs) => TResult) => {
  let called = false
  let result: TResult

  return (...args: TArgs): TResult => {
    if (!called) {
      called = true
      result = fn(...args)
    }

    return result
  }
}

export default once
