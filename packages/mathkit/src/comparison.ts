/**
 * Returns the minimum value from an array of numbers.
 * 返回数字数组中的最小值。
 *
 * @param values - Array of numbers / 数字数组
 * @returns The minimum value / 最小值
 * @throws Error if array is empty / 如果数组为空则抛出错误
 *
 * @example
 * ```typescript
 * min([1, 2, 3, 4, 5]) // returns 1
 * min([-10, 0, 10]) // returns -10
 * min([]) // throws Error
 * ```
 */
export function min(values: number[]): number {
  if (values.length === 0) {
    throw new Error('Array cannot be empty / 数组不能为空')
  }
  return Math.min(...values)
}

/**
 * Returns the maximum value from an array of numbers.
 * 返回数字数组中的最大值。
 *
 * @param values - Array of numbers / 数字数组
 * @returns The maximum value / 最大值
 * @throws Error if array is empty / 如果数组为空则抛出错误
 *
 * @example
 * ```typescript
 * max([1, 2, 3, 4, 5]) // returns 5
 * max([-10, 0, 10]) // returns 10
 * max([]) // throws Error
 * ```
 */
export function max(values: number[]): number {
  if (values.length === 0) {
    throw new Error('Array cannot be empty / 数组不能为空')
  }
  return Math.max(...values)
}

/**
 * Clamps a number within the inclusive lower and upper bounds.
 * 将数字限制在指定的上下边界内。
 *
 * @param value - The number to clamp / 要限制的数字
 * @param lower - The lower bound / 下边界
 * @param upper - The upper bound / 上边界
 * @returns The clamped value / 限制后的值
 *
 * @example
 * ```typescript
 * clamp(10, 0, 5) // returns 5
 * clamp(-10, 0, 5) // returns 0
 * clamp(3, 0, 5) // returns 3
 * ```
 */
export function clamp(value: number, lower: number, upper: number): number {
  if (lower > upper) {
    throw new Error('Lower bound cannot be greater than upper bound / 下边界不能大于上边界')
  }
  return Math.min(Math.max(value, lower), upper)
}

/**
 * Checks if a number is even.
 * 检查数字是否为偶数。
 *
 * @param value - The number to check / 要检查的数字
 * @returns True if the number is even / 如果是偶数返回true
 *
 * @example
 * ```typescript
 * isEven(2) // returns true
 * isEven(3) // returns false
 * isEven(0) // returns true
 * ```
 */
export function isEven(value: number): boolean {
  return value % 2 === 0
}

/**
 * Checks if a number is odd.
 * 检查数字是否为奇数。
 *
 * @param value - The number to check / 要检查的数字
 * @returns True if the number is odd / 如果是奇数返回true
 *
 * @example
 * ```typescript
 * isOdd(3) // returns true
 * isOdd(2) // returns false
 * isOdd(1) // returns true
 * ```
 */
export function isOdd(value: number): boolean {
  return value % 2 !== 0
}

/**
 * Whether `value` lies in the closed interval between `start` and `end` (bounds may be reversed).
 * 判断 `value` 是否在 `start` 与 `end` 构成的闭区间内（起止可颠倒）。
 *
 * @param value - Value to test / 待判断的值
 * @param start - Interval bound / 区间一端
 * @param end - Interval bound / 区间另一端
 * @returns True if inside inclusive range / 在区间内为 true
 *
 * @example
 * inRange(5, 1, 10) // → true
 */
export function inRange(value: number, start: number, end: number): boolean {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number')
  }
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    throw new RangeError('start and end must be finite numbers')
  }
  const lo = Math.min(start, end)
  const hi = Math.max(start, end)
  return value >= lo && value <= hi
}
