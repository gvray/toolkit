/**
 * Linear easing — no acceleration or deceleration.
 *
 * @example
 * linear(0.5) // => 0.5
 * @since 1.0.0
 */
export const linear = (t: number): number => t;

/**
 * Ease-in using a sine curve — starts slow, accelerates toward the end.
 *
 * @example
 * easeInSine(0.5) // ~0.293
 * @since 1.0.0
 */
export const easeInSine = (t: number): number => 1 - Math.cos((t * Math.PI) / 2);

/**
 * Ease-out using a sine curve — starts fast, decelerates toward the end.
 *
 * @example
 * easeOutSine(0.5) // ~0.707
 * @since 1.0.0
 */
export const easeOutSine = (t: number): number => Math.sin((t * Math.PI) / 2);

/**
 * Ease-in-out using a sine curve — slow at both ends, faster in the middle.
 *
 * @example
 * easeInOutSine(0.5) // => 0.5
 * @since 1.0.0
 */
export const easeInOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * Ease-in using a quadratic curve — acceleration from zero.
 *
 * @example
 * easeInQuad(0.5) // => 0.25
 * @since 1.0.0
 */
export const easeInQuad = (t: number): number => t * t;

/**
 * Ease-out using a quadratic curve — deceleration to zero.
 *
 * @example
 * easeOutQuad(0.5) // => 0.75
 * @since 1.0.0
 */
export const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);

/**
 * Ease-in-out using a quadratic curve — slow start and end.
 *
 * @example
 * easeInOutQuad(0.5) // => 0.5
 * @since 1.0.0
 */
export const easeInOutQuad = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/**
 * Ease-in using a cubic curve — stronger acceleration than quad.
 *
 * @example
 * easeInCubic(0.5) // => 0.125
 * @since 1.0.0
 */
export const easeInCubic = (t: number): number => t * t * t;

/**
 * Ease-out using a cubic curve — stronger deceleration than quad.
 *
 * @example
 * easeOutCubic(0.5) // => 0.875
 * @since 1.0.0
 */
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Ease-in-out using a cubic curve — very slow start and end.
 *
 * @example
 * easeInOutCubic(0.5) // => 0.5
 * @since 1.0.0
 */
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Ease-in with an elastic overshoot effect — springs back at the start.
 *
 * @example
 * easeInElastic(0.5) // ~-0.015
 * @since 1.0.0
 */
export const easeInElastic = (t: number): number =>
  t === 0 || t === 1
    ? t
    : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));

/**
 * Ease-out with an elastic overshoot effect — springs past the end then settles.
 *
 * @example
 * easeOutElastic(0.5) // ~1.015
 * @since 1.0.0
 */
export const easeOutElastic = (t: number): number =>
  t === 0 || t === 1
    ? t
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;

/**
 * Ease-out with a bouncing effect — bounces at the end before settling.
 *
 * @example
 * easeOutBounce(0.5) // ~0.766
 * @since 1.0.0
 */
export const easeOutBounce = (t: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
};

/**
 * Ease-in with a bouncing effect — bounces before reaching the start.
 *
 * @example
 * easeInBounce(0.5) // ~0.281
 * @since 1.0.0
 */
export const easeInBounce = (t: number): number => 1 - easeOutBounce(1 - t);

/**
 * Returns a spring-physics easing function configured with `stiffness` and
 * `damping`. The returned function maps a time value `t` (0–1) to a
 * spring-interpolated position.
 *
 * @example
 * const ease = spring({ stiffness: 120, damping: 14 })
 * ease(0.5) // ~0.984
 * @since 1.0.0
 */
export const spring =
  ({ stiffness = 100, damping = 10 }: { stiffness?: number; damping?: number } = {}) =>
  (t: number): number => {
    const w = Math.sqrt(stiffness);
    const z = damping / (2 * Math.sqrt(stiffness));
    if (z < 1) {
      const wd = w * Math.sqrt(1 - z * z);
      return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w * Math.sin(wd * t)) / wd);
    }
    return 1 - Math.exp(-w * t) * (1 + w * t);
  };
