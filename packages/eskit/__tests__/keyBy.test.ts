import { keyBy } from '../src'

describe('keyBy', () => {
  it('maps items by property name', () => {
    expect(
      keyBy(
        [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' }
        ],
        'id'
      )
    ).toEqual({
      '1': { id: 1, name: 'A' },
      '2': { id: 2, name: 'B' }
    })
  })

  it('uses the last matching item for the same key', () => {
    expect(
      keyBy(
        [
          { id: 1, name: 'A' },
          { id: 1, name: 'B' }
        ],
        (item) => item.id
      )
    ).toEqual({
      '1': { id: 1, name: 'B' }
    })
  })
})
