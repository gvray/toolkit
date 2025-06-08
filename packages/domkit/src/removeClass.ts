/**
 * Remove a class from an element.
 *
 * @param el - The target element.
 * @param className - The class name to remove.
 *
 * @example
 * // Removes the class "active" from an element with the "target" ID.
 * const target = document.getElementById('target');
 * removeClass(target, 'active');
 */
const removeClass = (el: HTMLElement, className: string): void => {
  if (!el || !className) {
    return
  }

  // 处理多个类名的字符串，用空格分割
  const classesToRemove = className.split(/\s+/).filter(Boolean)

  if (el.classList && el.classList.remove) {
    classesToRemove.forEach((cls) => el.classList.remove(cls))
  } else {
    let currentClassName = el.className
    classesToRemove.forEach((cls) => {
      const reg = new RegExp(`(^|\\s)${cls}(\\s|$)`, 'g')
      currentClassName = currentClassName.replace(reg, ' ')
    })
    el.className = currentClassName.replace(/\s+/g, ' ').trim()
  }
}

export default removeClass
