import { clone } from '../src';

describe('clone', () => {
  describe('primitives', () => {
    test('number', () => expect(clone(42)).toBe(42));
    test('string', () => expect(clone('hello')).toBe('hello'));
    test('boolean', () => expect(clone(false)).toBe(false));
    test('null', () => expect(clone(null)).toBeNull());
    test('undefined', () => expect(clone(undefined)).toBeUndefined());
  });

  describe('Array', () => {
    test('returns a new array', () => {
      const arr = [1, 2, 3];
      const cloned = clone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    test('top-level elements are copied', () => {
      const arr = [1, 2, 3];
      const cloned = clone(arr);
      cloned[0] = 99;
      expect(arr[0]).toBe(1);
    });

    test('nested objects share the same reference', () => {
      const inner = { x: 1 };
      const arr = [inner];
      const cloned = clone(arr);
      expect(cloned[0]).toBe(inner);
    });
  });

  describe('Object', () => {
    test('returns a new object', () => {
      const obj = { a: 1 };
      const cloned = clone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    test('top-level properties are copied', () => {
      const obj = { a: 1, b: 2 };
      const cloned = clone(obj);
      cloned.a = 99;
      expect(obj.a).toBe(1);
    });

    test('nested objects share the same reference', () => {
      const inner = { x: 1 };
      const obj = { inner };
      const cloned = clone(obj);
      expect(cloned.inner).toBe(inner);
      cloned.inner.x = 99;
      expect(inner.x).toBe(99);
    });

    test('symbol keys are copied', () => {
      const sym = Symbol('id');
      const obj = { [sym]: 42, name: 'test' };
      const cloned = clone(obj);
      expect(cloned[sym]).toBe(42);
      expect(cloned.name).toBe('test');
    });
  });
});
