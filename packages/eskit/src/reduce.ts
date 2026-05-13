/**
 * Reduces an array or object into a single accumulated value.
 * 将数组或对象归约为单个累计值。
 *
 * @template T - The source collection type / 源集合类型
 * @template R - The accumulator type / 累加器类型
 * @param collection - The source collection / 源集合
 * @param iteratee - The reducer function / 归约函数
 * @param initialValue - The initial accumulator / 初始累加值
 * @returns The reduced result / 归约结果
 * @example
 * reduce({ a: 1, b: 2 }, (acc, value) => acc + value, 0)
 * // -> 3
 */
const reduce = <T extends readonly unknown[] | Record<string, unknown>, R>(
  collection: T,
  iteratee: (
    accumulator: R,
    value: T extends readonly (infer U)[] ? U : T[keyof T],
    key: T extends readonly unknown[] ? number : keyof T,
    collection: T
  ) => R,
  initialValue: R
): R => {
  if (Array.isArray(collection)) {
    return collection.reduce((accumulator: R, value: unknown, index: number) => {
      return iteratee(accumulator, value as never, index as never, collection)
    }, initialValue)
  }

  return Object.keys(collection).reduce((accumulator: R, key: string) => {
    return iteratee(accumulator, collection[key as keyof T] as never, key as never, collection)
  }, initialValue)
}

export default reduce
