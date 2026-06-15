/**
 * Checks if the current browser is Internet Explorer (IE).
 * @returns {boolean} Returns `true` if the browser is IE; otherwise, returns `false`.
 * @example
 * isIE() // => false in modern browsers
 *
 * @since 1.0.0
 */
const isIE = (): boolean => {
  const ua: string = window.navigator.userAgent;
  const msie: number = ua.indexOf('MSIE '); // IE 10 and below
  const trident: number = ua.indexOf('Trident/'); // IE 11

  return msie > -1 || trident > -1;
};

export default isIE;
