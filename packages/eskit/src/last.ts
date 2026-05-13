/**
 * Returns the last item in an array, or a fallback when the array is empty.
 * 返回数组中的最后一个元素；若数组为空则返回兜底值。
 *
 * @template T - The type of array items / 数组元素类型
 * @template D - The fallback value type / 兜底值类型
 * @param array - The source array / 源数组
 * @param defaultValue - The fallback value / 兜底值
 * @returns The last item or the fallback value / 最后一个元素或兜底值
 * @example
 * last([1, 2, 3])
 * // -> 3
 */
const last = <T, D = undefined>(array: readonly T[], defaultValue?: D): T | D | undefined => {
  if (array.length === 0) {
    return defaultValue
  }

  return array[array.length - 1]
}

export default last
