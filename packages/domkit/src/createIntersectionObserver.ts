/**
 * Creates an `IntersectionObserver` and observes one or more targets.
 *
 * @param target - The target element or element list.
 * @param callback - The observer callback.
 * @param options - The observer options.
 * @returns The created observer.
 *
 * @example
 * createIntersectionObserver(el, (entries) => console.log(entries))
 */
const createIntersectionObserver = (
  target: Element | readonly Element[],
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const observer = new IntersectionObserver(callback, options)
  const targets = Array.isArray(target) ? target : [target]

  targets.forEach((item: Element) => observer.observe(item))

  return observer
}

export default createIntersectionObserver
