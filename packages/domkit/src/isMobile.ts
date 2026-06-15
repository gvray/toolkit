import isBrowser from './isBrowser';

/**
 * Returns `true` if the user agent indicates a mobile device.
 *
 * @example
 * isMobile() // true on phones, false on desktop
 * @since 1.0.0
 */
const isMobile = (): boolean => isBrowser() && /Mobi|Android|iPhone/i.test(navigator.userAgent);

export default isMobile;
