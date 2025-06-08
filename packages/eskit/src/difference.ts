import filter from './filter'
import contains from './contains'

/**
 * Returns an array of values from the first array that are not present in the second array.
 * 返回第一个数组中不存在于第二个数组中的值组成的数组。
 *
 * @typeParam T - The type of the array elements / 数组元素的类型
 * @param arr - The array to inspect / 要检查的数组
 * @param values - The values to exclude from the result / 要从结果中排除的值
 * @returns Array of values not present in the exclusion array / 不存在于排除数组中的值组成的数组
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5]
 * const toExclude = [3, 4, 5, 6, 7]
 * difference(numbers, toExclude) // [1, 2]
 *
 * const fruits = ['apple', 'banana', 'orange', 'grape']
 * const citrus = ['orange', 'lemon', 'lime']
 * difference(fruits, citrus) // ['apple', 'banana', 'grape']
 *
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ]
 * const activeUsers = [{ id: 2, name: 'Bob' }]
 * difference(users, activeUsers) // [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]
 *
 * // Empty exclusion array returns original array
 * difference([1, 2, 3], []) // [1, 2, 3]
 *
 * // No matches returns original array
 * difference([1, 2, 3], [4, 5, 6]) // [1, 2, 3]
 * ```
 *
 * @since 1.0.0
 */
const difference = <T>(arr: T[], values: T[] = []): T[] => filter(arr, (value: any) => !contains(values, value))

export default difference
