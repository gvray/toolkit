export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
}

export type LoadingListener = (state: LoadingState) => void

/**
 * Global loading state manager for admin applications.
 * 管理后台应用的全局加载状态管理器。
 */
export class LoadingManager {
  private state: LoadingState = { isLoading: false }
  private listeners: Set<LoadingListener> = new Set()
  private loadingStack: string[] = []

  /**
   * Start loading with optional message and progress.
   * 开始加载，可选消息和进度。
   */
  start(key = 'default', message?: string, progress?: number): void {
    if (!this.loadingStack.includes(key)) {
      this.loadingStack.push(key)
    }

    const state: LoadingState = { isLoading: true }
    if (message !== undefined) state.message = message
    if (progress !== undefined) state.progress = progress

    this.updateState(state)
  }

  /**
   * Finish loading for a specific key.
   * 完成特定键的加载。
   */
  finish(key = 'default'): void {
    this.loadingStack = this.loadingStack.filter((k) => k !== key)

    if (this.loadingStack.length === 0) {
      this.updateState({ isLoading: false })
    }
  }

  /**
   * Update loading progress.
   * 更新加载进度。
   */
  setProgress(progress: number, message?: string): void {
    if (this.state.isLoading) {
      this.updateState({
        ...this.state,
        progress,
        ...(message && { message })
      })
    }
  }

  /**
   * Update loading message.
   * 更新加载消息。
   */
  setMessage(message: string): void {
    if (this.state.isLoading) {
      this.updateState({
        ...this.state,
        message
      })
    }
  }

  /**
   * Get current loading state.
   * 获取当前加载状态。
   */
  getState(): LoadingState {
    return { ...this.state }
  }

  /**
   * Check if currently loading.
   * 检查是否正在加载。
   */
  isLoading(): boolean {
    return this.state.isLoading
  }

  /**
   * Subscribe to loading state changes.
   * 订阅加载状态变化。
   */
  subscribe(listener: LoadingListener): () => void {
    this.listeners.add(listener)

    // Immediately call with current state
    listener(this.getState())

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener)
    }
  }

  /**
   * Clear all loading states.
   * 清除所有加载状态。
   */
  clear(): void {
    this.loadingStack = []
    this.updateState({ isLoading: false })
  }

  private updateState(newState: LoadingState): void {
    this.state = { ...newState }
    this.listeners.forEach((listener) => {
      try {
        listener(this.getState())
      } catch (error) {
        console.error('LoadingManager: Error in listener:', error)
      }
    })
  }
}

/**
 * Promise wrapper that automatically manages loading state.
 * 自动管理加载状态的 Promise 包装器。
 */
export async function withLoading<T>(
  promise: Promise<T>,
  options: {
    key?: string
    message?: string
    manager?: LoadingManager
  } = {}
): Promise<T> {
  const { key = 'default', message, manager = loadingManager } = options

  try {
    manager.start(key, message)
    const result = await promise
    return result
  } finally {
    manager.finish(key)
  }
}

/**
 * Decorator for class methods to automatically manage loading state.
 * 类方法装饰器，自动管理加载状态。
 */
export function loading(options: { key?: string; message?: string } = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const { key = propertyKey, message } = options
      const loadingOptions: { key: string; message?: string; manager?: LoadingManager } = { key }
      if (message !== undefined) loadingOptions.message = message
      return withLoading(originalMethod.apply(this, args), loadingOptions)
    }

    return descriptor
  }
}

// Global loading manager instance / 全局加载管理器实例
export const loadingManager = new LoadingManager()
