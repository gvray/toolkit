/**
 * Removes duplicate values from an array while preserving order.
 * 在保留顺序的前提下移除数组中的重复值。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @returns A new array with unique values / 去重后的新数组
 * @example
 * uniq([1, 2, 2, 3, 3])
 * // -> [1, 2, 3]
 */
const uniq = <T>(array: readonly T[]): T[] => {
  return Array.from(new Set(array))
}

export default uniq
