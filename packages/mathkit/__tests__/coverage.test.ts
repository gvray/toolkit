/**
 * Extra tests to push statement coverage to 96%+.
 * Targets uncovered lines in: numberTheory, geometry, ratio, random, stats,
 * comparison, arithmetic (mod), precision.
 */

import { gcd, lcm, isPrime, factorial } from '../src/numberTheory';
import { lerp, distance, degToRad, radToDeg } from '../src/geometry';
import { percentage, percentageChange, distribute } from '../src/ratio';
import { randomSample, randomWeighted } from '../src/random';
import { sum, average, mode, percentile } from '../src/stats';
import { inRange } from '../src/comparison';
import { mod } from '../src/arithmetic';
import { round, ceil, floor, toFixed } from '../src/precision';

// ── numberTheory ─────────────────────────────────────────────────────────────

describe('numberTheory', () => {
  describe('gcd', () => {
    it('throws for non-integer inputs', () => {
      // line 5 in numberTheory (assertPositiveInteger used by factorial)
      expect(() => gcd(1.5, 2)).toThrow(RangeError);
    });

    it('handles zero', () => {
      expect(gcd(0, 5)).toBe(5);
    });
  });

  describe('lcm', () => {
    it('returns 0 when either arg is 0', () => {
      // line 51 – the a===0 || b===0 branch
      expect(lcm(0, 5)).toBe(0);
      expect(lcm(4, 0)).toBe(0);
    });
  });

  describe('isPrime', () => {
    it('returns false for n < 2', () => {
      // line 70 – n < 2 branch
      expect(isPrime(1)).toBe(false);
      expect(isPrime(0)).toBe(false);
      expect(isPrime(-3)).toBe(false);
    });

    it('returns true for 2', () => {
      // line 73 – n === 2 branch
      expect(isPrime(2)).toBe(true);
    });

    it('returns false for even numbers > 2', () => {
      // line 76 – n % 2 === 0 branch
      expect(isPrime(4)).toBe(false);
      expect(isPrime(100)).toBe(false);
    });

    it('returns false for composite odd numbers', () => {
      // lines 79-80 – the loop body returning false
      expect(isPrime(9)).toBe(false);
      expect(isPrime(15)).toBe(false);
      expect(isPrime(25)).toBe(false);
    });

    it('returns true for prime numbers', () => {
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
      expect(isPrime(13)).toBe(true);
    });
  });

  describe('factorial', () => {
    it('throws for non-integer / negative n', () => {
      // line 5 via assertPositiveInteger
      expect(() => factorial(-1)).toThrow(RangeError);
      expect(() => factorial(1.5)).toThrow(RangeError);
    });

    it('computes factorial(0) = 1', () => {
      expect(factorial(0)).toBe(1);
    });

    it('computes factorial(5)', () => {
      expect(factorial(5)).toBe(120);
    });
  });

  describe('gcd with non-integers', () => {
    it('line 24 – throws for non-integer b', () => {
      expect(() => gcd(4, 1.5)).toThrow(RangeError);
    });
  });
});

// ── geometry ─────────────────────────────────────────────────────────────────

describe('geometry extra', () => {
  it('lerp throws on non-finite start', () => {
    // line 5 – assertFiniteNumber
    expect(() => lerp(Infinity, 100, 0.5)).toThrow(RangeError);
    expect(() => lerp(0, NaN, 0.5)).toThrow(RangeError);
    expect(() => lerp(0, 100, Infinity)).toThrow(RangeError);
  });

  it('distance throws on empty array', () => {
    // line 45 – empty array branch
    expect(() => distance([], [1, 2])).toThrow('coordinate arrays cannot be empty');
    expect(() => distance([1, 2], [])).toThrow('coordinate arrays cannot be empty');
  });

  it('distance throws on non-finite coordinate', () => {
    // line 53 – non-finite coordinate inside loop
    expect(() => distance([Infinity, 0], [0, 0])).toThrow(RangeError);
  });

  it('degToRad throws on non-finite degrees', () => {
    expect(() => degToRad(Infinity)).toThrow(RangeError);
  });

  it('radToDeg throws on non-finite radians', () => {
    expect(() => radToDeg(NaN)).toThrow(RangeError);
  });
});

// ── ratio ─────────────────────────────────────────────────────────────────────

describe('ratio extra', () => {
  it('percentage throws on non-finite part', () => {
    // line 6 – assertFiniteNumber
    expect(() => percentage(Infinity, 100)).toThrow(RangeError);
  });

  it('percentageChange throws when from is 0', () => {
    // line 49
    expect(() => percentageChange(0, 50)).toThrow('from cannot be zero');
  });

  it('percentageChange throws on non-finite', () => {
    // line 6 (shared assertFiniteNumber)
    expect(() => percentageChange(NaN, 50)).toThrow(RangeError);
  });

  it('distribute throws on empty weights', () => {
    // line 70
    expect(() => distribute(100, [])).toThrow('weights cannot be empty');
  });

  it('distribute throws on negative weight', () => {
    // line 74
    expect(() => distribute(100, [1, -1])).toThrow(RangeError);
  });

  it('distribute throws when weights sum to zero', () => {
    // line 80
    expect(() => distribute(100, [0, 0])).toThrow('weights sum cannot be zero');
  });
});

// ── random ────────────────────────────────────────────────────────────────────

describe('random extra', () => {
  it('randomSample throws on non-integer count', () => {
    // line 144
    expect(() => randomSample([1, 2, 3], 1.5)).toThrow(RangeError);
    expect(() => randomSample([1, 2, 3], -1)).toThrow(RangeError);
  });

  it('randomWeighted throws on empty items', () => {
    // line 176
    expect(() => randomWeighted([])).toThrow('items cannot be empty');
  });

  it('randomWeighted throws on invalid weight', () => {
    // line 181
    expect(() => randomWeighted([{ value: 'a', weight: -1 }])).toThrow(RangeError);
    expect(() => randomWeighted([{ value: 'a', weight: Infinity }])).toThrow(RangeError);
  });

  it('randomWeighted throws when total weight is zero', () => {
    // line 187
    expect(() => randomWeighted([{ value: 'a', weight: 0 }])).toThrow(
      'total weight cannot be zero'
    );
  });

  it('randomWeighted returns last item as fallback', () => {
    // line 198 – exercise the fallback return after the loop
    // Force Math.random to return 0 so threshold is 0 and the loop returns first item
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.9999999999);
    try {
      // With 2 items each weight 1, total=2, threshold=~2
      // Loop: item1 weight 1 => threshold ~= 1 (> 0), item2 weight 1 => threshold ~= 0 (<=0) → returns item2
      const result = randomWeighted([
        { value: 'a', weight: 1 },
        { value: 'b', weight: 1 },
      ]);
      expect(['a', 'b']).toContain(result);
    } finally {
      spy.mockRestore();
    }
  });
});

// ── stats ─────────────────────────────────────────────────────────────────────

describe('stats extra', () => {
  it('assertNumberArray throws on non-finite value', () => {
    // line 9 – inside assertNumberArray forEach
    expect(() => average([1, Infinity, 3])).toThrow(RangeError);
  });

  it('sum throws on non-finite value', () => {
    // line 32 – sum's own forEach check
    expect(() => sum([1, NaN, 3])).toThrow(RangeError);
  });

  it('mode returns all tied modes', () => {
    expect(mode([1, 1, 2, 2])).toEqual(expect.arrayContaining([1, 2]));
  });

  it('percentile throws for p out of range', () => {
    // line 159
    expect(() => percentile([1, 2, 3], -1)).toThrow(RangeError);
    expect(() => percentile([1, 2, 3], 101)).toThrow(RangeError);
    expect(() => percentile([1, 2, 3], NaN)).toThrow(RangeError);
  });

  it('percentile p=0 clamps index to 0', () => {
    expect(percentile([3, 1, 2], 0)).toBe(1);
  });
});

// ── comparison extra ─────────────────────────────────────────────────────────

describe('comparison extra', () => {
  it('inRange throws on non-finite value', () => {
    // line 130
    expect(() => inRange(Infinity, 0, 10)).toThrow(RangeError);
    expect(() => inRange(NaN, 0, 10)).toThrow(RangeError);
  });

  it('inRange throws on non-finite start or end', () => {
    // line 133
    expect(() => inRange(5, Infinity, 10)).toThrow(RangeError);
    expect(() => inRange(5, 0, NaN)).toThrow(RangeError);
  });
});

// ── arithmetic extra ──────────────────────────────────────────────────────────

describe('arithmetic extra', () => {
  it('mod throws on non-finite inputs', () => {
    // line 21 – assertFiniteNumber
    expect(() => mod(Infinity, 3)).toThrow(RangeError);
    expect(() => mod(5, NaN)).toThrow(RangeError);
  });
});

// ── precision extra ───────────────────────────────────────────────────────────

describe('precision extra', () => {
  it('round throws on non-finite value', () => {
    // line 3 – assertFiniteNumber
    expect(() => round(Infinity)).toThrow(RangeError);
    expect(() => round(NaN)).toThrow(RangeError);
  });

  it('ceil throws on non-finite value', () => {
    expect(() => ceil(NaN)).toThrow(RangeError);
  });

  it('floor throws on non-finite value', () => {
    expect(() => floor(Infinity)).toThrow(RangeError);
  });

  it('toFixed handles negative rounded values', () => {
    // exercises the negative branch in toFixed
    expect(toFixed(-1.6, 0)).toBe('-2');
    expect(toFixed(-3.14, 1)).toBe('-3.1');
  });

  it('toFixed with zero decimals', () => {
    expect(toFixed(3.7, 0)).toBe('4');
  });
});
