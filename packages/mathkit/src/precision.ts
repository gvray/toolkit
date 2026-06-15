function assertFiniteNumber(value: number, paramName: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${paramName} must be a finite number`);
  }
}

function assertNonNegativeInteger(value: number, paramName: string): void {
  assertFiniteNumber(value, paramName);
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${paramName} must be a non-negative integer`);
  }
}

/**
 * Round to `decimals` places without classic float artifacts (e.g. 1.005 → 1.01).
 * 按小数位四舍五入，避免 1.005 变成 1.00 等问题。
 *
 * @param value - Number to round / 待舍入的数
 * @param decimals - Decimal places (default 0) / 保留小数位，默认 0
 * @returns Rounded number / 舍入结果
 *
 * @example
 * round(1.005, 2) // => 1.01
 *
 * @since 1.0.0
 */
export function round(value: number, decimals = 0): number {
  assertFiniteNumber(value, 'value');
  assertNonNegativeInteger(decimals, 'decimals');
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Round up to `decimals` places.
 * 按小数位向上取整。
 *
 * @param value - Number to ceil / 待取整的数
 * @param decimals - Decimal places (default 0) / 小数位，默认 0
 * @returns Ceiled number / 向上取整结果
 *
 * @example
 * ceil(1.001, 2) // => 1.01
 *
 * @since 1.0.0
 */
export function ceil(value: number, decimals = 0): number {
  assertFiniteNumber(value, 'value');
  assertNonNegativeInteger(decimals, 'decimals');
  const factor = 10 ** decimals;
  return Math.ceil(value * factor) / factor;
}

/**
 * Round down to `decimals` places.
 * 按小数位向下取整。
 *
 * @param value - Number to floor / 待取整的数
 * @param decimals - Decimal places (default 0) / 小数位，默认 0
 * @returns Floored number / 向下取整结果
 *
 * @example
 * floor(1.999, 2) // => 1.99
 *
 * @since 1.0.0
 */
export function floor(value: number, decimals = 0): number {
  assertFiniteNumber(value, 'value');
  assertNonNegativeInteger(decimals, 'decimals');
  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
}

/**
 * Format as fixed-point string without scientific notation.
 * 格式化为定点数字符串，不使用科学计数法。
 *
 * @param value - Number to format / 待格式化的数
 * @param decimals - Decimal places / 小数位数
 * @returns Fixed-point string / 定点数字符串
 *
 * @example
 * toFixed(0.000001, 8) // => '0.00000100'
 *
 * @since 1.0.0
 */
export function toFixed(value: number, decimals: number): string {
  assertFiniteNumber(value, 'value');
  assertNonNegativeInteger(decimals, 'decimals');
  return round(value, decimals).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false,
  });
}
