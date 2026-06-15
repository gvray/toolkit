/**
 * Creates a `ResizeObserver` and observes one or more targets.
 *
 * @param target - The target element or element list.
 * @param callback - The observer callback.
 * @returns The created observer.
 *
 * @example
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * const obs = createResizeObserver(el, (entries) => console.log(entries))
 * console.log(obs instanceof ResizeObserver)
 *
 * @since 1.0.0
 */
const createResizeObserver = (
  target: Element | readonly Element[],
  callback: ResizeObserverCallback
): ResizeObserver => {
  const observer = new ResizeObserver(callback);
  const targets = Array.isArray(target) ? target : [target];

  targets.forEach((item: Element) => observer.observe(item));

  return observer;
};

export default createResizeObserver;
