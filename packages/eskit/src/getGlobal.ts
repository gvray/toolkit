/**
 * Returns the global object for the current runtime environment.
 * 返回当前运行时环境的全局对象。
 *
 * @returns The global object (window, self, global, or globalThis) / 全局对象
 * @throws Error if the global object cannot be located / 如果无法定位全局对象则抛出错误
 *
 * @example
 * ```typescript
 * const g = getGlobal()
 * typeof g // => 'object'
 * g === globalThis // => true
 * ```
 *
 * @since 1.0.0
 */
const getGlobal = (): unknown => {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
};

export default getGlobal;
