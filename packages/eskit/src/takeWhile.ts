/**
 * Takes elements from the start while the predicate returns true.
 * 从数组头部连续取出满足谓词的元素。
 *
 * @template T - Item type / 元素类型
 * @param array - Source array / 源数组
 * @param predicate - Test function / 判断函数
 * @returns Prefix slice / 满足条件的前缀
 * @example
 * takeWhile([1, 2, 3, 4], (n) => n < 3)
 * // -> [1, 2]
 */
const takeWhile = <T>(array: readonly T[], predicate: (item: T, index: number) => boolean): T[] => {
  const result: T[] = []

  for (let index = 0; index < array.length; index++) {
    const item = array[index]
    if (!predicate(item, index)) {
      break
    }
    result.push(item)
  }

  return result
}

export default takeWhile
