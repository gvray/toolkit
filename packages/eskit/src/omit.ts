/**
 * Creates a new object without the specified keys.
 * 创建一个移除指定键的新对象。
 *
 * @template T - The source object type / 源对象类型
 * @template K - The omitted key type / 要移除的键类型
 * @param object - The source object / 源对象
 * @param keys - The keys to omit / 要移除的键
 * @returns A new object without the omitted keys / 移除指定键后的新对象
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b'])
 * // -> { a: 1, c: 3 }
 */
const omit = <T extends Record<PropertyKey, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[]
): Omit<T, K> => {
  const keySet = new Set<PropertyKey>(keys)
  const result = {} as Omit<T, K>

  Object.keys(object).forEach((key: string) => {
    if (!keySet.has(key)) {
      result[key as keyof Omit<T, K>] = object[key as keyof T] as Omit<T, K>[keyof Omit<T, K>]
    }
  })

  return result
}

export default omit
