import isBrowser from './isBrowser';
import isMobile from './isMobile';
import isTablet from './isTablet';

/**
 * Returns `true` if the environment is a browser and the device is not mobile or tablet.
 *
 * @example
 * isDesktop() // true on a laptop or desktop computer
 * @since 1.0.0
 */
const isDesktop = (): boolean => isBrowser() && !isMobile() && !isTablet();

export default isDesktop;
