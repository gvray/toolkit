/**
 * Returns the first N items from an array.
 * 返回数组前 N 个元素。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @param count - The number of items to take / 要获取的数量
 * @returns A new array containing the selected items / 选中元素组成的新数组
 * @example
 * take([1, 2, 3, 4], 2)
 * // -> [1, 2]
 */
const take = <T>(array: readonly T[], count: number): T[] => {
  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError('count must be a non-negative integer')
  }

  return array.slice(0, count)
}

export default take
