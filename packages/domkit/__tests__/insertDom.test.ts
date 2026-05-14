import { insertAfter, insertBefore } from '../src'

describe('insertBefore', () => {
  test('inserts a node before the reference node', () => {
    const parent = document.createElement('div')
    const first = document.createElement('span')
    const second = document.createElement('span')
    parent.appendChild(first)
    parent.appendChild(second)

    const inserted = document.createElement('strong')
    const result = insertBefore(inserted, second)

    expect(result).toBe(inserted)
    expect(parent.children[1]).toBe(inserted)
    expect(parent.children[2]).toBe(second)
  })

  test('throws when reference node has no parent', () => {
    const orphan = document.createElement('div')

    expect(() => insertBefore(document.createElement('span'), orphan)).toThrow('referenceNode must have a parentNode')
  })
})

describe('insertAfter', () => {
  test('inserts a node after the reference node', () => {
    const parent = document.createElement('div')
    const first = document.createElement('span')
    const second = document.createElement('span')
    parent.appendChild(first)
    parent.appendChild(second)

    const inserted = document.createElement('strong')
    const result = insertAfter(inserted, first)

    expect(result).toBe(inserted)
    expect(parent.children[1]).toBe(inserted)
    expect(parent.children[2]).toBe(second)
  })

  test('appends when reference node is the last child', () => {
    const parent = document.createElement('div')
    const only = document.createElement('span')
    parent.appendChild(only)

    const inserted = document.createElement('strong')
    insertAfter(inserted, only)

    expect(parent.lastChild).toBe(inserted)
  })
})
