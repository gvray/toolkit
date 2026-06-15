import isBrowser from './isBrowser';

/**
 * Returns `true` if the DOM is available (browser with a functional document).
 *
 * @example
 * canUseDom() // true in browser environments
 * @since 1.0.0
 */
const canUseDom = (): boolean => isBrowser() && typeof document.createElement === 'function';

export default canUseDom;
