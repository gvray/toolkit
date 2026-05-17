import { add, multiply, subtract } from './arithmetic'

function assertFiniteNumber(value: number, paramName: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${paramName} must be a finite number`)
  }
}

/**
 * Linear interpolation between `start` and `end` at `t` (typically 0–1).
 * 在 `start` 与 `end` 之间按 `t` 线性插值（`t` 通常为 0–1）。
 *
 * @param start - Start value / 起点
 * @param end - End value / 终点
 * @param t - Interpolation factor / 插值系数
 * @returns Interpolated value / 插值结果
 *
 * @example
 * lerp(0, 100, 0.5) // → 50
 */
export function lerp(start: number, end: number, t: number): number {
  assertFiniteNumber(start, 'start')
  assertFiniteNumber(end, 'end')
  assertFiniteNumber(t, 't')
  return add(start, multiply(subtract(end, start), t))
}

/**
 * Euclidean distance between two coordinate vectors (2D, 3D, or same length).
 * 两点欧氏距离（坐标数组长度须相同，支持 2D/3D 等）。
 *
 * @param a - First point coordinates / 第一点坐标
 * @param b - Second point coordinates / 第二点坐标
 * @returns Distance / 距离
 *
 * @example
 * distance([0, 0], [3, 4]) // → 5
 */
export function distance(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0) {
    throw new Error('coordinate arrays cannot be empty')
  }
  if (a.length !== b.length) {
    throw new Error('coordinate arrays must have the same length')
  }
  let sumSquares = 0
  for (let i = 0; i < a.length; i++) {
    if (!Number.isFinite(a[i]) || !Number.isFinite(b[i])) {
      throw new RangeError(`coordinates[${i}] must be finite numbers`)
    }
    const d = subtract(a[i], b[i])
    sumSquares = add(sumSquares, multiply(d, d))
  }
  return Math.sqrt(sumSquares)
}

/**
 * Convert degrees to radians.
 * 角度转弧度。
 *
 * @param degrees - Angle in degrees / 角度（度）
 * @returns Radians / 弧度
 *
 * @example
 * degToRad(180) // → Math.PI
 */
export function degToRad(degrees: number): number {
  assertFiniteNumber(degrees, 'degrees')
  return multiply(degrees, Math.PI / 180)
}

/**
 * Convert radians to degrees.
 * 弧度转角度。
 *
 * @param radians - Angle in radians / 弧度
 * @returns Degrees / 角度（度）
 *
 * @example
 * radToDeg(Math.PI) // → 180
 */
export function radToDeg(radians: number): number {
  assertFiniteNumber(radians, 'radians')
  return multiply(radians, 180 / Math.PI)
}
