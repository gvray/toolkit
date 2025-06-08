/**
 * Get the number of decimal places in a number.
 * 获取数字的小数位数。
 *
 * @param num - A number to find the decimal places of / 要查找小数位数的数字
 * @returns The number of decimal places / 小数位数
 */
function getDecimalPlaces(num: number): number {
  const decimalPart = String(num).split('.')[1]
  return decimalPart ? decimalPart.length : 0
}

/**
 * Adds two numbers with fixed precision to avoid floating point errors.
 * 高精度加法运算，避免浮点数误差。
 *
 * @param a - The first number to add / 第一个加数
 * @param b - The second number to add / 第二个加数
 * @returns The result of adding the two numbers / 加法结果
 *
 * @example
 * ```typescript
 * add(0.1, 0.2) // returns 0.3 (not 0.30000000000000004)
 * add(123.456, 78.9) // returns 202.356
 * ```
 */
export function add(a: number, b: number): number {
  const m = Math.pow(10, Math.max(getDecimalPlaces(a), getDecimalPlaces(b)))
  return Math.round(((a * m + b * m) / m) * 1000000) / 1000000
}

/**
 * Subtracts second number from first number with fixed precision.
 * 高精度减法运算，避免浮点数误差。
 *
 * @param a - The minuend / 被减数
 * @param b - The subtrahend / 减数
 * @returns The result of subtracting b from a / 减法结果
 *
 * @example
 * ```typescript
 * subtract(0.3, 0.1) // returns 0.2 (not 0.19999999999999998)
 * subtract(123.456, 23.45) // returns 100.006
 * ```
 */
export function subtract(a: number, b: number): number {
  const m = Math.pow(10, Math.max(getDecimalPlaces(a), getDecimalPlaces(b)))
  return Math.round(((a * m - b * m) / m) * 1000000) / 1000000
}

/**
 * Multiplies two numbers with fixed precision.
 * 高精度乘法运算，避免浮点数误差。
 *
 * @param a - The first number to multiply / 第一个乘数
 * @param b - The second number to multiply / 第二个乘数
 * @returns The result of multiplying the two numbers / 乘法结果
 *
 * @example
 * ```typescript
 * multiply(0.1, 0.2) // returns 0.02 (not 0.020000000000000004)
 * multiply(1.23, 4.56) // returns 5.6088
 * ```
 */
export function multiply(a: number, b: number): number {
  const decimalPlacesA = getDecimalPlaces(a)
  const decimalPlacesB = getDecimalPlaces(b)
  const totalDecimalPlaces = decimalPlacesA + decimalPlacesB

  const intA = Math.round(a * Math.pow(10, decimalPlacesA))
  const intB = Math.round(b * Math.pow(10, decimalPlacesB))

  return (intA * intB) / Math.pow(10, totalDecimalPlaces)
}

/**
 * Divides first number by second number with fixed precision.
 * 高精度除法运算，避免浮点数误差。
 *
 * @param a - The dividend / 被除数
 * @param b - The divisor / 除数
 * @returns The result of dividing a by b / 除法结果
 * @throws Error if divisor is zero / 如果除数为零则抛出错误
 *
 * @example
 * ```typescript
 * divide(0.3, 0.1) // returns 3 (not 2.9999999999999996)
 * divide(123.456, 12.3) // returns 10.037073170731707
 * divide(5, 0) // throws Error
 * ```
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed / 除数不能为零')
  }

  const decimalPlacesA = getDecimalPlaces(a)
  const decimalPlacesB = getDecimalPlaces(b)

  const intA = Math.round(a * Math.pow(10, decimalPlacesA))
  const intB = Math.round(b * Math.pow(10, decimalPlacesB))

  return (intA / intB) * Math.pow(10, decimalPlacesB - decimalPlacesA)
}
