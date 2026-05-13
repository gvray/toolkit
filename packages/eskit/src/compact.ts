/**
 * Removes all falsy values from an array.
 * 移除数组中的所有假值。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @returns A new array without falsy values / 移除假值后的新数组
 * @example
 * compact([0, 1, false, '', 2, null, undefined])
 * // -> [1, 2]
 */
const compact = <T>(array: readonly T[]): T[] => {
  return array.filter((item: T): boolean => Boolean(item))
}

export default compact
