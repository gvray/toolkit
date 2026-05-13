/**
 * Checks whether every item in an array or object matches a predicate.
 * 检查数组或对象中的所有元素是否都满足断言。
 *
 * @template T - The source collection type / 源集合类型
 * @param collection - The source collection / 源集合
 * @param predicate - The match predicate / 匹配断言
 * @returns `true` when all items match / 全部匹配时返回 `true`
 * @example
 * every({ a: 1, b: 2 }, (value) => value > 0)
 * // -> true
 */
const every = <T extends readonly unknown[] | Record<string, unknown>>(
  collection: T,
  predicate: (
    value: T extends readonly (infer U)[] ? U : T[keyof T],
    key: T extends readonly unknown[] ? number : keyof T,
    collection: T
  ) => boolean
): boolean => {
  if (Array.isArray(collection)) {
    return collection.every((value: unknown, index: number) => predicate(value as never, index as never, collection))
  }

  return Object.keys(collection).every((key: string) => predicate(collection[key as keyof T] as never, key as never, collection))
}

export default every
