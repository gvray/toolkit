/**
 * Drops elements from the start while the predicate returns true.
 * 从数组头部连续丢弃满足谓词的元素。
 *
 * @template T - Item type / 元素类型
 * @param array - Source array / 源数组
 * @param predicate - Test function / 判断函数
 * @returns Remaining slice / 剩余元素
 * @example
 * dropWhile([1, 2, 3, 4], (n) => n < 3)
 * // -> [3, 4]
 */
const dropWhile = <T>(array: readonly T[], predicate: (item: T, index: number) => boolean): T[] => {
  let start = 0

  while (start < array.length && predicate(array[start], start)) {
    start += 1
  }

  return array.slice(start)
}

export default dropWhile
