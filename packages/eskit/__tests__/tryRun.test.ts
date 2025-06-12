import tryRun from '../src/tryRun'

describe('tryRun', () => {
  // Synchronous function tests
  it('should return the result when synchronous function executes successfully', async () => {
    const result = await tryRun(() => 42)
    expect(result).toBe(42)
  })

  it('should return the result of complex calculations', async () => {
    const result = await tryRun(() => {
      const a = 10
      const b = 20
      return a + b * 2
    })
    expect(result).toBe(50)
  })

  it('should return parsed JSON when valid JSON string is provided', async () => {
    const jsonString = '{"name": "test", "value": 123}'
    const result = await tryRun(() => JSON.parse(jsonString))
    expect(result).toEqual({ name: 'test', value: 123 })
  })

  it('should return null when synchronous function throws an error', async () => {
    const result = await tryRun(() => {
      throw new Error('Something went wrong')
    })
    expect(result).toBe(null)
  })

  it('should return null when JSON parsing fails', async () => {
    const result = await tryRun(() => JSON.parse('invalid json'))
    expect(result).toBe(null)
  })

  it('should return null when accessing undefined property', async () => {
    const result = await tryRun(() => {
      const obj: any = null
      return obj.property.nested
    })
    expect(result).toBe(null)
  })

  it('should handle synchronous functions returning different types', async () => {
    // String return type
    const stringResult = await tryRun(() => 'hello world')
    expect(stringResult).toBe('hello world')

    // Boolean return type
    const boolResult = await tryRun(() => true)
    expect(boolResult).toBe(true)

    // Object return type
    const objResult = await tryRun(() => ({ key: 'value' }))
    expect(objResult).toEqual({ key: 'value' })

    // Array return type
    const arrResult = await tryRun(() => [1, 2, 3])
    expect(arrResult).toEqual([1, 2, 3])
  })

  // Asynchronous function tests
  it('should handle async functions successfully', async () => {
    const result = await tryRun(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      return 'async result'
    })
    expect(result).toBe('async result')
  })

  it('should handle async functions with complex operations', async () => {
    const result = await tryRun(async () => {
      const data = await new Promise<number>((resolve) => {
        setTimeout(() => resolve(100), 10)
      })
      return data * 2
    })
    expect(result).toBe(200)
  })

  it('should return null when async function throws an error', async () => {
    const result = await tryRun(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      throw new Error('Async error')
    })
    expect(result).toBe(null)
  })

  it('should handle async functions returning different types', async () => {
    // Async string return
    const stringResult = await tryRun(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5))
      return 'async string'
    })
    expect(stringResult).toBe('async string')

    // Async object return
    const objResult = await tryRun(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5))
      return { async: true }
    })
    expect(objResult).toEqual({ async: true })
  })

  it('should handle nested async operations', async () => {
    const result = await tryRun(async () => {
      const step1 = await new Promise<number>((resolve) => {
        setTimeout(() => resolve(10), 5)
      })

      const step2 = await new Promise<number>((resolve) => {
        setTimeout(() => resolve(step1 * 2), 5)
      })

      return step2 + 5
    })
    expect(result).toBe(25)
  })

  it('should handle Promise rejection in async functions', async () => {
    const result = await tryRun(async () => {
      await Promise.reject(new Error('Promise rejected'))
      return 'should not reach here'
    })
    expect(result).toBe(null)
  })

  // Mixed synchronous function returning Promise
  it('should handle synchronous function returning Promise', async () => {
    const result = await tryRun(() => Promise.resolve('sync returning promise'))
    expect(result).toBe('sync returning promise')
  })

  it('should handle synchronous function returning rejected Promise', async () => {
    const result = await tryRun(() => Promise.reject(new Error('sync returning rejected promise')))
    expect(result).toBe(null)
  })

  // Edge cases
  it('should handle functions with no return value (undefined)', async () => {
    const result = await tryRun(() => {
      // Function that doesn't explicitly return anything
      console.log('side effect')
    })
    expect(result).toBeUndefined()
  })

  it('should handle async functions with no return value', async () => {
    const result = await tryRun(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5))
      // No explicit return
    })
    expect(result).toBeUndefined()
  })

  it('should handle edge cases with falsy values', async () => {
    // Should return 0, not null
    const zeroResult = await tryRun(() => 0)
    expect(zeroResult).toBe(0)

    // Should return empty string, not null
    const emptyStringResult = await tryRun(() => '')
    expect(emptyStringResult).toBe('')

    // Should return false, not null
    const falseResult = await tryRun(() => false)
    expect(falseResult).toBe(false)

    // Should return null when explicitly returned
    const nullResult = await tryRun(() => null)
    expect(nullResult).toBe(null)

    // Async falsy values
    const asyncZero = await tryRun(async () => 0)
    expect(asyncZero).toBe(0)

    const asyncEmpty = await tryRun(async () => '')
    expect(asyncEmpty).toBe('')

    const asyncFalse = await tryRun(async () => false)
    expect(asyncFalse).toBe(false)
  })

  it('should handle type inference correctly', async () => {
    // TypeScript should infer the correct types
    const numberResult: number | null = await tryRun(() => 123)
    const stringResult: string | null = await tryRun(() => 'test')
    const objectResult: { id: number } | null = await tryRun(() => ({ id: 1 }))

    expect(typeof numberResult).toBe('number')
    expect(typeof stringResult).toBe('string')
    expect(typeof objectResult).toBe('object')

    // Async type inference
    const asyncResult: { data: string } | null = await tryRun(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5))
      return { data: 'async data' }
    })
    expect(asyncResult).toEqual({ data: 'async data' })
  })
})
