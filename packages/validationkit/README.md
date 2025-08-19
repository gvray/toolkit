# @gvray/validationkit

A toolkit for data validation and schema checking.

## Installation

```shell
npm i @gvray/validationkit
# or
yarn add @gvray/validationkit
# or
pnpm add @gvray/validationkit
```
<!-- AUTO-API-START -->

## API Reference

## Functions

### max()

Maximum value validation / 最大值验证

### maxLength()

Maximum length validation / 最大长度验证

### min()

Minimum value validation / 最小值验证

### minLength()

Minimum length validation / 最小长度验证

### pattern()

Pattern validation / 正则表达式验证

### validateSchema()

Validates an object against a schema. 根据模式验证对象。

**Parameters:**
- `data: Record\<string, any\>` - The data to validate / 要验证的数据
- `schema: [Schema](../interfaces/Schema.md)` - The validation schema / 验证模式

**Returns:**
- [SchemaValidationResult](../interfaces/SchemaValidationResult.md) - Validation result / 验证结果

**Example:**
```typescript
const userSchema = {
  email: { validators: [required, email], required: true },
  age: { validators: [min(18), max(120)] }
}

const result = validateSchema({ email: 'test@example.com', age: 25 }, userSchema)
```


## Interfaces

### 

### 

### 

### 

### 

### 

### 


## Variables

### 

Chinese ID card validation / 中国身份证验证

### 

Chinese mobile phone validation / 中国手机号验证

### 

Email validation / 邮箱验证

### 

Checks if a character is a letter or digit / 检查字符是否为字母或数字

### 

Phone number validation (supports multiple formats) / 手机号验证（支持多种格式）

### 

Required field validation / 必填字段验证

### 

URL validation / URL验证

<!-- AUTO-API-END -->