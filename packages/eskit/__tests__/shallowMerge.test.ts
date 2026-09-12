import { shallowMerge } from '../src';

describe('shallowMerge', () => {
  it('merges top-level properties', () => {
    expect(shallowMerge({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('shallow-merges nested plain objects', () => {
    expect(shallowMerge({ a: 1, b: { c: 1 } }, { b: { d: 2 } })).toEqual({
      a: 1,
      b: { c: 1, d: 2 },
    });
  });

  it('replaces arrays instead of merging', () => {
    expect(shallowMerge({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] });
  });

  it('ignores non-object sources', () => {
    expect(shallowMerge({ a: 1 }, null)).toEqual({ a: 1 });
    expect(shallowMerge({ a: 1 }, [1, 2])).toEqual({ a: 1 });
  });

  it('does not mutate target', () => {
    const target = { a: 1, b: { c: 1 } };
    const result = shallowMerge(target, { b: { d: 2 } });
    expect(target).toEqual({ a: 1, b: { c: 1 } });
    expect(result).not.toBe(target);
  });
});
