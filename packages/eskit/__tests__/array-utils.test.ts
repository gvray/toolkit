import { intersection, sortBy, union } from '../src'

describe('array utilities', () => {
  it('sortBy sorts by property name', () => {
    expect(sortBy([{ age: 2 }, { age: 1 }], 'age')).toEqual([{ age: 1 }, { age: 2 }])
  })

  it('sortBy sorts by multiple criteria', () => {
    expect(
      sortBy(
        [
          { group: 'b', age: 1 },
          { group: 'a', age: 2 },
          { group: 'a', age: 1 }
        ],
        'group',
        'age'
      )
    ).toEqual([
      { group: 'a', age: 1 },
      { group: 'a', age: 2 },
      { group: 'b', age: 1 }
    ])
  })

  it('union merges arrays and removes duplicates', () => {
    expect(union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4])
  })

  it('intersection returns shared items', () => {
    expect(intersection([1, 2, 3], [2, 3, 4], [0, 2, 3])).toEqual([2, 3])
  })
})
