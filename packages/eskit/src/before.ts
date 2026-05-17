/**
 * Creates a function that invokes `fn` at most `n - 1` times.
 * 创建最多执行 `n - 1` 次的包装函数。
 *
 * @template TArgs - Argument tuple / 参数元组
 * @template TResult - Return type / 返回类型
 * @param n - Maximum invocations before no-op / 最大调用次数（第 n 次起不再执行）
 * @param fn - Target function / 目标函数
 * @returns Wrapped function / 包装函数
 * @example
 * const log = before(3, (x: number) => x)
 * log(1); log(2); log(3) // third call returns undefined
 */
const before = <TArgs extends unknown[], TResult>(
  n: number,
  fn: (...args: TArgs) => TResult
): ((...args: TArgs) => TResult | undefined) => {
  if (!Number.isInteger(n) || n <= 0) {
    throw new RangeError('n must be a positive integer')
  }

  let count = 0

  return (...args: TArgs): TResult | undefined => {
    if (count < n - 1) {
      count += 1
      return fn(...args)
    }
    return undefined
  }
}

export default before
