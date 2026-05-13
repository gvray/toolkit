type GroupByIteratee<T, K extends PropertyKey> = ((item: T) => K) | keyof T

const getGroupKey = <T, K extends PropertyKey>(item: T, iteratee: GroupByIteratee<T, K>): K => {
  if (typeof iteratee === 'function') {
    return iteratee(item)
  }

  return item[iteratee] as unknown as K
}

/**
 * Groups array items by a derived key.
 * 按派生键对数组元素分组。
 *
 * @template T - The type of array items / 数组元素类型
 * @template K - The group key type / 分组键类型
 * @param array - The source array / 源数组
 * @param iteratee - The property name or function used to derive the group key / 用于生成分组键的属性名或函数
 * @returns An object of grouped items / 分组结果对象
 * @example
 * groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
 * // -> { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
 */
const groupBy = <T, K extends PropertyKey>(array: readonly T[], iteratee: GroupByIteratee<T, K>): Record<string, T[]> => {
  const result: Record<string, T[]> = {}

  for (const item of array) {
    const key = String(getGroupKey(item, iteratee))

    if (!result[key]) {
      result[key] = []
    }

    result[key].push(item)
  }

  return result
}

export default groupBy
