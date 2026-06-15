import { deepClone } from '../src';

describe('deepClone', () => {
  describe('primitives', () => {
    test('number', () => expect(deepClone(42)).toBe(42));
    test('string', () => expect(deepClone('hello')).toBe('hello'));
    test('boolean', () => expect(deepClone(true)).toBe(true));
    test('null', () => expect(deepClone(null)).toBeNull());
    test('undefined', () => expect(deepClone(undefined)).toBeUndefined());
    test('symbol is returned as-is', () => {
      const sym = Symbol('s');
      expect(deepClone(sym)).toBe(sym);
    });
  });

  describe('Array', () => {
    test('returns a new array', () => {
      const arr = [1, 2, 3];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    test('nested arrays are deeply cloned', () => {
      const arr = [1, [2, [3]]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      (cloned[1] as number[])[0] = 99;
      expect((arr[1] as number[])[0]).toBe(2);
    });

    test('objects inside array are deeply cloned', () => {
      const arr = [{ a: 1 }, { b: 2 }];
      const cloned = deepClone(arr);
      cloned[0].a = 99;
      expect(arr[0].a).toBe(1);
    });
  });

  describe('Object', () => {
    test('returns a new object', () => {
      const obj = { a: 1 };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    test('nested objects are deeply cloned', () => {
      const obj = { a: { b: { c: 1 } } };
      const cloned = deepClone(obj);
      cloned.a.b.c = 99;
      expect(obj.a.b.c).toBe(1);
    });

    test('only own enumerable properties are copied', () => {
      const parent = { inherited: true };
      const obj = Object.create(parent) as { own: number; inherited: boolean };
      obj.own = 1;
      const cloned = deepClone(obj);
      expect(cloned.own).toBe(1);
      expect(cloned.inherited).toBeUndefined();
    });
  });

  describe('Date', () => {
    test('returns a new Date with the same time', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
      expect(cloned).toBeInstanceOf(Date);
    });

    test('mutating cloned Date does not affect original', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);
      cloned.setFullYear(2099);
      expect(date.getFullYear()).toBe(2024);
    });
  });

  describe('RegExp', () => {
    test('returns a new RegExp with same source and flags', () => {
      const re = /test/gi;
      const cloned = deepClone(re);
      expect(cloned).toEqual(re);
      expect(cloned).not.toBe(re);
      expect(cloned.source).toBe('test');
      expect(cloned.flags).toBe('gi');
    });
  });

  describe('Function', () => {
    test('functions are returned as-is (same reference)', () => {
      const fn = (x: number) => x * 2;
      const cloned = deepClone(fn);
      expect(cloned).toBe(fn);
      expect(cloned(3)).toBe(6);
    });

    test('function inside object is preserved', () => {
      const obj = { fn: () => 'hello' };
      const cloned = deepClone(obj);
      expect(cloned.fn).toBe(obj.fn);
      expect(cloned.fn()).toBe('hello');
    });
  });

  describe('Map', () => {
    test('returns a new Map with same entries', () => {
      const map = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      const cloned = deepClone(map);
      expect(cloned).toEqual(map);
      expect(cloned).not.toBe(map);
      expect(cloned).toBeInstanceOf(Map);
    });

    test('values inside Map are deeply cloned', () => {
      const inner = { x: 1 };
      const map = new Map([['key', inner]]);
      const cloned = deepClone(map);
      cloned.get('key')!.x = 99;
      expect(inner.x).toBe(1);
    });

    test('object keys in Map are deeply cloned', () => {
      const key = { id: 1 };
      const map = new Map([[key, 'value']]);
      const cloned = deepClone(map);
      const clonedKey = [...cloned.keys()][0];
      expect(clonedKey).not.toBe(key);
      expect(clonedKey).toEqual(key);
    });

    test('nested Map is deeply cloned', () => {
      const map = new Map([['inner', new Map([['a', 1]])]]);
      const cloned = deepClone(map);
      cloned.get('inner')!.set('a', 99);
      expect(map.get('inner')!.get('a')).toBe(1);
    });
  });

  describe('Set', () => {
    test('returns a new Set with same values', () => {
      const set = new Set([1, 2, 3]);
      const cloned = deepClone(set);
      expect(cloned).toEqual(set);
      expect(cloned).not.toBe(set);
      expect(cloned).toBeInstanceOf(Set);
    });

    test('objects inside Set are deeply cloned', () => {
      const inner = { x: 1 };
      const set = new Set([inner]);
      const cloned = deepClone(set);
      const clonedInner = [...cloned][0] as typeof inner;
      clonedInner.x = 99;
      expect(inner.x).toBe(1);
    });

    test('nested Set is deeply cloned', () => {
      const inner = new Set([1, 2]);
      const set = new Set([inner]);
      const cloned = deepClone(set);
      const clonedInner = [...cloned][0] as Set<number>;
      expect(clonedInner).not.toBe(inner);
      expect(clonedInner).toEqual(inner);
    });
  });

  describe('Error', () => {
    test('returns a new Error with same message and name', () => {
      const err = new Error('oops');
      const cloned = deepClone(err);
      expect(cloned).not.toBe(err);
      expect(cloned).toBeInstanceOf(Error);
      expect(cloned.message).toBe('oops');
      expect(cloned.name).toBe('Error');
    });

    test('TypeError is cloned with correct name', () => {
      const err = new TypeError('bad type');
      const cloned = deepClone(err);
      expect(cloned).toBeInstanceOf(TypeError);
      expect(cloned.message).toBe('bad type');
      expect(cloned.name).toBe('TypeError');
    });

    test('RangeError is cloned', () => {
      const err = new RangeError('out of range');
      const cloned = deepClone(err);
      expect(cloned).toBeInstanceOf(RangeError);
      expect(cloned.message).toBe('out of range');
    });
  });

  describe('circular references', () => {
    test('object with self-reference', () => {
      const obj: any = { a: 1 };
      obj.self = obj;
      const cloned = deepClone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.self).toBe(cloned);
    });

    test('array with self-reference', () => {
      const arr: any[] = [1, 2];
      arr.push(arr);
      const cloned = deepClone(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[2]).toBe(cloned);
    });

    test('Map with self-referencing value', () => {
      const map: Map<string, any> = new Map();
      map.set('self', map);
      const cloned = deepClone(map);
      expect(cloned).not.toBe(map);
      expect(cloned.get('self')).toBe(cloned);
    });

    test('Set with self-reference', () => {
      const set: Set<any> = new Set();
      set.add(set);
      const cloned = deepClone(set);
      expect(cloned).not.toBe(set);
      expect([...cloned][0]).toBe(cloned);
    });
  });

  describe('Symbol keys', () => {
    test('symbol key is copied to cloned object', () => {
      const sym = Symbol('id');
      const obj = { [sym]: 42, name: 'test' };
      const cloned = deepClone(obj);
      expect(cloned[sym]).toBe(42);
      expect(cloned.name).toBe('test');
    });

    test('cloned object is independent from original on symbol key', () => {
      const sym = Symbol('data');
      const inner = { x: 1 };
      const obj = { [sym]: inner };
      const cloned = deepClone(obj);
      cloned[sym].x = 99;
      expect(inner.x).toBe(1);
    });

    test('multiple symbol keys are all copied', () => {
      const s1 = Symbol('a');
      const s2 = Symbol('b');
      const obj = { [s1]: 1, [s2]: 2 };
      const cloned = deepClone(obj);
      expect(cloned[s1]).toBe(1);
      expect(cloned[s2]).toBe(2);
    });
  });

  describe('mixed / complex structures', () => {
    test('object containing all supported types', () => {
      const original = {
        num: 1,
        str: 'hello',
        bool: true,
        nil: null,
        arr: [1, 2, 3],
        nested: { a: { b: 2 } },
        date: new Date('2024-01-01'),
        re: /foo/i,
        map: new Map([['k', { v: 1 }]]),
        set: new Set([{ id: 1 }]),
        err: new Error('fail'),
        fn: () => 42,
      };
      const cloned = deepClone(original);

      expect(cloned).not.toBe(original);
      expect(cloned.arr).not.toBe(original.arr);
      expect(cloned.nested).not.toBe(original.nested);
      expect(cloned.date).not.toBe(original.date);
      expect(cloned.date).toEqual(original.date);
      expect(cloned.re).not.toBe(original.re);
      expect(cloned.map).not.toBe(original.map);
      expect(cloned.set).not.toBe(original.set);
      expect(cloned.err).not.toBe(original.err);
      expect(cloned.fn).toBe(original.fn);
    });

    test('deeply nested structure mutation does not affect original', () => {
      const original = { a: { b: { c: { d: [1, 2, 3] } } } };
      const cloned = deepClone(original);
      cloned.a.b.c.d.push(99);
      expect(original.a.b.c.d).toEqual([1, 2, 3]);
    });
  });
});
