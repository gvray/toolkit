/**
 * Returns the global object for the current runtime environment.
 * 返回当前运行时环境的全局对象。
 *
 * @returns The global object (window, self, global, or globalThis) / 全局对象
 * @throws Error if the global object cannot be located / 如果无法定位全局对象则抛出错误
 *
 * @example
 * ```typescript
 * const globalObj = getGlobal()
 *
 * // Check runtime environment
 * if (typeof (globalObj as any).process === 'object') {
 *   console.log('Running in Node.js')
 * } else if (typeof (globalObj as any).window === 'object') {
 *   console.log('Running in browser')
 * } else if (typeof (globalObj as any).self === 'object') {
 *   console.log('Running in Web Worker')
 * }
 *
 * // Access global variables safely
 * const global = getGlobal() as any
 * if (global.localStorage) {
 *   global.localStorage.setItem('key', 'value')
 * }
 *
 * // Works in different environments:
 * // - Browser: returns window
 * // - Web Worker: returns self
 * // - Node.js: returns global
 * // - Modern environments: returns globalThis
 * ```
 *
 * @since 1.0.0
 */
const getGlobal = (): unknown => {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}

export default getGlobal
