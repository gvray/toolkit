import isBrowser from './isBrowser';

/**
 * Returns `true` if the user agent indicates a tablet device.
 *
 * @example
 * isTablet() // true on iPad or Android tablet
 * @since 1.0.0
 */
const isTablet = (): boolean => isBrowser() && /iPad|Tablet/i.test(navigator.userAgent);

export default isTablet;
