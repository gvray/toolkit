import { multiply } from './arithmetic'

function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative integer`)
  }
}

/**
 * Greatest common divisor.
 * 最大公约数。
 *
 * @param a - First integer / 第一个整数
 * @param b - Second integer / 第二个整数
 * @returns GCD / 最大公约数
 *
 * @example
 * gcd(12, 8) // -> 4
 */
export function gcd(a: number, b: number): number {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new RangeError('gcd expects integers')
  }
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const temp = y
    y = x % y
    x = temp
  }
  return x
}

/**
 * Least common multiple.
 * 最小公倍数。
 *
 * @param a - First integer / 第一个整数
 * @param b - Second integer / 第二个整数
 * @returns LCM / 最小公倍数
 *
 * @example
 * lcm(4, 6) // -> 12
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0
  }
  return Math.abs(multiply(a, b)) / gcd(a, b)
}

/**
 * Prime check.
 * 质数判断。
 *
 * @param n - Integer to test / 待判断整数
 * @returns True if prime / 是质数则为 true
 *
 * @example
 * isPrime(7) // -> true
 */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) {
    return false
  }
  if (n === 2) {
    return true
  }
  if (n % 2 === 0) {
    return false
  }
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

/**
 * Factorial n!.
 * 阶乘 n!。
 *
 * @param n - Non-negative integer / 非负整数
 * @returns Factorial / 阶乘结果
 *
 * @example
 * factorial(5) // -> 120
 */
export function factorial(n: number): number {
  assertPositiveInteger(n, 'n')
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}
