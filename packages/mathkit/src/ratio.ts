import { add, divide, multiply, subtract } from './arithmetic'
import { sum } from './stats'

function assertFiniteNumber(value: number, paramName: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${paramName} must be a finite number`)
  }
}

/**
 * What percent `part` is of `total` (0–100 scale).
 * 计算 `part` 占 `total` 的百分比（0–100）。
 *
 * @param part - Partial value / 部分值
 * @param total - Whole value / 总值
 * @returns Percentage / 百分比
 *
 * @example
 * percentage(30, 200) // → 15
 */
export function percentage(part: number, total: number): number {
  assertFiniteNumber(part, 'part')
  assertFiniteNumber(total, 'total')
  if (total === 0) {
    throw new Error('total cannot be zero')
  }
  return multiply(divide(part, total), 100)
}

/**
 * Percent change from `from` to `to` ((to - from) / from * 100).
 * 从 `from` 到 `to` 的涨跌幅百分比。
 *
 * @param from - Original value / 原值
 * @param to - New value / 新值
 * @returns Percent change / 变化百分比
 *
 * @example
 * percentageChange(100, 120) // → 20
 */
export function percentageChange(from: number, to: number): number {
  assertFiniteNumber(from, 'from')
  assertFiniteNumber(to, 'to')
  if (from === 0) {
    throw new Error('from cannot be zero')
  }
  return multiply(divide(subtract(to, from), from), 100)
}

/**
 * Split `total` by weight ratios; remainder goes to largest fractional parts (largest remainder method).
 * 按权重比例分配总量；余数按最大余额法分配。
 *
 * @param total - Amount to split / 待分配总量
 * @param weights - Non-negative weights / 非负权重
 * @returns Allocated parts summing to `total` / 分配结果，之和为 `total`
 *
 * @example
 * distribute(100, [1, 2, 2]) // → [20, 40, 40]
 */
export function distribute(total: number, weights: number[]): number[] {
  assertFiniteNumber(total, 'total')
  if (weights.length === 0) {
    throw new Error('weights cannot be empty')
  }
  weights.forEach((w, i) => {
    if (!Number.isFinite(w) || w < 0) {
      throw new RangeError(`weights[${i}] must be a non-negative finite number`)
    }
  })

  const weightSum = sum(weights)
  if (weightSum === 0) {
    throw new Error('weights sum cannot be zero')
  }

  const exact = weights.map(w => divide(multiply(total, w), weightSum))
  const allocated = exact.map(v => Math.floor(v))
  let remainder = subtract(total, sum(allocated))

  const order = exact
    .map((value, index) => ({
      index,
      fraction: subtract(value, allocated[index])
    }))
    .sort((a, b) => b.fraction - a.fraction)

  let cursor = 0
  const step = remainder > 0 ? 1 : remainder < 0 ? -1 : 0
  while (Math.abs(remainder) >= 1) {
    const i = order[cursor % order.length].index
    allocated[i] = add(allocated[i], step)
    remainder = subtract(remainder, step)
    cursor += 1
  }

  return allocated
}
