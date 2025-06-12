import tryRunSync from '../src/tryRunSync'

describe('tryRunSync', () => {
  it('should execute synchronous function and return result', () => {
    const result = tryRunSync(() => {
      return 'sync result'
    })

    expect(result).toBe('sync result')
  })

  it('should return null when function throws an error', () => {
    const result = tryRunSync(() => {
      throw new Error('Operation failed')
    })

    expect(result).toBe(null)
  })

  it('should handle different return types', () => {
    // Number return type
    const numberResult = tryRunSync(() => 42)
    expect(numberResult).toBe(42)

    // Object return type
    const objectResult = tryRunSync(() => ({ id: 1, name: 'test' }))
    expect(objectResult).toEqual({ id: 1, name: 'test' })

    // Array return type
    const arrayResult = tryRunSync(() => [1, 2, 3])
    expect(arrayResult).toEqual([1, 2, 3])

    // Boolean return type
    const booleanResult = tryRunSync(() => true)
    expect(booleanResult).toBe(true)

    // String return type
    const stringResult = tryRunSync(() => 'hello world')
    expect(stringResult).toBe('hello world')
  })

  it('should handle JSON parsing operations', () => {
    // Valid JSON
    const validResult = tryRunSync(() => {
      return JSON.parse('{"name": "test", "value": 42}')
    })
    expect(validResult).toEqual({ name: 'test', value: 42 })

    // Invalid JSON
    const invalidResult = tryRunSync(() => {
      return JSON.parse('invalid json')
    })
    expect(invalidResult).toBe(null)
  })

  it('should handle complex synchronous operations', () => {
    const result = tryRunSync(() => {
      const data = JSON.parse('{"values": [1, 2, 3, 4, 5]}')
      return data.values
        .filter((n: number) => n % 2 === 0)
        .map((n: number) => n * 2)
        .reduce((sum: number, n: number) => sum + n, 0)
    })

    expect(result).toBe(12) // [2, 4] -> [4, 8] -> 12
  })

  it('should handle error in complex operations', () => {
    const result = tryRunSync(() => {
      const data = JSON.parse('invalid json')
      return data.values.reduce((sum: number, val: number) => sum + val, 0)
    })

    expect(result).toBe(null)
  })

  it('should handle functions returning falsy values', () => {
    const zeroResult = tryRunSync(() => 0)
    expect(zeroResult).toBe(0)

    const emptyStringResult = tryRunSync(() => '')
    expect(emptyStringResult).toBe('')

    const falseResult = tryRunSync(() => false)
    expect(falseResult).toBe(false)

    const nullResult = tryRunSync(() => null)
    expect(nullResult).toBe(null)

    const undefinedResult = tryRunSync(() => undefined)
    expect(undefinedResult).toBeUndefined()
  })

  it('should handle custom error types', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message)
        this.name = 'CustomError'
      }
    }

    const result = tryRunSync(() => {
      throw new CustomError('Custom error message')
    })

    expect(result).toBe(null)
  })

  it('should handle functions with no explicit return', () => {
    const result = tryRunSync(() => {
      // No explicit return
    })

    expect(result).toBeUndefined()
  })

  it('should handle type inference correctly', () => {
    const typedResult = tryRunSync((): { data: string; count: number } => {
      return { data: 'test', count: 42 }
    })

    expect(typedResult).toEqual({ data: 'test', count: 42 })
    if (typedResult) {
      expect(typeof typedResult.data).toBe('string')
      expect(typeof typedResult.count).toBe('number')
    }
  })

  it('should handle mathematical operations', () => {
    const divisionResult = tryRunSync(() => {
      return 10 / 2
    })
    expect(divisionResult).toBe(5)

    const divisionByZero = tryRunSync(() => {
      return 10 / 0
    })
    expect(divisionByZero).toBe(Infinity)

    const invalidMath = tryRunSync(() => {
      const value = parseInt('not a number')
      if (isNaN(value)) {
        throw new Error('Invalid number')
      }
      return value
    })
    expect(invalidMath).toBe(null)
  })

  it('should handle array operations', () => {
    const arrayResult = tryRunSync(() => {
      const arr = [1, 2, 3, 4, 5]
      return arr
        .filter((x) => x > 2)
        .map((x) => x * x)
        .reduce((sum, x) => sum + x, 0)
    })
    expect(arrayResult).toBe(50) // [3, 4, 5] -> [9, 16, 25] -> 50

    const arrayError = tryRunSync(() => {
      const arr: any = null
      return arr.map((x: any) => x * 2)
    })
    expect(arrayError).toBe(null)
  })

  it('should handle object property access', () => {
    const successResult = tryRunSync(() => {
      const obj = { nested: { value: 'found' } }
      return obj.nested.value
    })
    expect(successResult).toBe('found')

    const errorResult = tryRunSync(() => {
      const obj: any = null
      return obj.nested.value
    })
    expect(errorResult).toBe(null)
  })

  it('should handle function calls within function', () => {
    const helperFunction = (x: number) => {
      if (x < 0) throw new Error('Negative number')
      return x * 2
    }

    const successResult = tryRunSync(() => {
      return helperFunction(5)
    })
    expect(successResult).toBe(10)

    const errorResult = tryRunSync(() => {
      return helperFunction(-1)
    })
    expect(errorResult).toBe(null)
  })

  it('should handle class instantiation', () => {
    class TestClass {
      constructor(public value: number) {
        if (value < 0) {
          throw new Error('Value must be positive')
        }
      }

      getValue() {
        return this.value * 2
      }
    }

    const successResult = tryRunSync(() => {
      const instance = new TestClass(5)
      return instance.getValue()
    })
    expect(successResult).toBe(10)

    const errorResult = tryRunSync(() => {
      const instance = new TestClass(-1)
      return instance.getValue()
    })
    expect(errorResult).toBe(null)
  })

  it('should handle regex operations', () => {
    const validRegex = tryRunSync(() => {
      const text = 'hello@example.com'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(text)
    })
    expect(validRegex).toBe(true)

    const invalidRegex = tryRunSync(() => {
      const pattern = '[invalid regex'
      return new RegExp(pattern)
    })
    expect(invalidRegex).toBe(null)
  })
})
