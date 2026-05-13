type Flattened<T> = T extends ReadonlyArray<infer U> ? U : T

/**
 * Flattens nested array items up to the specified depth.
 * 按指定深度展开数组中的嵌套元素。
 *
 * @template T - The type of array items / 数组元素类型
 * @param array - The source array / 源数组
 * @param depth - The number of levels to flatten / 要展开的层级
 * @returns A new flattened array / 展开后的新数组
 * @example
 * flatten([1, [2, [3]], 4], 1)
 * // -> [1, 2, [3], 4]
 */
const flatten = <T>(array: readonly T[], depth: number = 1): Array<Flattened<T>> => {
  if (!Number.isInteger(depth) || depth < 0) {
    throw new TypeError('depth must be a non-negative integer')
  }

  if (depth === 0) {
    return array.slice() as Array<Flattened<T>>
  }

  const result: unknown[] = []

  for (const item of array as readonly unknown[]) {
    if (Array.isArray(item)) {
      if (depth === 1) {
        result.push(...item)
      } else {
        result.push(...flatten(item, depth - 1))
      }
    } else {
      result.push(item)
    }
  }

  return result as Array<Flattened<T>>
}

export default flatten
