/**
 * Creates a `MutationObserver` and observes a target element.
 *
 * @param target - The target element.
 * @param callback - The observer callback.
 * @param options - The observer options.
 * @returns The created observer.
 *
 * @example
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * const obs = createMutationObserver(el, (mutations) => console.log(mutations))
 * console.log(obs instanceof MutationObserver)
 *
 * @since 1.0.0
 */
const createMutationObserver = (
  target: Node,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true }
): MutationObserver => {
  const observer = new MutationObserver(callback);
  observer.observe(target, options);
  return observer;
};

export default createMutationObserver;
