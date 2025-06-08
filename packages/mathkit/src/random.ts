/**
 * Generates a random integer between min and max (inclusive).
 * 生成指定范围内的随机整数（包含边界）。
 *
 * @param min - The minimum value (inclusive) / 最小值（包含）
 * @param max - The maximum value (inclusive) / 最大值（包含）
 * @returns A random integer / 随机整数
 *
 * @example
 * ```typescript
 * randomInt(1, 10) // returns a number between 1 and 10
 * randomInt(0, 100) // returns a number between 0 and 100
 * randomInt(-5, 5) // returns a number between -5 and 5
 * ```
 */
export function randomInt(min: number, max: number): number {
  if (min > max) {
    throw new Error('Min value cannot be greater than max value / 最小值不能大于最大值')
  }

  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates a random float between min and max.
 * 生成指定范围内的随机浮点数。
 *
 * @param min - The minimum value / 最小值
 * @param max - The maximum value / 最大值
 * @param precision - Number of decimal places (default: 2) / 小数位数（默认：2）
 * @returns A random float / 随机浮点数
 *
 * @example
 * ```typescript
 * randomFloat(0, 1) // returns a number like 0.42
 * randomFloat(1.5, 10.7, 3) // returns a number like 7.394
 * ```
 */
export function randomFloat(min: number, max: number, precision = 2): number {
  if (min > max) {
    throw new Error('Min value cannot be greater than max value / 最小值不能大于最大值')
  }

  const random = Math.random() * (max - min) + min
  return Number(random.toFixed(precision))
}

/**
 * Shuffles an array using Fisher-Yates algorithm.
 * 使用Fisher-Yates算法打乱数组。
 *
 * @param array - The array to shuffle / 要打乱的数组
 * @returns A new shuffled array / 打乱后的新数组
 *
 * @example
 * ```typescript
 * shuffle([1, 2, 3, 4, 5]) // returns something like [3, 1, 5, 2, 4]
 * shuffle(['a', 'b', 'c']) // returns something like ['c', 'a', 'b']
 * ```
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

/**
 * Generates a random boolean value.
 * 生成随机布尔值。
 *
 * @param probability - Probability of returning true (0-1, default: 0.5) / 返回true的概率（0-1，默认：0.5）
 * @returns A random boolean / 随机布尔值
 *
 * @example
 * ```typescript
 * randomBoolean() // 50% chance of true
 * randomBoolean(0.7) // 70% chance of true
 * randomBoolean(0.1) // 10% chance of true
 * ```
 */
export function randomBoolean(probability = 0.5): boolean {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1 / 概率必须在0和1之间')
  }

  return Math.random() < probability
}

/**
 * Picks a random element from an array.
 * 从数组中随机选择一个元素。
 *
 * @param array - The array to pick from / 要选择的数组
 * @returns A random element from the array / 数组中的随机元素
 * @throws Error if array is empty / 如果数组为空则抛出错误
 *
 * @example
 * ```typescript
 * randomChoice([1, 2, 3, 4, 5]) // returns one of the numbers
 * randomChoice(['apple', 'banana', 'orange']) // returns one of the fruits
 * ```
 */
export function randomChoice<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Array cannot be empty / 数组不能为空')
  }

  const index = randomInt(0, array.length - 1)
  return array[index]
}
