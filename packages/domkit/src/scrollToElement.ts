import scrollTo from './scrollTo';

/**
 * Scrolls the page so the target element enters the viewport.
 *
 * @param target - The target element.
 * @param options - Optional scroll options.
 * @returns `true` when the element could be scrolled into view.
 *
 * @example
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * scrollToElement(el) // => true
 *
 * @since 1.0.0
 */
const scrollToElement = (
  target: Element | null | undefined,
  options: { behavior?: 'auto' | 'smooth'; offsetTop?: number } = {}
): boolean => {
  if (!target) {
    return false;
  }

  const { behavior = 'smooth', offsetTop = 0 } = options;
  const rect = target.getBoundingClientRect();
  const top = rect.top + window.pageYOffset - offsetTop;

  scrollTo({
    x: window.pageXOffset,
    y: top,
    behavior,
  });

  return true;
};

export default scrollToElement;
