# @gvray/adminkit

[![npm version](https://img.shields.io/npm/v/@gvray/adminkit.svg)](https://www.npmjs.com/package/@gvray/adminkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A comprehensive toolkit for admin/business application development, providing essential utilities for modern web applications.

一个用于管理/业务应用开发的综合工具包，为现代 Web 应用提供必要的工具函数。

## 📦 Installation / 安装

```bash
npm install @gvray/adminkit
# or
yarn add @gvray/adminkit
# or
pnpm add @gvray/adminkit
```

## ✨ Features / 特性

- 📋 **Clipboard Operations** - Advanced copy/paste functionality / 高级复制粘贴功能
- 💾 **Storage Management** - LocalStorage and SessionStorage utilities / 本地存储和会话存储工具
- 🎭 **Event System** - Powerful event bus implementation / 强大的事件总线实现
- ⏳ **Loading Management** - Global loading state management / 全局加载状态管理
- 📊 **Formatting Utilities** - Professional data formatting / 专业的数据格式化
- 🌐 **Internationalization** - Multi-language support / 多语言支持
- 🔧 **TypeScript First** - Full type definitions / 完整的类型定义
- 📦 **Tree Shakable** - Import only what you need / 按需导入

## 🚀 Quick Start / 快速开始

```typescript
import { copyText, formatMoney, storage, eventBus, loadingManager } from '@gvray/adminkit'

// Copy text to clipboard / 复制文本到剪贴板
copyText('Hello, world!')

// Format currency / 格式化货币
const price = formatMoney(1234.56) // "$1,234.56"

// Storage operations / 存储操作
storage.set('user', { name: 'John', age: 30 })
const user = storage.get('user')

// Event communication / 事件通信
eventBus.emit('user-login', { userId: '123' })

// Loading management / 加载管理
loadingManager.start('Saving...')
```

## 📚 API Reference / API 参考

### 📋 Clipboard Operations / 剪贴板操作

#### copyText(text: string): Promise<boolean>

Copy plain text to clipboard / 复制纯文本到剪贴板

```typescript
import { copyText } from '@gvray/adminkit'

const success = await copyText('Hello, world!')
if (success) {
  console.log('Text copied successfully!')
}
```

#### copyLink(url: string, title?: string): Promise<boolean>

Copy link with optional title to clipboard / 复制链接（可选标题）到剪贴板

```typescript
import { copyLink } from '@gvray/adminkit'

await copyLink('https://example.com', 'Example Website')
// Copies: "Example Website\nhttps://example.com"
```

#### copyRichText(html: string, fallbackText: string): Promise<boolean>

Copy rich text (HTML) with fallback to clipboard / 复制富文本（HTML）到剪贴板

```typescript
import { copyRichText } from '@gvray/adminkit'

await copyRichText('<b>Bold text</b>', 'Bold text')
```

#### copyCode(code: string, language?: string): Promise<boolean>

Copy code with syntax highlighting to clipboard / 复制带语法高亮的代码到剪贴板

```typescript
import { copyCode } from '@gvray/adminkit'

await copyCode('console.log("Hello")', 'javascript')
```

#### copyImage(imageUrl: string): Promise<boolean>

Copy image to clipboard / 复制图片到剪贴板

```typescript
import { copyImage } from '@gvray/adminkit'

await copyImage(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
)
```

#### copyTable(data: (string|number)[][], options?: object): Promise<boolean>

Copy table data to clipboard / 复制表格数据到剪贴板

```typescript
import { copyTable } from '@gvray/adminkit'

const tableData = [
  ['Name', 'Age', 'City'],
  ['John', 30, 'New York'],
  ['Jane', 25, 'San Francisco']
]

await copyTable(tableData, { header: true, delimiter: '\t' })
```

### 📊 Formatting Utilities / 格式化工具

#### formatMoney(amount: number, options?: object): string

Format number as currency / 将数字格式化为货币

```typescript
import { formatMoney } from '@gvray/adminkit'

formatMoney(1234.56) // "$1,234.56"
formatMoney(1234.56, { currency: 'EUR', locale: 'de-DE' }) // "1.234,56 €"
formatMoney(1234.56, { currency: 'CNY', locale: 'zh-CN' }) // "¥1,234.56"
formatMoney(1234.56, { symbol: '£' }) // "£1,234.56"
```

#### formatNumber(num: number, locale?: string): string

Format number with thousands separators / 格式化数字，添加千位分隔符

```typescript
import { formatNumber } from '@gvray/adminkit'

formatNumber(1234567) // "1,234,567"
formatNumber(1234567.89, 'de-DE') // "1.234.567,89"
formatNumber(1234567.89, 'zh-CN') // "1,234,567.89"
```

#### formatPercentage(num: number, decimals?: number, locale?: string): string

Format number as percentage / 将数字格式化为百分比

```typescript
import { formatPercentage } from '@gvray/adminkit'

formatPercentage(0.1234) // "12.34%"
formatPercentage(0.1234, 1) // "12.3%"
formatPercentage(0.1234, 0) // "12%"
```

#### formatFileSize(bytes: number, decimals?: number, binary?: boolean): string

Format file size in human readable format / 将文件大小格式化为人类可读的格式

```typescript
import { formatFileSize } from '@gvray/adminkit'

formatFileSize(1024) // "1.0 KB"
formatFileSize(1024, 0) // "1 KB"
formatFileSize(1024, 2, true) // "1.00 KiB"
formatFileSize(1048576) // "1.0 MB"
```

#### formatPhoneNumber(phone: string, format?: string): string

Format phone number for display / 格式化电话号码以便显示

```typescript
import { formatPhoneNumber } from '@gvray/adminkit'

formatPhoneNumber('1234567890') // "(123) 456-7890"
formatPhoneNumber('1234567890', 'xxx-xxx-xxxx') // "123-456-7890"
formatPhoneNumber('13812345678', 'xxx xxxx xxxx') // "138 1234 5678"
```

#### truncateText(text: string, maxLength: number, suffix?: string): string

Truncate text to specified length / 将文本截断到指定长度

```typescript
import { truncateText } from '@gvray/adminkit'

truncateText('This is a very long text', 10) // "This is a..."
truncateText('Short', 10) // "Short"
truncateText('Long text here', 10, '***') // "Long text***"
```

### 💾 Storage Management / 存储管理

#### LocalStorage

Enhanced localStorage with JSON support and expiration / 增强的 localStorage，支持 JSON 和过期时间

```typescript
import { storage } from '@gvray/adminkit'

// Basic usage / 基本使用
storage.set('key', 'value')
const value = storage.get('key')

// With expiration / 带过期时间
storage.set('temp-data', { user: 'John' }, { ttl: 3600 }) // 1 hour

// Batch operations / 批量操作
storage.setMultiple({
  user: { name: 'John' },
  settings: { theme: 'dark' }
})

const data = storage.getMultiple(['user', 'settings'])

// Clear operations / 清除操作
storage.remove('key')
storage.clear()
```

#### SessionStorage

Similar to localStorage but for session scope / 类似 localStorage 但用于会话范围

```typescript
import { sessionStore } from '@gvray/adminkit'

sessionStore.set('session-data', { token: 'abc123' })
const sessionData = sessionStore.get('session-data')
```

### 🎭 Event System / 事件系统

Powerful event bus for component communication / 强大的事件总线用于组件通信

```typescript
import { eventBus } from '@gvray/adminkit'

// Subscribe to events / 订阅事件
const unsubscribe = eventBus.on('user-login', (data) => {
  console.log('User logged in:', data)
})

// Emit events / 触发事件
eventBus.emit('user-login', { userId: '123', name: 'John' })

// One-time subscription / 一次性订阅
eventBus.once('app-init', () => {
  console.log('App initialized')
})

// Unsubscribe / 取消订阅
unsubscribe()

// Remove all listeners for an event / 移除事件的所有监听器
eventBus.off('user-login')

// Clear all events / 清除所有事件
eventBus.clear()
```

### ⏳ Loading Management / 加载管理

Global loading state management / 全局加载状态管理

```typescript
import { loadingManager, loading, withLoading } from '@gvray/adminkit'

// Basic loading control / 基本加载控制
loadingManager.start('Saving data...')
loadingManager.stop()

// Check loading state / 检查加载状态
if (loadingManager.isLoading()) {
  console.log('Currently loading:', loadingManager.getMessage())
}

// Subscribe to loading changes / 订阅加载状态变化
const unsubscribe = loadingManager.subscribe((state) => {
  console.log('Loading state:', state)
})

// Decorator for async functions / 异步函数装饰器
const saveData = withLoading(async (data) => {
  await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}, 'Saving data...')

// Higher-order function / 高阶函数
const wrappedFunction = loading(async () => {
  // Some async operation
}, 'Processing...')
```

## 🎯 Use Cases / 使用场景

### Admin Dashboard / 管理后台

```typescript
import { formatMoney, formatFileSize, copyText, eventBus, loadingManager } from '@gvray/adminkit'

// Format dashboard data / 格式化仪表板数据
const revenue = formatMoney(123456.78) // "$123,456.78"
const fileSize = formatFileSize(2048576) // "2.0 MB"

// Copy report data / 复制报告数据
const copyReport = async () => {
  const reportUrl = 'https://admin.example.com/reports/2024'
  await copyText(reportUrl)
  // Show success message
}

// Global notifications / 全局通知
eventBus.on('data-updated', () => {
  // Refresh dashboard
})

// Loading states / 加载状态
const fetchDashboardData = withLoading(async () => {
  const response = await fetch('/api/dashboard')
  return response.json()
}, 'Loading dashboard...')
```

### E-commerce Application / 电商应用

```typescript
import { formatMoney, formatPercentage, storage, eventBus } from '@gvray/adminkit'

// Product pricing / 产品定价
const product = {
  price: formatMoney(99.99),
  discount: formatPercentage(0.15), // 15%
  finalPrice: formatMoney(84.99)
}

// Shopping cart persistence / 购物车持久化
const cart = {
  addItem(item) {
    const items = storage.get('cart-items', [])
    items.push(item)
    storage.set('cart-items', items)
    eventBus.emit('cart-updated', { items })
  },

  getItems() {
    return storage.get('cart-items', [])
  }
}

// User preferences / 用户偏好
storage.set(
  'user-preferences',
  {
    currency: 'USD',
    language: 'en',
    theme: 'light'
  },
  { ttl: 86400 * 30 }
) // 30 days
```

## 🔧 Advanced Usage / 高级用法

### Custom Event Bus / 自定义事件总线

```typescript
import { EventBus } from '@gvray/adminkit'

const customBus = new EventBus({
  maxListeners: 50,
  warningThreshold: 30
})

customBus.on('custom-event', (data) => {
  // Handle event
})
```

### Storage with Encryption / 加密存储

```typescript
import { LocalStorage } from '@gvray/adminkit'

const encryptedStorage = new LocalStorage({
  namespace: 'secure-app',
  encrypt: true,
  secretKey: 'your-secret-key'
})

encryptedStorage.set('sensitive-data', { token: 'secret' })
```

### Loading with Context / 带上下文的加载

```typescript
import { LoadingManager } from '@gvray/adminkit'

const loadingManager = new LoadingManager()

// Multiple loading contexts
loadingManager.start('Uploading file...', 'upload')
loadingManager.start('Saving settings...', 'save')

// Check specific context
if (loadingManager.isLoading('upload')) {
  // Handle upload loading
}
```

## 📱 Browser Support / 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 🤝 Contributing / 贡献

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

我们欢迎贡献！请查看我们的[贡献指南](../../CONTRIBUTING.md)了解详情。

## 📄 License / 许可证

MIT License - see the [LICENSE](../../LICENSE) file for details.

MIT 许可证 - 查看[LICENSE](../../LICENSE)文件了解详情。

## 🔗 Related Packages / 相关包

- [@gvray/eskit](../eskit) - JavaScript/TypeScript language enhancements / JavaScript/TypeScript 语言增强
- [@gvray/domkit](../domkit) - DOM manipulation utilities / DOM 操作工具
- [@gvray/datekit](../datekit) - Date and time utilities / 日期时间工具
- [@gvray/validationkit](../validationkit) - Data validation utilities / 数据验证工具
- [@gvray/mathkit](../mathkit) - Mathematical utilities / 数学工具
- [@gvray/pathkit](../pathkit) - Path manipulation utilities / 路径操作工具

## 📈 Changelog / 更新日志

### v1.0.0

- ✨ Initial release / 初始版本
- 📋 Clipboard operations / 剪贴板操作
- 💾 Storage management / 存储管理
- 🎭 Event system / 事件系统
- ⏳ Loading management / 加载管理
- 📊 Formatting utilities / 格式化工具
<!-- AUTO-API-START -->

## API Reference

**@gvray/adminkit v1.0.0**

***

# @gvray/adminkit v1.0.0

复制相关功能模块

## Classes

- [EventBus](classes/EventBus.md)
- [LoadingManager](classes/LoadingManager.md)
- [LocalStorage](classes/LocalStorage.md)
- [SessionStorage](classes/SessionStorage.md)

## Interfaces

- [EventBusOptions](interfaces/EventBusOptions.md)
- [LoadingState](interfaces/LoadingState.md)
- [StorageItem](interfaces/StorageItem.md)
- [StorageOptions](interfaces/StorageOptions.md)

## Type Aliases

- [EventHandler](type-aliases/EventHandler.md)
- [LoadingListener](type-aliases/LoadingListener.md)

## Variables

- [eventBus](variables/eventBus.md)
- [loadingManager](variables/loadingManager.md)
- [sessionStore](variables/sessionStore.md)
- [storage](variables/storage.md)

## Functions

- [copyCode](docs/functions/copyCode.md)
- [copyImage](docs/functions/copyImage.md)
- [copyLink](docs/functions/copyLink.md)
- [copyRichText](docs/functions/copyRichText.md)
- [copyTable](docs/functions/copyTable.md)
- [copyText](docs/functions/copyText.md)
- [formatFileSize](docs/functions/formatFileSize.md)
- [formatMoney](docs/functions/formatMoney.md)
- [formatNumber](docs/functions/formatNumber.md)
- [formatNumberCustom](docs/functions/formatNumberCustom.md)
- [formatPercentage](docs/functions/formatPercentage.md)
- [formatPhoneNumber](docs/functions/formatPhoneNumber.md)
- [loading](docs/functions/loading.md)
- [truncateText](docs/functions/truncateText.md)
- [withLoading](docs/functions/withLoading.md)

<!-- AUTO-API-END -->