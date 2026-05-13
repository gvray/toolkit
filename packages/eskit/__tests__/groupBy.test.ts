import { groupBy } from '../src'

describe('groupBy', () => {
  it('groups items by property name', () => {
    expect(
      groupBy(
        [
          { type: 'a', value: 1 },
          { type: 'b', value: 2 },
          { type: 'a', value: 3 }
        ],
        'type'
      )
    ).toEqual({
      a: [
        { type: 'a', value: 1 },
        { type: 'a', value: 3 }
      ],
      b: [{ type: 'b', value: 2 }]
    })
  })

  it('groups items by iteratee function', () => {
    expect(groupBy([1, 2, 3, 4], (value) => (value % 2 === 0 ? 'even' : 'odd'))).toEqual({
      even: [2, 4],
      odd: [1, 3]
    })
  })
})
