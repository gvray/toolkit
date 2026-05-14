/**
 * Adds an event listener that is removed after the first call.
 *
 * @param el - The target element.
 * @param event - The event name.
 * @param handler - The event handler.
 * @returns A cleanup function.
 *
 * @example
 * onceEvent(el, 'click', handler)
 */
const onceEvent = <K extends keyof GlobalEventHandlersEventMap>(
  el: EventTarget,
  event: K,
  handler: (event: GlobalEventHandlersEventMap[K]) => void
): (() => void) => {
  const wrappedHandler = (evt: Event): void => {
    handler(evt as GlobalEventHandlersEventMap[K])
    el.removeEventListener(event, wrappedHandler as EventListener)
  }

  el.addEventListener(event, wrappedHandler as EventListener)

  return (): void => {
    el.removeEventListener(event, wrappedHandler as EventListener)
  }
}

export default onceEvent
