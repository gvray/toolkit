/**
 * Maps over an array or object and returns a transformed collection of the same shape.
 * 对数组或对象执行映射，并返回相同结构的转换结果。
 *
 * @template T - The source collection type / 源集合类型
 * @template R - The mapped value type / 映射值类型
 * @param collection - The source collection / 源集合
 * @param iteratee - The mapping function / 映射函数
 * @returns The mapped collection / 映射后的集合
 * @example
 * map({ a: 1, b: 2 }, (value) => value * 2)
 * // -> { a: 2, b: 4 }
 */
const map = <T extends readonly unknown[] | Record<string, unknown>, R>(
  collection: T,
  iteratee: (
    value: T extends readonly (infer U)[] ? U : T[keyof T],
    key: T extends readonly unknown[] ? number : keyof T,
    collection: T
  ) => R
): T extends readonly unknown[] ? R[] : Record<string, R> => {
  if (Array.isArray(collection)) {
    return collection.map((value: unknown, index: number) => iteratee(value as never, index as never, collection)) as T extends readonly unknown[]
      ? R[]
      : Record<string, R>
  }

  const result: Record<string, R> = {}

  Object.keys(collection).forEach((key: string) => {
    result[key] = iteratee(collection[key as keyof T] as never, key as never, collection)
  })

  return result as T extends readonly unknown[] ? R[] : Record<string, R>
}

export default map
