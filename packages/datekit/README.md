# @gvray/datekit

A toolkit for date and time manipulation.

## Installation

```shell
npm i @gvray/datekit
# or
yarn add @gvray/datekit
# or
pnpm add @gvray/datekit
```
<!-- AUTO-API-START -->

## API Reference

## Functions

### add()

Add time to a date. 向日期添加时间。

### duration()

Calculate duration between two dates. 计算两个日期之间的时长。

### format()

Format a date using a custom format string. 使用自定义格式字符串格式化日期。

**Parameters:**
- `date: Date` - The date to format / 要格式化的日期
- `options: [FormatOptions](../interfaces/FormatOptions.md) = {}` - Formatting options / 格式化选项

**Returns:**
- string - Formatted date string / 格式化的日期字符串

**Example:**
```typescript
const date = new Date('2023-12-25T15:30:45.123Z')

format(date, 'YYYY-MM-DD') // '2023-12-25'
format(date, 'YYYY年MM月DD日') // '2023年12月25日'
format(date, 'HH:mm:ss') // '15:30:45'
format(date, 'dddd, MMMM D, YYYY') // 'Monday, December 25, 2023'
```

### formatPreset()

Format a date using a preset format. 使用预设格式格式化日期。

### getTimezoneOffset()

Get timezone offset in minutes. 获取时区偏移量（分钟）。

### isAfter()

Check if first date is after second date. 检查第一个日期是否在第二个日期之后。

### isBefore()

Check if first date is before second date. 检查第一个日期是否在第二个日期之前。

### isEqual()

Check if two dates are equal. 检查两个日期是否相等。

### isValid()

Check if a date is valid. 检查日期是否有效。

### parse()

Parse a date string into a Date object. 将日期字符串解析为Date对象。

**Parameters:**
- `dateString: string` - The date string to parse / 要解析的日期字符串
- `format?: string` - Optional format hint / 可选的格式提示

**Returns:**
- null \| Date - Parsed Date object or null if parsing fails / 解析的Date对象，解析失败返回null

**Example:**
```typescript
parse('2023-12-25') // Date object for 2023-12-25
parse('25/12/2023', 'DD/MM/YYYY') // Date object for 2023-12-25
parse('invalid') // null
```

### parseAny()

Try to parse a date from various common formats. 尝试从各种常见格式解析日期。

**Returns:**
- null \| Date - Parsed Date object or null / 解析的Date对象或null

**Example:**
```typescript
parseAny('2023-12-25') // Date object
parseAny(1703520645) // Date object from Unix timestamp
parseAny(new Date()) // Returns the same Date object
```

### parseISO()

Parse an ISO 8601 date string. 解析ISO 8601日期字符串。

**Example:**
```typescript
parseISO('2023-12-25T15:30:45.123Z')
parseISO('2023-12-25T15:30:45+08:00')
```

### parseUnix()

Parse a Unix timestamp (seconds or milliseconds). 解析Unix时间戳（秒或毫秒）。

**Parameters:**
- `timestamp: number` - Unix timestamp / Unix时间戳

**Example:**
```typescript
parseUnix(1703520645) // From seconds
parseUnix(1703520645123, 'milliseconds') // From milliseconds
```

### subtract()

Subtract time from a date. 从日期减去时间。

### timeAgo()

Get relative time string. 获取相对时间字符串。

### toTimezone()

Convert date to different timezone. 将日期转换为不同时区。


## Interfaces

### 


## Variables

### 

Common date format presets. 常用日期格式预设。

**Signature:** `object`

### 

Format tokens for date formatting. 日期格式化的格式标记。

**Signature:** `object`

<!-- AUTO-API-END -->