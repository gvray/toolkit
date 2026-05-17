import { add, divide, multiply, subtract } from './arithmetic'

function assertFiniteNumber(value: number, paramName: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${paramName} must be a finite number`)
  }
}

function assertNumberArray(values: number[], paramName: string): void {
  if (values.length === 0) {
    throw new Error(`${paramName} cannot be empty`)
  }
  values.forEach((v, i) => {
    if (!Number.isFinite(v)) {
      throw new RangeError(`${paramName}[${i}] must be a finite number`)
    }
  })
}

/**
 * Sum all numbers in an array (uses high-precision `add`).
 * 对数组求和（内部使用高精度 `add`）。
 *
 * @param values - Numbers to sum / 待求和的数组
 * @returns Sum / 总和
 *
 * @example
 * sum([1, 2, 3, 4]) // → 10
 */
export function sum(values: number[]): number {
  if (values.length === 0) {
    return 0
  }
  values.forEach((v, i) => {
    if (!Number.isFinite(v)) {
      throw new RangeError(`values[${i}] must be a finite number`)
    }
  })
  return values.reduce((acc, v) => add(acc, v), 0)
}

/**
 * Arithmetic mean of an array.
 * 算术平均值。
 *
 * @param values - Numbers / 数字数组
 * @returns Mean / 平均值
 *
 * @example
 * average([1, 2, 3, 4]) // → 2.5
 */
export function average(values: number[]): number {
  assertNumberArray(values, 'values')
  return divide(sum(values), values.length)
}

/**
 * Median of an array (average of two middles when length is even).
 * 中位数（偶数个元素时取中间两数平均）。
 *
 * @param values - Numbers / 数字数组
 * @returns Median / 中位数
 *
 * @example
 * median([1, 2, 3, 4, 5]) // → 3
 */
export function median(values: number[]): number {
  assertNumberArray(values, 'values')
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 1) {
    return sorted[mid]
  }
  return divide(add(sorted[mid - 1], sorted[mid]), 2)
}

/**
 * Population variance.
 * 总体方差。
 *
 * @param values - Numbers / 数字数组
 * @returns Variance / 方差
 *
 * @example
 * variance([2, 4, 4, 4, 5, 5, 7, 9]) // → 4
 */
export function variance(values: number[]): number {
  assertNumberArray(values, 'values')
  const mean = average(values)
  const squaredDiffs = values.map(v => {
    const d = subtract(v, mean)
    return multiply(d, d)
  })
  return divide(sum(squaredDiffs), values.length)
}

/**
 * Population standard deviation (square root of `variance`).
 * 总体标准差（`variance` 的平方根）。
 *
 * @param values - Numbers / 数字数组
 * @returns Standard deviation / 标准差
 *
 * @example
 * stdDev([2, 4, 4, 4, 5, 5, 7, 9]) // → 2
 */
export function stdDev(values: number[]): number {
  return Math.sqrt(variance(values))
}

/**
 * Mode (most frequent value). Returns all modes when tied.
 * 众数（出现次数最多的值），并列时返回全部众数。
 *
 * @param values - Numbers / 数字数组
 * @returns Mode values / 众数列表
 *
 * @example
 * mode([1, 2, 2, 3, 3, 3]) // -> [3]
 */
export function mode(values: number[]): number[] {
  assertNumberArray(values, 'values')
  const frequency = new Map<number, number>()

  for (const value of values) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1)
  }

  let maxCount = 0
  for (const count of frequency.values()) {
    maxCount = Math.max(maxCount, count)
  }

  return [...frequency.entries()].filter(([, count]) => count === maxCount).map(([value]) => value)
}

/**
 * Percentile using linear interpolation (0–100 scale).
 * 百分位数（0–100，线性插值）。
 *
 * @param values - Numbers / 数字数组
 * @param p - Percentile 0–100 / 百分位
 * @returns Percentile value / 百分位对应值
 *
 * @example
 * percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 90) // -> 9
 */
export function percentile(values: number[], p: number): number {
  assertNumberArray(values, 'values')
  if (!Number.isFinite(p) || p < 0 || p > 100) {
    throw new RangeError('p must be between 0 and 100')
  }

  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.ceil((p / 100) * sorted.length) - 1
  return sorted[Math.max(0, Math.min(sorted.length - 1, index))]
}
