export interface StorageOptions {
  prefix?: string
  serializer?: {
    serialize: (value: any) => string
    deserialize: (value: string) => any
  }
  ttl?: number // Time to live in milliseconds
}

export interface StorageItem<T = any> {
  data: T
  timestamp: number
  ttl?: number
}

/**
 * Enhanced localStorage wrapper with TTL, serialization, and prefix support.
 * 增强的 localStorage 包装器，支持 TTL、序列化和前缀。
 */
export class LocalStorage {
  private prefix: string
  private serializer: Required<StorageOptions>['serializer']

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix ? `${options.prefix}_` : ''
    this.serializer = options.serializer || {
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  private isExpired(item: StorageItem): boolean {
    if (!item.ttl) return false
    return Date.now() - item.timestamp > item.ttl
  }

  /**
   * Set an item in localStorage with optional TTL.
   * 在 localStorage 中设置项目，可选 TTL。
   */
  set<T>(key: string, value: T, ttl?: number): void {
    const item: StorageItem<T> = {
      data: value,
      timestamp: Date.now(),
      ...(ttl && { ttl })
    }

    try {
      localStorage.setItem(this.getKey(key), this.serializer.serialize(item))
    } catch (error) {
      console.error('Failed to set localStorage item:', error)
    }
  }

  /**
   * Get an item from localStorage.
   * 从 localStorage 获取项目。
   */
  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(this.getKey(key))
      if (!value) return null

      const item: StorageItem<T> = this.serializer.deserialize(value)

      if (this.isExpired(item)) {
        this.remove(key)
        return null
      }

      return item.data
    } catch (error) {
      console.error('Failed to get localStorage item:', error)
      return null
    }
  }

  /**
   * Remove an item from localStorage.
   * 从 localStorage 删除项目。
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.error('Failed to remove localStorage item:', error)
    }
  }

  /**
   * Clear all items with the current prefix.
   * 清除所有带有当前前缀的项目。
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }

  /**
   * Check if an item exists in localStorage.
   * 检查 localStorage 中是否存在项目。
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Get all keys with the current prefix.
   * 获取所有带有当前前缀的键。
   */
  keys(): string[] {
    try {
      return Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix))
        .map((key) => key.slice(this.prefix.length))
    } catch (error) {
      console.error('Failed to get localStorage keys:', error)
      return []
    }
  }
}

/**
 * Enhanced sessionStorage wrapper with serialization and prefix support.
 * 增强的 sessionStorage 包装器，支持序列化和前缀。
 */
export class SessionStorage {
  private prefix: string
  private serializer: Required<StorageOptions>['serializer']

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix ? `${options.prefix}_` : ''
    this.serializer = options.serializer || {
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }
  set<T>(key: string, value: T): void {
    const item: StorageItem<T> = {
      data: value,
      timestamp: Date.now()
    }

    try {
      sessionStorage.setItem(this.getKey(key), this.serializer.serialize(item))
    } catch (error) {
      console.error('Failed to set sessionStorage item:', error)
    }
  }

  get<T>(key: string): T | null {
    try {
      const value = sessionStorage.getItem(this.getKey(key))
      if (!value) return null

      const item: StorageItem<T> = this.serializer.deserialize(value)
      return item.data
    } catch (error) {
      console.error('Failed to get sessionStorage item:', error)
      return null
    }
  }

  remove(key: string): void {
    try {
      sessionStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.error('Failed to remove sessionStorage item:', error)
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          sessionStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear sessionStorage:', error)
    }
  }

  keys(): string[] {
    try {
      return Object.keys(sessionStorage)
        .filter((key) => key.startsWith(this.prefix))
        .map((key) => key.slice(this.prefix.length))
    } catch (error) {
      console.error('Failed to get sessionStorage keys:', error)
      return []
    }
  }
}

// Convenience functions / 便利函数
export const storage = new LocalStorage()
export const sessionStore = new SessionStorage()
