/**
 * Unzips an array of tuples into separate arrays.
 * 将元组数组 unzip 为多个独立数组。
 *
 * @param zipped - Array of tuples / 元组数组
 * @returns Unzipped arrays / unzip 后的数组列表
 * @example
 * unzip([[1, 'a'], [2, 'b']])
 * // -> [[1, 2], ['a', 'b']]
 */
const unzip = (zipped: readonly (readonly unknown[])[]): unknown[][] => {
  if (zipped.length === 0) {
    return []
  }

  const width = zipped[0].length
  const result: unknown[][] = Array.from({ length: width }, () => [])

  for (const row of zipped) {
    for (let column = 0; column < width; column++) {
      result[column].push(row[column])
    }
  }

  return result
}

export default unzip
