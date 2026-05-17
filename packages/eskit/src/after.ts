/**
 * Creates a function that invokes `fn` only after being called `n` times.
 * 创建仅在第 `n` 次及之后才会执行 `fn` 的包装函数。
 *
 * @template TArgs - Argument tuple / 参数元组
 * @template TResult - Return type / 返回类型
 * @param n - Invocation threshold / 触发阈值
 * @param fn - Target function / 目标函数
 * @returns Wrapped function / 包装函数
 * @example
 * const run = after(3, () => 'ok')
 * run(); run(); run() // -> 'ok'
 */
const after = <TArgs extends unknown[], TResult>(
  n: number,
  fn: (...args: TArgs) => TResult
): ((...args: TArgs) => TResult | undefined) => {
  if (!Number.isInteger(n) || n <= 0) {
    throw new RangeError('n must be a positive integer')
  }

  let count = 0

  return (...args: TArgs): TResult | undefined => {
    count += 1
    if (count >= n) {
      return fn(...args)
    }
    return undefined
  }
}

export default after
