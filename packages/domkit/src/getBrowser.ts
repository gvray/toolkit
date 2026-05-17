/**
 * Enumerated type representing browser names.
 * Each value corresponds to a specific browser.
 */
export enum BrowserName {
  CHROME = 'Chrome',
  FIREFOX = 'Firefox',
  EDGE = 'Edge',
  SAFARI = 'Safari',
  OPERA = 'Opera',
  UNKNOWN = 'Unknown'
}

/**
 * Gets the name of the current user's web browser.
 * @experimental
 * @returns {BrowserName} An enumerated value representing the current browser.
 * @deprecated Use getBrowser from @gvray/envkit
 *
 * @example
 * const browser: BrowserName = getBrowser();
 * console.log(`Your browser is: ${browser}`);
 *
 */
const getBrowser = (): BrowserName => {
  const ua = window.navigator.userAgent.toLowerCase()
  switch (true) {
    case ua.includes('edg'):
      return BrowserName.EDGE
    case ua.includes('opera') || ua.includes('opr'):
      return BrowserName.OPERA
    case ua.includes('chrome'):
      return BrowserName.CHROME
    case ua.includes('firefox'):
      return BrowserName.FIREFOX
    case ua.includes('safari'):
      return BrowserName.SAFARI
    default:
      return BrowserName.UNKNOWN
  }
}

export default getBrowser
