/**
 * Returns the union of multiple arrays while preserving first-seen order.
 * 返回多个数组的并集，并保留首次出现顺序。
 *
 * @template T - The array item type / 数组元素类型
 * @param arrays - The input arrays / 输入数组
 * @returns A deduplicated merged array / 去重后的合并数组
 * @example
 * union([1, 2], [2, 3])
 * // -> [1, 2, 3]
 */
const union = <T>(...arrays: ReadonlyArray<readonly T[]>): T[] => {
  return Array.from(new Set(arrays.flat()))
}

export default union
