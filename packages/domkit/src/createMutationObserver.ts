/**
 * Creates a `MutationObserver` and observes a target element.
 *
 * @param target - The target element.
 * @param callback - The observer callback.
 * @param options - The observer options.
 * @returns The created observer.
 *
 * @example
 * createMutationObserver(el, (mutations) => console.log(mutations))
 */
const createMutationObserver = (
  target: Node,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true }
): MutationObserver => {
  const observer = new MutationObserver(callback)
  observer.observe(target, options)
  return observer
}

export default createMutationObserver
