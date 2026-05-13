/**
 * Checks whether an array or string includes a value.
 * 检查数组或字符串中是否包含指定值。
 *
 * @template T - The array item type / 数组元素类型
 * @param collection - The array or string to search / 要搜索的数组或字符串
 * @param value - The value to search for / 要搜索的值
 * @param position - The start position / 起始搜索位置
 * @returns `true` when the value is found / 找到目标值时返回 `true`
 * @example
 * includesValue([1, 2, 3], 2)
 * // -> true
 */
const includesValue = <T>(collection: readonly T[] | string, value: T | string, position: number = 0): boolean => {
  if (typeof collection === 'string') {
    return collection.includes(String(value), position)
  }

  return collection.includes(value as T, position)
}

export default includesValue
