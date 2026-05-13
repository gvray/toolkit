import { jsonClone } from '../src'

describe('jsonClone', () => {
  it('should clone an object correctly', () => {
    const inputObj = { a: 1, b: { c: 2 } }
    const clonedObj = jsonClone(inputObj)
    expect(clonedObj).toEqual(inputObj)
    expect(clonedObj).not.toBe(inputObj)
    expect(clonedObj.b).not.toBe(inputObj.b)
  })

  it('should handle cloning of primitives correctly', () => {
    let input = 'hello'
    let clonedInput = jsonClone(input)
    expect(clonedInput).toBe(input)

    input = 123 as any
    clonedInput = jsonClone(input)
    expect(clonedInput).toBe(input)

    input = null as any
    clonedInput = jsonClone(input)
    expect(clonedInput).toBe(input)
  })
})
