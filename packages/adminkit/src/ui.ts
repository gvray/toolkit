let watermarkObserver: MutationObserver | null = null
let watermarkNode: HTMLElement | null = null

export const setWatermark = (text: string, target: HTMLElement = document.body): (() => void) => {
  clearWatermark()
  watermarkNode = document.createElement('div')
  watermarkNode.setAttribute('data-watermark', text)
  watermarkNode.style.pointerEvents = 'none'
  watermarkNode.style.position = 'absolute'
  watermarkNode.style.inset = '0'
  watermarkNode.style.opacity = '0.12'
  watermarkNode.style.backgroundImage =
    'repeating-linear-gradient(-30deg, transparent, transparent 80px, rgba(0,0,0,.08) 80px, rgba(0,0,0,.08) 160px)'
  target.style.position = target.style.position || 'relative'
  target.appendChild(watermarkNode)
  watermarkObserver = new MutationObserver(() => {
    if (watermarkNode && !target.contains(watermarkNode)) {
      target.appendChild(watermarkNode)
    }
  })
  watermarkObserver.observe(target, { childList: true })
  return clearWatermark
}

export const clearWatermark = (): void => {
  watermarkObserver?.disconnect()
  watermarkObserver = null
  watermarkNode?.remove()
  watermarkNode = null
}

export const printElement = (element: Element): void => {
  const iframe = document.createElement('iframe')
  iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0'
  document.body.appendChild(iframe)
  const doc = iframe.contentDocument
  if (!doc) return
  doc.open()
  doc.write(`<html><head><title>print</title></head><body>${(element as HTMLElement).outerHTML}</body></html>`)
  doc.close()
  iframe.contentWindow?.focus()
  iframe.contentWindow?.print()
  setTimeout(() => iframe.remove(), 1000)
}

export const withConfirm = <TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  message: (...args: TArgs) => string,
  confirmFn: (msg: string) => boolean = (msg) => window.confirm(msg)
): ((...args: TArgs) => Promise<TResult | undefined>) => {
  return async (...args: TArgs) => {
    if (!confirmFn(message(...args))) return undefined
    return fn(...args)
  }
}

export const createSubmitGuard = <TArgs extends unknown[], TResult>(fn: (...args: TArgs) => Promise<TResult>) => {
  let locked = false
  return async (...args: TArgs): Promise<TResult | undefined> => {
    if (locked) return undefined
    locked = true
    try {
      return await fn(...args)
    } finally {
      locked = false
    }
  }
}

export class NotificationQueue {
  private maxCount: number
  private items: string[] = []

  constructor(options: { maxCount?: number } = {}) {
    this.maxCount = options.maxCount ?? 3
  }

  push(message: string): void {
    if (this.items.includes(message)) return
    this.items.push(message)
    if (this.items.length > this.maxCount) this.items.shift()
  }

  list(): string[] {
    return [...this.items]
  }
}

export class HistoryManager<T> {
  private past: T[] = []
  private present: T
  private future: T[] = []

  constructor(initial: T) {
    this.present = initial
  }

  get value(): T {
    return this.present
  }

  commit(next: T): void {
    this.past.push(this.present)
    this.present = next
    this.future = []
  }

  undo(): T {
    const prev = this.past.pop()
    if (prev !== undefined) {
      this.future.unshift(this.present)
      this.present = prev
    }
    return this.present
  }

  redo(): T {
    const next = this.future.shift()
    if (next !== undefined) {
      this.past.push(this.present)
      this.present = next
    }
    return this.present
  }
}

export class TabManager {
  private tabs: Array<{ path: string; title: string }> = []

  add(tab: { path: string; title: string }): void {
    if (!this.tabs.find((item) => item.path === tab.path)) this.tabs.push(tab)
  }

  close(path: string): void {
    this.tabs = this.tabs.filter((tab) => tab.path !== path)
  }

  closeOthers(path: string): void {
    this.tabs = this.tabs.filter((tab) => tab.path === path)
  }

  closeAll(): void {
    this.tabs = []
  }

  list(): Array<{ path: string; title: string }> {
    return [...this.tabs]
  }
}
