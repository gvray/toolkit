type ElementSizeMode = 'border' | 'padding'

/**
 * Returns the size of an element.
 *
 * @param element - The target element.
 * @param mode - Whether to measure `border` or `padding` box size.
 * @returns The element width and height.
 *
 * @example
 * getElementSize(el)
 * // -> { width: 200, height: 100 }
 */
const getElementSize = (element: Element, mode: ElementSizeMode = 'border'): { width: number; height: number } => {
  const rect = element.getBoundingClientRect()

  if (mode === 'border') {
    return {
      width: rect.width,
      height: rect.height
    }
  }

  if (element instanceof HTMLElement) {
    const styles = window.getComputedStyle(element)
    const borderLeft = parseFloat(styles.borderLeftWidth || '0') || 0
    const borderRight = parseFloat(styles.borderRightWidth || '0') || 0
    const borderTop = parseFloat(styles.borderTopWidth || '0') || 0
    const borderBottom = parseFloat(styles.borderBottomWidth || '0') || 0

    return {
      width: Math.max(0, rect.width - borderLeft - borderRight),
      height: Math.max(0, rect.height - borderTop - borderBottom)
    }
  }

  return {
    width: rect.width,
    height: rect.height
  }
}

export default getElementSize
