/**
 * Returns the intersection of multiple arrays.
 * 返回多个数组的交集。
 *
 * @template T - The array item type / 数组元素类型
 * @param arrays - The input arrays / 输入数组
 * @returns A new array containing shared items / 包含共有元素的新数组
 * @example
 * intersection([1, 2, 3], [2, 3, 4])
 * // -> [2, 3]
 */
const intersection = <T>(...arrays: ReadonlyArray<readonly T[]>): T[] => {
  if (arrays.length === 0) {
    return []
  }

  const [firstArray, ...restArrays] = arrays

  return Array.from(new Set(firstArray)).filter((item: T) => restArrays.every((array: readonly T[]) => array.includes(item)))
}

export default intersection
