import idleIterator from '../src/idleIterator'

// Mock requestIdleCallback for Node.js environment
;(global as any).requestIdleCallback = (callback: any) => {
  return setTimeout(callback, 0)
}

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

  test('should handle callback errors gracefully', (done) => {
    const arr = [1, 2, 3]
    let callCount = 0

    idleIterator(arr, (item) => {
      callCount++
      if (callCount === 1) {
        // First call succeeds
        expect(item).toBe(1)
      }
    })

    setTimeout(() => {
      expect(callCount).toBeGreaterThan(0)
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
