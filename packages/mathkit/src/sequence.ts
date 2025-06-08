/**
 * Creates an array of numbers progressing from start up to, but not including, end.
 * 创建一个从start到end（不包含end）的数字数组。
 *
 * @param start - The start of the range / 范围的开始
 * @param end - The end of the range / 范围的结束
 * @param step - The value to increment or decrement by (default: 1) / 步长（默认：1）
 * @returns An array of numbers / 数字数组
 *
 * @example
 * ```typescript
 * range(0, 5) // returns [0, 1, 2, 3, 4]
 * range(1, 10, 2) // returns [1, 3, 5, 7, 9]
 * range(10, 0, -2) // returns [10, 8, 6, 4, 2]
 * ```
 */
export function range(start: number, end: number, step = 1): number[] {
  if (step === 0) {
    throw new Error('Step cannot be zero / 步长不能为零')
  }

  const result: number[] = []

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  }

  return result
}

/**
 * Creates an array with a single value repeated n times.
 * 创建一个包含重复值的数组。
 *
 * @param value - The value to repeat / 要重复的值
 * @param count - The number of times to repeat / 重复次数
 * @returns An array with repeated values / 包含重复值的数组
 *
 * @example
 * ```typescript
 * repeat(0, 5) // returns [0, 0, 0, 0, 0]
 * repeat('hello', 3) // returns ['hello', 'hello', 'hello']
 * repeat(true, 2) // returns [true, true]
 * ```
 */
export function repeat<T>(value: T, count: number): T[] {
  if (count < 0) {
    throw new Error('Count cannot be negative / 计数不能为负数')
  }

  return Array(count).fill(value)
}

/**
 * Generates the Fibonacci sequence up to n terms.
 * 生成斐波那契数列的前n项。
 *
 * @param n - The number of terms to generate / 要生成的项数
 * @returns An array containing the Fibonacci sequence / 包含斐波那契数列的数组
 *
 * @example
 * ```typescript
 * fibonacci(10) // returns [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * fibonacci(5) // returns [0, 1, 1, 2, 3]
 * fibonacci(0) // returns []
 * ```
 */
export function fibonacci(n: number): number[] {
  if (n < 0) {
    throw new Error('Number of terms cannot be negative / 项数不能为负数')
  }

  if (n === 0) return []
  if (n === 1) return [0]
  if (n === 2) return [0, 1]

  const result = [0, 1]

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2])
  }

  return result
}

/**
 * Generates an arithmetic sequence.
 * 生成等差数列。
 *
 * @param firstTerm - The first term / 首项
 * @param commonDifference - The common difference / 公差
 * @param numberOfTerms - The number of terms / 项数
 * @returns An array containing the arithmetic sequence / 包含等差数列的数组
 *
 * @example
 * ```typescript
 * arithmeticSequence(2, 3, 5) // returns [2, 5, 8, 11, 14]
 * arithmeticSequence(10, -2, 6) // returns [10, 8, 6, 4, 2, 0]
 * ```
 */
export function arithmeticSequence(firstTerm: number, commonDifference: number, numberOfTerms: number): number[] {
  if (numberOfTerms < 0) {
    throw new Error('Number of terms cannot be negative / 项数不能为负数')
  }

  const result: number[] = []

  for (let i = 0; i < numberOfTerms; i++) {
    result.push(firstTerm + i * commonDifference)
  }

  return result
}

/**
 * Generates a geometric sequence.
 * 生成等比数列。
 *
 * @param firstTerm - The first term / 首项
 * @param commonRatio - The common ratio / 公比
 * @param numberOfTerms - The number of terms / 项数
 * @returns An array containing the geometric sequence / 包含等比数列的数组
 *
 * @example
 * ```typescript
 * geometricSequence(2, 3, 5) // returns [2, 6, 18, 54, 162]
 * geometricSequence(1, 0.5, 4) // returns [1, 0.5, 0.25, 0.125]
 * ```
 */
export function geometricSequence(firstTerm: number, commonRatio: number, numberOfTerms: number): number[] {
  if (numberOfTerms < 0) {
    throw new Error('Number of terms cannot be negative / 项数不能为负数')
  }

  const result: number[] = []

  for (let i = 0; i < numberOfTerms; i++) {
    result.push(firstTerm * Math.pow(commonRatio, i))
  }

  return result
}
