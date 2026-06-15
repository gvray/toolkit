import isBrowser from './isBrowser';

/**
 * Returns `true` if the device supports touch input.
 *
 * @example
 * isTouchDevice() // true on touchscreen devices
 * @since 1.0.0
 */
const isTouchDevice = (): boolean =>
  isBrowser() && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default isTouchDevice;
