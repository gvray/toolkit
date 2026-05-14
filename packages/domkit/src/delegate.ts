/**
 * Adds a delegated event listener to a container.
 *
 * @param container - The container element.
 * @param event - The event name.
 * @param selector - The selector to match.
 * @param handler - The delegated handler.
 * @returns A cleanup function.
 *
 * @example
 * delegate(list, 'click', 'li', (event, target) => console.log(target))
 */
const delegate = <K extends keyof GlobalEventHandlersEventMap>(
  container: Element,
  event: K,
  selector: string,
  handler: (event: GlobalEventHandlersEventMap[K], target: Element) => void
): (() => void) => {
  const listener = (evt: Event): void => {
    const rawTarget = evt.target

    if (!(rawTarget instanceof Element)) {
      return
    }

    const matchedTarget = rawTarget.closest(selector)

    if (matchedTarget && container.contains(matchedTarget)) {
      handler(evt as GlobalEventHandlersEventMap[K], matchedTarget)
    }
  }

  container.addEventListener(event, listener as EventListener)

  return (): void => {
    container.removeEventListener(event, listener as EventListener)
  }
}

export default delegate
