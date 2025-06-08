/**
 * Flattens a nested array into a single-level array.
 * 将嵌套数组展平为单级数组。
 *
 * This function recursively flattens all nested arrays regardless of depth.
 * It modifies the input array during processing, so pass a copy if you need
 * to preserve the original array.
 * 此函数递归展平所有嵌套数组，无论深度如何。
 * 它在处理过程中会修改输入数组，如果需要保留原始数组，请传递副本。
 *
 * @template T - The type of the array elements / 数组元素的类型
 * @param array - The array to flatten / 要展平的数组
 * @returns The flattened array / 展平后的数组
 *
 * @example
 * ```typescript
 * // Basic flattening / 基本展平
 * const nested = [1, [2, 3], [4, [5, 6]]]
 * flatten([...nested]) // [1, 2, 3, 4, 5, 6]
 *
 * // Mixed types / 混合类型
 * const mixed = ['a', ['b', 'c'], ['d', ['e', 'f']]]
 * flatten([...mixed]) // ['a', 'b', 'c', 'd', 'e', 'f']
 *
 * // Deep nesting / 深度嵌套
 * const deep = [1, [2, [3, [4, [5]]]]]
 * flatten([...deep]) // [1, 2, 3, 4, 5]
 *
 * // Empty arrays / 空数组
 * const withEmpty = [1, [], [2, []], 3]
 * flatten([...withEmpty]) // [1, 2, 3]
 * ```
 *
 * @since 1.0.0
 */
const flatten = <T>(array: Array<T | T[]>): T[] => {
  const result: T[] = []

  while (array.length) {
    const item = array.shift()

    if (Array.isArray(item)) {
      array.unshift(...(item as T[]))
    } else {
      result.push(item as T)
    }
  }

  return result
}

export default flatten
