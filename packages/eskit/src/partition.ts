/**
 * Splits an array into matched and unmatched groups based on a predicate.
 * 根据断言函数将数组拆分为命中组和未命中组。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @param predicate - The predicate used to split items / 用于拆分元素的断言函数
 * @returns A tuple of matched and unmatched groups / 命中组与未命中组的元组
 * @example
 * partition([1, 2, 3, 4], (value) => value % 2 === 0)
 * // -> [[2, 4], [1, 3]]
 */
const partition = <T>(array: readonly T[], predicate: (item: T, index: number, array: readonly T[]) => boolean): [T[], T[]] => {
  const matched: T[] = []
  const unmatched: T[] = []

  array.forEach((item: T, index: number) => {
    if (predicate(item, index, array)) {
      matched.push(item)
    } else {
      unmatched.push(item)
    }
  })

  return [matched, unmatched]
}

export default partition
