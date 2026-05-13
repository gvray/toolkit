type DeepFlattened<T> = T extends ReadonlyArray<infer U> ? DeepFlattened<U> : T

const flattenDeepInternal = (array: readonly unknown[], result: unknown[]): void => {
  for (const item of array) {
    if (Array.isArray(item)) {
      flattenDeepInternal(item, result)
    } else {
      result.push(item)
    }
  }
}

/**
 * Recursively flattens a nested array into a single-level array.
 * 递归地将嵌套数组完全展开为单层数组。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @returns A fully flattened array / 完全展开后的数组
 * @example
 * flattenDeep([1, [2, [3, [4]]]])
 * // -> [1, 2, 3, 4]
 */
const flattenDeep = <T>(array: readonly T[]): Array<DeepFlattened<T>> => {
  const result: unknown[] = []

  flattenDeepInternal(array as readonly unknown[], result)

  return result as Array<DeepFlattened<T>>
}

export default flattenDeep
