/**
 * Zips multiple arrays into tuples, stopping at the shortest array length.
 * 将多个数组按最短长度 zip 为元组数组。
 *
 * @param arrays - Arrays to zip / 待 zip 的数组列表
 * @returns Zipped tuples / zip 后的元组数组
 * @example
 * zip([1, 2], ['a', 'b'])
 * // -> [[1, 'a'], [2, 'b']]
 */
const zip = <T extends readonly unknown[][]>(...arrays: T): unknown[][] => {
  if (arrays.length === 0) {
    return []
  }

  const length = Math.min(...arrays.map((array) => array.length))
  const result: unknown[][] = []

  for (let index = 0; index < length; index++) {
    result.push(arrays.map((array) => array[index]))
  }

  return result
}

export default zip
