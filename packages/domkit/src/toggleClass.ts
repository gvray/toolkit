import addClass from './addClass';
import hasClass from './hasClass';
import removeClass from './removeClass';

/**
 * Toggles a class name on an element.
 *
 * @param el - The target element.
 * @param className - The class name to toggle.
 * @param force - If `true`, always add the class; if `false`, always remove it.
 * @returns `true` when the class is present after toggling.
 *
 * @example
 * toggleClass(el, 'active')
 * // => true
 *
 * @example
 * toggleClass(el, 'active', true)
 * // => true
 *
 * @since 1.0.0
 */
const toggleClass = (
  el: HTMLElement | SVGElement | null | undefined,
  className: string,
  force?: boolean
): boolean => {
  if (!el || !className.trim()) {
    return false;
  }

  const present = hasClass(el, className);

  if (force === true) {
    if (!present) {
      addClass(el, className);
    }
    return true;
  }

  if (force === false) {
    if (present) {
      removeClass(el as HTMLElement, className);
    }
    return false;
  }

  if (present) {
    removeClass(el as HTMLElement, className);
    return false;
  }

  addClass(el, className);
  return true;
};

export default toggleClass;
