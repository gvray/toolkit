import {
  linear,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInElastic,
  easeOutElastic,
  easeOutBounce,
  easeInBounce,
  spring,
} from '../src';

describe('easing functions', () => {
  it('linear', () => {
    expect(linear(0)).toBe(0);
    expect(linear(0.5)).toBe(0.5);
    expect(linear(1)).toBe(1);
  });

  it('sine easings', () => {
    expect(easeInSine(0.5)).toBeCloseTo(0.293, 2);
    expect(easeOutSine(0.5)).toBeCloseTo(0.707, 2);
    expect(easeInOutSine(0.5)).toBeCloseTo(0.5, 2);
  });

  it('quad easings', () => {
    expect(easeInQuad(0.5)).toBe(0.25);
    expect(easeOutQuad(0.5)).toBe(0.75);
    expect(easeInOutQuad(0.25)).toBeCloseTo(0.125, 5);
    expect(easeInOutQuad(0.5)).toBeCloseTo(0.5, 5);
    expect(easeInOutQuad(0.75)).toBeCloseTo(0.875, 5);
  });

  it('cubic easings', () => {
    expect(easeInCubic(0.5)).toBe(0.125);
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875, 5);
    expect(easeInOutCubic(0.25)).toBeCloseTo(0.0625, 4);
    expect(easeInOutCubic(0.75)).toBeCloseTo(0.9375, 4);
  });

  it('elastic easings - boundary values', () => {
    expect(easeInElastic(0)).toBe(0);
    expect(easeInElastic(1)).toBe(1);
    expect(easeOutElastic(0)).toBe(0);
    expect(easeOutElastic(1)).toBe(1);
    expect(easeInElastic(0.5)).toBeDefined();
    expect(easeOutElastic(0.5)).toBeDefined();
  });

  it('easeOutBounce - all branches', () => {
    const d1 = 2.75;
    expect(easeOutBounce(0.1)).toBeCloseTo(7.5625 * 0.1 * 0.1, 5);
    const t2 = 1.5 / d1 + 0.01;
    expect(easeOutBounce(t2)).toBeGreaterThan(0.75);
    const t3 = 2.25 / d1 + 0.01;
    expect(easeOutBounce(t3)).toBeGreaterThan(0.9375);
    const t4 = 2.625 / d1 + 0.01;
    expect(easeOutBounce(t4)).toBeGreaterThan(0.984375);
  });

  it('easeInBounce', () => {
    expect(easeInBounce(0.5)).toBeGreaterThan(0);
  });

  it('spring - underdamped (z < 1)', () => {
    const ease = spring({ stiffness: 100, damping: 10 });
    expect(ease(0.5)).toBeGreaterThan(0);
  });

  it('spring - critically/overdamped (z >= 1)', () => {
    const ease = spring({ stiffness: 100, damping: 20 });
    expect(ease(0.5)).toBeDefined();
    const ease2 = spring({ stiffness: 100, damping: 30 });
    expect(ease2(0.5)).toBeDefined();
    expect(spring()(0.5)).toBeGreaterThan(0);
  });

  it('spring - no args uses defaults', () => {
    const ease = spring();
    expect(ease(0)).toBeDefined();
    expect(ease(1)).toBeDefined();
  });
});
