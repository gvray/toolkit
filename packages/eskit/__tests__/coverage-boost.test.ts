/**
 * Tests added to boost statement coverage to 96%+.
 * Each describe block targets specific uncovered lines identified by the coverage report.
 */
import after from '../src/after';
import before from '../src/before';
import contains from '../src/contains';
import each from '../src/each';
import every from '../src/every';
import flatten from '../src/flatten';
import get from '../src/get';
import getGlobal from '../src/getGlobal';
import has from '../src/has';
import intersection from '../src/intersection';
import isElement from '../src/isElement';
import isEmpty from '../src/isEmpty';
import isEqual from '../src/isEqual';
import isEqualWith from '../src/isEqualWith';
import isInteger from '../src/isInteger';
import isPromiseLike from '../src/isPromiseLike';
import jsonClone from '../src/jsonClone';
import pad from '../src/pad';
import set from '../src/set';
import some from '../src/some';
import sortBy from '../src/sortBy';
import toString from '../src/toString';
import unset from '../src/unset';
import unzip from '../src/unzip';
import zip from '../src/zip';
import { toPath } from '../src/_internal/path';

// ─── after ────────────────────────────────────────────────────────────────────
describe('after – error branch (line 23)', () => {
  it('throws RangeError for non-positive n', () => {
    expect(() => after(0, () => {})).toThrow(RangeError);
    expect(() => after(-1, () => {})).toThrow(RangeError);
    expect(() => after(1.5 as any, () => {})).toThrow(RangeError);
  });
});

// ─── before ───────────────────────────────────────────────────────────────────
describe('before – error branch (line 23)', () => {
  it('throws RangeError for non-positive n', () => {
    expect(() => before(0, () => {})).toThrow(RangeError);
    expect(() => before(-1, () => {})).toThrow(RangeError);
  });
});

// ─── contains ─────────────────────────────────────────────────────────────────
describe('contains', () => {
  it('returns false for non-array non-string inputs', () => {
    expect(contains(123 as any, 1)).toBe(false);
    expect(contains(null as any, null)).toBe(false);
  });

  it('returns false when value is null or undefined', () => {
    expect(contains([1, 2, 3], null)).toBe(false);
    expect(contains([1, 2, 3], undefined)).toBe(false);
  });

  it('returns true when array contains the value', () => {
    expect(contains([1, 2, 3], 2)).toBe(true);
  });

  it('returns false when array does not contain the value', () => {
    expect(contains([1, 2, 3], 9)).toBe(false);
  });

  it('supports positive position argument', () => {
    expect(contains([1, 2, 3], 1, 1)).toBe(false);
    expect(contains([1, 2, 3], 2, 1)).toBe(true);
    expect(contains('hello', 'e', 2)).toBe(false);
    expect(contains('hello', 'l', 2)).toBe(true);
  });
});

// ─── each – early-stop on false in object branch (line 64) ────────────────────
describe('each – stop early on object iteration', () => {
  it('returns false when callback returns false for object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const visited: string[] = [];
    const result = each(obj, (_value, key) => {
      visited.push(key as string);
      return key === 'a' ? false : undefined;
    });
    expect(result).toBe(false);
    expect(visited).toEqual(['a']);
  });

  it('returns false when callback returns false for Map', () => {
    const map = new Map([
      ['x', 10],
      ['y', 20],
    ]);
    const result = each(map, () => false);
    expect(result).toBe(false);
  });
});

// ─── every – array branch (line 24) ──────────────────────────────────────────
describe('every – array branch', () => {
  it('returns true when all array items match predicate', () => {
    expect(every([2, 4, 6], (v) => v % 2 === 0)).toBe(true);
  });

  it('returns false when some array items do not match predicate', () => {
    expect(every([2, 3, 6], (v) => v % 2 === 0)).toBe(false);
  });
});

// ─── flatten – depth === 0 branch (line 23) ───────────────────────────────────
describe('flatten – depth 0', () => {
  it('returns a shallow copy when depth is 0', () => {
    const arr = [1, [2, 3], 4];
    const result = flatten(arr, 0);
    expect(result).toEqual([1, [2, 3], 4]);
    expect(result).not.toBe(arr);
  });
});

// ─── get – null/undefined mid-path (line 24) ──────────────────────────────────
describe('get – null mid-path', () => {
  it('returns defaultValue when a path segment is null', () => {
    expect(get({ a: null }, 'a.b', 'default')).toBe('default');
  });

  it('returns defaultValue when a path segment is undefined', () => {
    expect(get({ a: undefined }, 'a.b', 42)).toBe(42);
  });
});

// ─── getGlobal – remaining branches (lines 19-25) ─────────────────────────────
// jsdom defines `self` so line 17 is always hit; we verify the function returns
// a defined value rather than trying to mock global internals.
describe('getGlobal', () => {
  it('returns a truthy global object in jsdom', () => {
    expect(getGlobal()).toBeDefined();
  });
});

// ─── has – uncovered lines 22 and 33 ──────────────────────────────────────────
describe('has – extra branches', () => {
  it('returns false when a mid-path segment is null (line 22)', () => {
    expect(has({ a: null }, 'a.b')).toBe(false);
  });

  it('returns false for empty path (line 33 fallback)', () => {
    // toPath('') returns [] → the for loop body is never entered → returns false
    expect(has({}, '')).toBe(false);
  });

  it('returns false when object is null', () => {
    expect(has(null, 'a')).toBe(false);
  });
});

// ─── intersection – empty input (line 16) ─────────────────────────────────────
describe('intersection – empty input', () => {
  it('returns [] when called with no arguments', () => {
    expect(intersection()).toEqual([]);
  });
});

// ─── isElement ────────────────────────────────────────────────────────────────
describe('isElement', () => {
  it('returns true for a DOM Element', () => {
    const div = document.createElement('div');
    expect(isElement(div)).toBe(true);
  });

  it('returns true for HTMLDocument', () => {
    expect(isElement(document)).toBe(true);
  });

  it('returns false for non-element values', () => {
    expect(isElement(null)).toBe(false);
    expect(isElement('div')).toBe(false);
    expect(isElement({ nodeType: 1 })).toBe(false);
    expect(isElement(window)).toBe(false);
  });
});

// ─── isEmpty – line 67 (for-in branch for inherited-prototype objects) ─────────
describe('isEmpty – prototype-like object', () => {
  it('returns true for an object with no own enumerable properties', () => {
    // Object.create(null) bypasses the prototype check → falls into for-in branch
    const obj = Object.create(null);
    expect(isEmpty(obj)).toBe(true);
  });

  it('returns false for an object created with Object.create(null) that has own keys', () => {
    const obj = Object.create(null) as Record<string, unknown>;
    obj.foo = 'bar';
    expect(isEmpty(obj)).toBe(false);
  });
});

// ─── isEqual – uncovered branches ─────────────────────────────────────────────
describe('isEqual – extra branches', () => {
  it('returns false when one value is falsy (line 58)', () => {
    expect(isEqual(null, { a: 1 })).toBe(false);
    expect(isEqual(0, 1)).toBe(false);
  });

  it('returns false when one value is a string (line 61)', () => {
    expect(isEqual('abc', 'def')).toBe(false);
    expect(isEqual('abc', ['a', 'b', 'c'])).toBe(false);
  });

  it('returns false for arrays of different lengths (line 65)', () => {
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('short-circuits on first differing array element (line 71)', () => {
    expect(isEqual([1, 2, 3], [1, 9, 3])).toBe(false);
  });

  it('returns false for objects with different key counts (line 80)', () => {
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('short-circuits on first differing object value (line 86)', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 9, b: 2 })).toBe(false);
  });

  it('returns false for two non-object non-array unequal primitives (line 91)', () => {
    // Both truthy, not string, not array-like, not object-like → falls to return false
    expect(isEqual(Symbol('x'), Symbol('x'))).toBe(false);
  });
});

// ─── isEqualWith ──────────────────────────────────────────────────────────────
describe('isEqualWith', () => {
  it('falls back to isEqual when fn is not a function (lines 57-58)', () => {
    expect(isEqualWith([1, 2], [1, 2], null as any)).toBe(true);
    expect(isEqualWith([1, 2], [1, 3], undefined as any)).toBe(false);
  });

  it('uses the custom comparator when provided (line 60)', () => {
    const fn = (a: any, b: any) => a.length === b.length;
    expect(isEqualWith([1, 2, 3], [4, 5, 6], fn)).toBe(true);
    expect(isEqualWith([1, 2], [4, 5, 6], fn)).toBe(false);
  });
});

// ─── isInteger – fallback branch (line 31) ────────────────────────────────────
// Number.isInteger exists in modern JS, so line 31 is the dead polyfill branch.
// We exercise it by calling the function with edge values to at minimum keep
// statement-level coverage via the native path.
describe('isInteger', () => {
  it('handles edge values', () => {
    expect(isInteger(0)).toBe(true);
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger(NaN)).toBe(false);
  });
});

// ─── isPromiseLike – function branch (line 30) ────────────────────────────────
describe('isPromiseLike – function with .then', () => {
  it('returns true for an object with a then function', () => {
    expect(isPromiseLike({ then: () => {} })).toBe(true);
  });

  it('returns true for a native Promise', () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
  });

  it('returns false for objects without then', () => {
    expect(isPromiseLike({})).toBe(false);
    expect(isPromiseLike(null)).toBe(false);
    expect(isPromiseLike(42)).toBe(false);
  });

  it('returns false for a function (line 30 – typeof obj === "function" branch)', () => {
    // A bare function has no .then
    expect(isPromiseLike(() => {})).toBe(false);
  });

  it('returns true for a function-object with .then (covers function branch)', () => {
    const fn: any = () => {};
    fn.then = () => {};
    expect(isPromiseLike(fn)).toBe(true);
  });
});

// ─── jsonClone – branch coverage (line 15) ────────────────────────────────────
describe('jsonClone', () => {
  it('deep-clones a JSON-serialisable value', () => {
    const obj = { a: 1, b: { c: [2, 3] } };
    const cloned = jsonClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });
});

// ─── pad – error branch (line 17) ─────────────────────────────────────────────
describe('pad – error branch', () => {
  it('throws for negative length', () => {
    expect(() => pad('hi', -1)).toThrow(TypeError);
  });

  it('throws for non-integer length', () => {
    expect(() => pad('hi', 2.5)).toThrow(TypeError);
  });
});

// ─── set – array-key branch (line 22) ─────────────────────────────────────────
describe('set – array index path', () => {
  it('creates nested arrays when the next segment is a number', () => {
    const obj: any = {};
    set(obj, 'items[0]', 'first');
    expect(obj.items[0]).toBe('first');
  });
});

// ─── some – array branch (line 24) ───────────────────────────────────────────
describe('some – array branch', () => {
  it('returns true when some array items match predicate', () => {
    expect(some([1, 2, 3], (v) => v > 2)).toBe(true);
  });

  it('returns false when no array items match predicate', () => {
    expect(some([1, 2, 3], (v) => v > 9)).toBe(false);
  });
});

// ─── sortBy – extra branches (lines 5, 40) ───────────────────────────────────
describe('sortBy – extra branches', () => {
  it('sorts with a function iteratee (line 5)', () => {
    const arr = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(sortBy(arr, (item) => item.n)).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]);
  });

  it('returns 0 when all criteria are equal (line 40)', () => {
    const arr = [{ a: 1 }, { a: 1 }, { a: 1 }];
    const result = sortBy(arr, 'a');
    expect(result).toEqual(arr);
  });

  it('sorts without iteratees (identity)', () => {
    expect(sortBy([3, 1, 2])).toEqual([1, 2, 3]);
  });
});

// ─── toString – null/undefined branch (line 27) ───────────────────────────────
describe('toString – null/undefined', () => {
  it('returns empty string for null', () => {
    expect(toString(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(toString(undefined)).toBe('');
  });
});

// ─── unset – extra branches (lines 20, 30, 39, 43-44) ────────────────────────
describe('unset – extra branches', () => {
  it('returns false for empty path (line 20)', () => {
    expect(unset({ a: 1 }, '')).toBe(false);
  });

  it('returns false when a mid-path segment is not an object (line 30)', () => {
    expect(unset({ a: 42 }, 'a.b')).toBe(false);
  });

  it('returns false when last key does not exist (line 39)', () => {
    expect(unset({ a: {} }, 'a.nonexistent')).toBe(false);
  });

  it('splices numeric index from an array (lines 43-44)', () => {
    const obj: any = { items: ['x', 'y', 'z'] };
    const result = unset(obj, ['items', 1]);
    expect(result).toBe(true);
    expect(obj.items).toEqual(['x', 'z']);
  });
});

// ─── unzip – empty input (line 15) ────────────────────────────────────────────
describe('unzip – empty input', () => {
  it('returns [] for an empty array', () => {
    expect(unzip([])).toEqual([]);
  });
});

// ─── zip – empty input (line 15) ──────────────────────────────────────────────
describe('zip – empty input', () => {
  it('returns [] when called with no arguments', () => {
    expect(zip()).toEqual([]);
  });
});

// ─── _internal/path – non-string path and bracket notation (lines 5, 11, 16) ──
describe('_internal/path – toPath', () => {
  it('returns a copy of the array when path is not a string (line 5)', () => {
    const arr: PropertyKey[] = ['a', 'b', 'c'];
    const result = toPath(arr);
    expect(result).toEqual(['a', 'b', 'c']);
    expect(result).not.toBe(arr);
  });

  it('returns [] for an empty string (line 11)', () => {
    expect(toPath('')).toEqual([]);
  });

  it('converts bracket notation to numeric indices (line 16)', () => {
    expect(toPath('items[0].name')).toEqual(['items', 0, 'name']);
    expect(toPath('[0][1]')).toEqual([0, 1]);
  });
});
