type SortIteratee<T> = ((item: T) => unknown) | keyof T

const getSortValue = <T>(item: T, iteratee: SortIteratee<T>): unknown => {
  if (typeof iteratee === 'function') {
    return iteratee(item)
  }

  return item[iteratee]
}

/**
 * Returns a new array sorted by one or more derived keys.
 * 按一个或多个派生键返回排序后的新数组。
 *
 * @template T - The array item type / 数组元素类型
 * @param array - The source array / 源数组
 * @param iteratees - The sort key selectors / 排序键选择器
 * @returns A new sorted array / 排序后的新数组
 * @example
 * sortBy([{ age: 2 }, { age: 1 }], 'age')
 * // -> [{ age: 1 }, { age: 2 }]
 */
const sortBy = <T>(array: readonly T[], ...iteratees: Array<SortIteratee<T>>): T[] => {
  const criteria = iteratees.length > 0 ? iteratees : [((item: T) => item) as SortIteratee<T>]

  return [...array].sort((left: T, right: T) => {
    for (const iteratee of criteria) {
      const leftValue = getSortValue(left, iteratee)
      const rightValue = getSortValue(right, iteratee)

      if (leftValue === rightValue) {
        continue
      }

      return leftValue! < rightValue! ? -1 : 1
    }

    return 0
  })
}

export default sortBy
