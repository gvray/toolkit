type UniqByIteratee<T, K> = ((item: T) => K) | keyof T

const getUniqKey = <T, K>(item: T, iteratee: UniqByIteratee<T, K>): K => {
  if (typeof iteratee === 'function') {
    return iteratee(item)
  }

  return item[iteratee] as unknown as K
}

/**
 * Removes duplicate items from an array using a derived key.
 * 按派生键对数组去重。
 *
 * @template T - The type of array items / 数组元素类型
 * @template K - The derived key type / 派生键类型
 * @param array - The source array / 源数组
 * @param iteratee - The property name or function used to derive the uniqueness key / 用于生成唯一键的属性名或函数
 * @returns A new array containing the first item for each unique key / 每个唯一键保留首个元素的新数组
 * @example
 * uniqBy([{ id: 1 }, { id: 1 }, { id: 2 }], 'id')
 * // -> [{ id: 1 }, { id: 2 }]
 */
const uniqBy = <T, K>(array: readonly T[], iteratee: UniqByIteratee<T, K>): T[] => {
  const seen = new Set<K>()
  const result: T[] = []

  for (const item of array) {
    const key = getUniqKey(item, iteratee)

    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }

  return result
}

export default uniqBy
