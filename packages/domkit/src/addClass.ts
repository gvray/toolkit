import getClass from './getClass'
import setClass from './setClass'
/**
 * Adds one or more classes to an element's class attribute, excluding classes that already exist, including SVG elements.
 *
 * @param el - The element to add class names to
 * @param classes - One or more classes to add to the element, passing one or multiple class names in each argument
 *
 * @example
 * const el = document.querySelector('.example-class')!;
 * addClass(el, 'new-class-1', 'new-class-2', 'example-class');
 *
 * @since 1.0.0
 */
const addClass = (el: HTMLElement | SVGElement | null | undefined, ...classes: string[]): void => {
  if (!el || classes.length === 0) {
    return
  }

  // 处理多个类名的字符串，用空格分割并过滤空字符串
  const allClasses = classes.join(' ').split(/\s+/).filter(Boolean)

  const currentClassList = getClass(el).split(/\s+/).filter(Boolean)
  const filteredClassNames = [...new Set(allClasses)].filter((className) => !currentClassList.includes(className))
  const newClassList = [...currentClassList, ...filteredClassNames].filter(Boolean)
  setClass(el, newClassList.join(' '))
}

export default addClass
