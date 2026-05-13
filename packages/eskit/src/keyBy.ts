type KeyByIteratee<T, K extends PropertyKey> = ((item: T) => K) | keyof T

const getKeyByValue = <T, K extends PropertyKey>(item: T, iteratee: KeyByIteratee<T, K>): K => {
  if (typeof iteratee === 'function') {
    return iteratee(item)
  }

  return item[iteratee] as unknown as K
}

/**
 * Creates an object that maps derived keys to items.
 * 按派生键创建元素映射对象。
 *
 * @template T - The type of array items / 数组元素类型
 * @template K - The key type / 键类型
 * @param array - The source array / 源数组
 * @param iteratee - The property name or function used to derive the key / 用于生成键的属性名或函数
 * @returns An object whose keys map to items / 键到元素的映射对象
 * @example
 * keyBy([{ id: 1, name: 'A' }], 'id')
 * // -> { '1': { id: 1, name: 'A' } }
 */
const keyBy = <T, K extends PropertyKey>(array: readonly T[], iteratee: KeyByIteratee<T, K>): Record<string, T> => {
  const result: Record<string, T> = {}

  for (const item of array) {
    result[String(getKeyByValue(item, iteratee))] = item
  }

  return result
}

export default keyBy
