/**
 * Returns the first item in an array, or a fallback when the array is empty.
 * 返回数组中的第一个元素；若数组为空则返回兜底值。
 *
 * @template T - The type of array items / 数组元素类型
 * @template D - The fallback value type / 兜底值类型
 * @param array - The source array / 源数组
 * @param defaultValue - The fallback value / 兜底值
 * @returns The first item or the fallback value / 第一个元素或兜底值
 * @example
 * first([1, 2, 3])
 * // -> 1
 */
const first = <T, D = undefined>(array: readonly T[], defaultValue?: D): T | D | undefined => {
  if (array.length === 0) {
    return defaultValue
  }

  return array[0]
}

export default first
