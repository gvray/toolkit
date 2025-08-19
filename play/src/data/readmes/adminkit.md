# @gvray/adminkit

A comprehensive toolkit for admin/business application development.

## Installation

```shell
npm i @gvray/adminkit
# or
yarn add @gvray/adminkit
# or
pnpm add @gvray/adminkit
```
<!-- AUTO-API-START -->

## API Reference

## Functions

### copyCode()

复制代码到剪贴板（保留格式）

**Parameters:**
- `code: string` - 要复制的代码
- `language?: string` - 可选的语言标识

**Returns:**
- Promise\<boolean\> - Promise<boolean> 是否复制成功

### copyImage()

复制图片到剪贴板

**Parameters:**
- `imageUrl: string` - 图片 URL 或 Base64

**Returns:**
- Promise\<boolean\> - Promise<boolean> 是否复制成功

### copyLink()

复制链接（带标题）到剪贴板

**Parameters:**
- `url: string` - 要复制的 URL
- `title?: string` - 可选的标题

**Returns:**
- Promise\<boolean\> - Promise<boolean> 是否复制成功

### copyRichText()

复制富文本到剪贴板

**Parameters:**
- `html: string` - HTML 内容
- `fallbackText: string` - 降级的纯文本内容

**Returns:**
- Promise\<boolean\> - Promise<boolean> 是否复制成功

### copyTable()

复制表格数据到剪贴板

**Parameters:**
- `data: (string \| number)[][]` - 表格数据

**Returns:**
- Promise\<boolean\> - Promise<boolean> 是否复制成功

### copyText()

复制文本到剪贴板

**Parameters:**
- `text: string` - 要复制的文本

**Returns:**
- Promise\<boolean\> - Promise<boolean> 是否复制成功

### formatFileSize()

Formats file size in human readable format. 将文件大小格式化为人类可读的格式。

**Parameters:**
- `bytes: number` - Size in bytes / 字节大小
- `decimals: number = 1` - Number of decimal places / 小数位数
- `binary: boolean = false` - Use binary units (1024) instead of decimal (1000) / 使用二进制单位（1024）而不是十进制（1000）

**Returns:**
- string - A formatted file size string / 格式化后的文件大小字符串

**Example:**
```typescript
formatFileSize(1024) // "1.0 KB"
formatFileSize(1024, 0) // "1 KB"
formatFileSize(1024, 2, true) // "1.00 KiB"
formatFileSize(1048576) // "1.0 MB"
```

### formatMoney()

Formats a number as currency with customizable options. 将数字格式化为货币，支持自定义选项。

**Parameters:**
- `amount: number` - The number to be formatted / 要格式化的数字

**Returns:**
- string - A formatted currency string / 格式化后的货币字符串

**Example:**
```typescript
formatMoney(1234.56) // "$1,234.56"
formatMoney(1234.56, { currency: 'EUR', locale: 'de-DE' }) // "1.234,56 €"
formatMoney(1234.56, { currency: 'CNY', locale: 'zh-CN' }) // "¥1,234.56"
formatMoney(1234.56, { symbol: '£' }) // "£1,234.56"
```

### formatNumber()

Formats a number with thousands separators. 格式化数字，添加千位分隔符。

**Parameters:**
- `num: number` - The number to format / 要格式化的数字
- `locale: string = 'en-US'` - The locale to use for formatting / 用于格式化的区域设置

**Returns:**
- string - A formatted number string / 格式化后的数字字符串

**Example:**
```typescript
formatNumber(1234567) // "1,234,567"
formatNumber(1234567.89, 'de-DE') // "1.234.567,89"
formatNumber(1234567.89, 'zh-CN') // "1,234,567.89"
```

### formatNumberCustom()

Formats a number with custom separator and decimal places. 使用自定义分隔符和小数位数格式化数字。

**Parameters:**
- `val: number` - The number to format / 要格式化的数字
- `separator: string` - The thousands separator / 千位分隔符
- `digitNum: number = 0` - Number of decimal places / 小数位数

**Returns:**
- string - Formatted number string / 格式化后的数字字符串

**Example:**
```typescript
formatNumberCustom(123456.789, ',', 2) // "123,456.79"
formatNumberCustom(1000, ' ', 0) // "1 000"
formatNumberCustom(123.456, '', 1) // "123.5"
```

### formatPercentage()

Formats a number as a percentage. 将数字格式化为百分比。

**Parameters:**
- `num: number` - The number to format (0.5 = 50%) / 要格式化的数字（0.5 = 50%）
- `decimals: number = 2` - Number of decimal places / 小数位数
- `locale: string = 'en-US'` - The locale to use / 使用的区域设置

**Returns:**
- string - A formatted percentage string / 格式化后的百分比字符串

**Example:**
```typescript
formatPercentage(0.1234) // "12.34%"
formatPercentage(0.1234, 1) // "12.3%"
formatPercentage(0.1234, 0) // "12%"
```

### formatPhoneNumber()

Formats a phone number for display. 格式化电话号码以便显示。

**Parameters:**
- `phone: string` - The phone number string / 电话号码字符串
- `format: string = '(xxx) xxx-xxxx'` - The format pattern / 格式模式

**Returns:**
- string - A formatted phone number / 格式化后的电话号码

**Example:**
```typescript
formatPhoneNumber('1234567890') // "(123) 456-7890"
formatPhoneNumber('1234567890', 'xxx-xxx-xxxx') // "123-456-7890"
formatPhoneNumber('13812345678', 'xxx xxxx xxxx') // "138 1234 5678"
```

### loading()

Decorator for class methods to automatically manage loading state. 类方法装饰器，自动管理加载状态。

### truncateText()

Truncates text to a specified length and adds ellipsis. 将文本截断到指定长度并添加省略号。

**Parameters:**
- `text: string` - The text to truncate / 要截断的文本
- `maxLength: number` - Maximum length / 最大长度
- `suffix: string = '...'` - Suffix to add (default: '...') / 要添加的后缀（默认：'...'）

**Returns:**
- string - Truncated text / 截断后的文本

**Example:**
```typescript
truncateText('This is a long text', 10) // "This is a..."
truncateText('Short', 10) // "Short"
truncateText('Very long text', 8, '…') // "Very lon…"
```

### withLoading()

Promise wrapper that automatically manages loading state. 自动管理加载状态的 Promise 包装器。


## Interfaces

### 

### 

### 

### 


## Variables

### 

### 

### 

###

<!-- AUTO-API-END -->