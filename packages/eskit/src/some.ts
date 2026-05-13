/**
 * Checks whether some items in an array or object match a predicate.
 * 检查数组或对象中是否存在满足断言的元素。
 *
 * @template T - The source collection type / 源集合类型
 * @param collection - The source collection / 源集合
 * @param predicate - The match predicate / 匹配断言
 * @returns `true` when some items match / 存在匹配项时返回 `true`
 * @example
 * some({ a: 1, b: 2 }, (value) => value > 1)
 * // -> true
 */
const some = <T extends readonly unknown[] | Record<string, unknown>>(
  collection: T,
  predicate: (
    value: T extends readonly (infer U)[] ? U : T[keyof T],
    key: T extends readonly unknown[] ? number : keyof T,
    collection: T
  ) => boolean
): boolean => {
  if (Array.isArray(collection)) {
    return collection.some((value: unknown, index: number) => predicate(value as never, index as never, collection))
  }

  return Object.keys(collection).some((key: string) => predicate(collection[key as keyof T] as never, key as never, collection))
}

export default some
