import { delegate, dispatchCustomEvent, onceEvent } from '../src'

describe('onceEvent', () => {
  test('fires only once', () => {
    const element = document.createElement('button')
    const handler = jest.fn()

    onceEvent(element, 'click', handler)

    element.click()
    element.click()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('cleanup removes the pending listener', () => {
    const element = document.createElement('button')
    const handler = jest.fn()

    const cleanup = onceEvent(element, 'click', handler)
    cleanup()
    element.click()

    expect(handler).not.toHaveBeenCalled()
  })
})

describe('delegate', () => {
  test('handles matching descendants', () => {
    const container = document.createElement('div')
    const button = document.createElement('button')
    button.className = 'action'
    const inner = document.createElement('span')
    button.appendChild(inner)
    container.appendChild(button)
    document.body.appendChild(container)

    const handler = jest.fn()
    const cleanup = delegate(container, 'click', '.action', handler)

    inner.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler.mock.calls[0][1]).toBe(button)

    cleanup()
    document.body.removeChild(container)
  })

  test('ignores non-matching descendants', () => {
    const container = document.createElement('div')
    const child = document.createElement('span')
    container.appendChild(child)

    const handler = jest.fn()
    delegate(container, 'click', '.action', handler)

    child.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(handler).not.toHaveBeenCalled()
  })
})

describe('dispatchCustomEvent', () => {
  test('dispatches a bubbling custom event with detail', () => {
    const element = document.createElement('div')
    const handler = jest.fn((event: CustomEvent<{ value: number }>) => event.detail)
    element.addEventListener('custom:change', handler as unknown as EventListener)

    const result = dispatchCustomEvent(element, 'custom:change', { value: 1 })

    expect(result).toBe(true)
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler.mock.calls[0][0].detail).toEqual({ value: 1 })
  })
})
