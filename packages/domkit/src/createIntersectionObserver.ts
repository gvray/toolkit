/**
 * Creates an `IntersectionObserver` and observes one or more targets.
 *
 * @param target - The target element or element list.
 * @param callback - The observer callback.
 * @param options - The observer options.
 * @returns The created observer.
 *
 * @example
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * const obs = createIntersectionObserver(el, (entries) => console.log(entries))
 * console.log(obs instanceof IntersectionObserver)
 *
 * @since 1.0.0
 */
const createIntersectionObserver = (
  target: Element | readonly Element[],
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const observer = new IntersectionObserver(callback, options);
  const targets = Array.isArray(target) ? target : [target];

  targets.forEach((item: Element) => observer.observe(item));

  return observer;
};

export default createIntersectionObserver;
