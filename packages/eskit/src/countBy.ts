/**
 * Counts items grouped by an iteratee key.
 * 按 iteratee 分组并统计每组数量。
 *
 * @template T - Item type / 元素类型
 * @param collection - Source array / 源数组
 * @param iteratee - Property name or key getter / 属性名或 key 获取函数
 * @returns Key to count map / 分组计数对象
 * @example
 * countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
 * // -> { a: 2, b: 1 }
 */
const countBy = <T>(
  collection: readonly T[],
  iteratee: keyof T | ((item: T) => PropertyKey)
): Record<string, number> => {
  const getKey = typeof iteratee === 'function' ? iteratee : (item: T) => item[iteratee] as PropertyKey
  const result: Record<string, number> = {}

  for (const item of collection) {
    const key = String(getKey(item))
    result[key] = (result[key] ?? 0) + 1
  }

  return result
}

export default countBy
