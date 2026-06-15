/**
 * Returns `true` if the code is running in a browser environment.
 *
 * @example
 * isBrowser() // true in browser, false in Node
 * @since 1.0.0
 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement === 'function';

export default isBrowser;
