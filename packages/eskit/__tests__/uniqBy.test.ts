import { uniqBy } from '../src'

describe('uniqBy', () => {
  it('removes duplicate items by property name', () => {
    expect(
      uniqBy(
        [
          { id: 1, name: 'A' },
          { id: 1, name: 'B' },
          { id: 2, name: 'C' }
        ],
        'id'
      )
    ).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'C' }
    ])
  })

  it('removes duplicate items by iteratee function', () => {
    expect(uniqBy(['foo', 'bar', 'baz'], (value) => value.length)).toEqual(['foo'])
  })
})
