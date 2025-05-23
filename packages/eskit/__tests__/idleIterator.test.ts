import idleIterator from '../src/idle-iterator'

describe('idleIterator', () => {
  test('should iterate over array elements', (done) => {
    const arr = [1, 2, 3, 4, 5]
    const result: number[] = []

    idleIterator(arr, (item) => {
      result.push(item)
      if (result.length === arr.length) {
        expect(result).toEqual(arr)
        done()
      }
    })
  })

  test('should handle empty array', (done) => {
    const arr: number[] = []
    let called = false

    idleIterator(arr, () => {
      called = true
    })

    setTimeout(() => {
      expect(called).toBe(false)
      done()
    }, 100)
  })

  test('should handle large arrays', (done) => {
    const arr = Array.from({ length: 1000 }, (_, i) => i)
    const result: number[] = []

    idleIterator(arr, (item) => {
      result.push(item)
      if (result.length === arr.length) {
        expect(result).toEqual(arr)
        done()
      }
    })
  })

  test('should handle different types in array', (done) => {
    const arr = ['string', 42, true, null, undefined]
    const result: any[] = []

    idleIterator(arr, (item) => {
      result.push(item)
      if (result.length === arr.length) {
        expect(result).toEqual(arr)
        done()
      }
    })
  })

  test('should handle callback errors', (done) => {
    const arr = [1, 2, 3]
    let errorCaught = false

    try {
      idleIterator(arr, () => {
        throw new Error('Test error')
      })
    } catch (e) {
      errorCaught = true
    }

    setTimeout(() => {
      expect(errorCaught).toBe(true)
      done()
    }, 100)
  })

  test('should maintain execution order', (done) => {
    const arr = [1, 2, 3, 4, 5]
    const result: number[] = []

    idleIterator(arr, (item) => {
      result.push(item)
      if (result.length === arr.length) {
        expect(result).toEqual([1, 2, 3, 4, 5])
        done()
      }
    })
  })
})
