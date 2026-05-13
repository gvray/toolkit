/**
 * Splits an array into groups with a fixed maximum size.
 * 按固定最大长度将数组切分为多个分组。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @param size - The size of each chunk / 每组大小
 * @returns The chunked result / 分组后的结果
 * @example
 * chunk([1, 2, 3, 4, 5], 2)
 * // -> [[1, 2], [3, 4], [5]]
 */
const chunk = <T>(array: readonly T[], size: number): T[][] => {
  if (!Number.isInteger(size) || size <= 0) {
    throw new TypeError('size must be a positive integer')
  }

  const result: T[][] = []

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size))
  }

  return result
}

export default chunk
