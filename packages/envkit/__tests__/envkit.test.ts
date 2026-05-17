import { canUseDom, getBrowser, getPlatform, isBrowser, isNode, isSSR, supportsWorker } from '../src'

describe('envkit', () => {
  it('runtime flags in node', () => {
    expect(isNode()).toBe(true)
    expect(isSSR()).toBe(true)
    expect(isBrowser()).toBe(false)
    expect(canUseDom()).toBe(false)
  })

  it('browser helpers return strings', () => {
    expect(typeof getBrowser()).toBe('string')
    expect(typeof getPlatform()).toBe('string')
    expect(typeof supportsWorker()).toBe('boolean')
  })
})
