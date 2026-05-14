import addClass from './addClass'
import hasClass from './hasClass'
import removeClass from './removeClass'

/**
 * Toggles a class name on an element.
 *
 * @param el - The target element.
 * @param className - The class name to toggle.
 * @returns `true` when the class is present after toggling.
 *
 * @example
 * toggleClass(el, 'active')
 * // -> true
 */
const toggleClass = (el: HTMLElement | SVGElement | null | undefined, className: string): boolean => {
  if (!el || !className.trim()) {
    return false
  }

  if (hasClass(el, className)) {
    removeClass(el as HTMLElement, className)
    return false
  }

  addClass(el, className)
  return true
}

export default toggleClass
