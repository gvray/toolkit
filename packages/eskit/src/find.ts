/**
 * Finds the first matching value in an array or object.
 * 在数组或对象中查找第一个匹配的值。
 *
 * @template T - The source collection type / 源集合类型
 * @param collection - The source collection / 源集合
 * @param predicate - The match predicate / 匹配断言
 * @returns The first matching value, or `undefined` / 第一个匹配的值，或 `undefined`
 * @example
 * find({ a: 1, b: 2 }, (value) => value > 1)
 * // -> 2
 */
const find = <T extends readonly unknown[] | Record<string, unknown>>(
  collection: T,
  predicate: (
    value: T extends readonly (infer U)[] ? U : T[keyof T],
    key: T extends readonly unknown[] ? number : keyof T,
    collection: T
  ) => boolean
): (T extends readonly (infer U)[] ? U : T[keyof T]) | undefined => {
  if (Array.isArray(collection)) {
    return collection.find((value: unknown, index: number) => predicate(value as never, index as never, collection)) as
      | (T extends readonly (infer U)[] ? U : T[keyof T])
      | undefined
  }

  const key = Object.keys(collection).find((itemKey: string) => predicate(collection[itemKey as keyof T] as never, itemKey as never, collection))

  return key === undefined ? undefined : (collection[key as keyof T] as T extends readonly (infer U)[] ? U : T[keyof T])
}

export default find
