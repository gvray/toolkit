/**
 * Drops the first N items from an array.
 * 丢弃数组前 N 个元素。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @param count - The number of items to drop / 要丢弃的数量
 * @returns A new array without the dropped items / 丢弃后的新数组
 * @example
 * drop([1, 2, 3, 4], 2)
 * // -> [3, 4]
 */
const drop = <T>(array: readonly T[], count: number): T[] => {
  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError('count must be a non-negative integer')
  }

  return array.slice(count)
}

export default drop
