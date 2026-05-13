/**
 * Memoizes a function using a `WeakMap` keyed by object identity.
 * 使用基于对象标识的 `WeakMap` 为函数做记忆化。
 *
 * @template TKey - The object key type / 对象键类型
 * @template TResult - The return type / 返回值类型
 * @param fn - The target function / 目标函数
 * @returns A memoized function / 记忆化后的函数
 * @example
 * const fn = memoizeWeak((obj: object) => Object.keys(obj).length)
 * fn({})
 * // -> 0
 */
const memoizeWeak = <TKey extends object, TResult>(fn: (key: TKey) => TResult): ((key: TKey) => TResult) => {
  const cache = new WeakMap<TKey, TResult>()

  return (key: TKey): TResult => {
    if (cache.has(key)) {
      return cache.get(key) as TResult
    }

    const result = fn(key)
    cache.set(key, result)
    return result
  }
}

export default memoizeWeak
