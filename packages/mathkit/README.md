# @gvray/mathkit

Professional mathematical utilities for JavaScript/TypeScript applications.

专业的 JavaScript/TypeScript 数学工具库。

## Features / 特性

- 🔢 **High-precision arithmetic** - Avoid floating point errors / 高精度算术运算 - 避免浮点数误差
- 📊 **Statistical functions** - Min, max, clamp operations / 统计函数 - 最小值、最大值、限制操作
- 🎲 **Random number generation** - Integers, floats, choices / 随机数生成 - 整数、浮点数、选择
- 📈 **Sequence generation** - Ranges, Fibonacci, arithmetic/geometric sequences / 序列生成 - 范围、斐波那契、等差/等比数列
- 🧮 **Number utilities** - Even/odd checks, comparisons / 数字工具 - 奇偶检查、比较
- 📦 **Tree-shakable** - Import only what you need / 支持摇树优化 - 只导入需要的功能
- 🔧 **TypeScript support** - Full type definitions / TypeScript 支持 - 完整类型定义

## Installation / 安装

```bash
npm install @gvray/mathkit
# or
pnpm add @gvray/mathkit
# or
yarn add @gvray/mathkit
```

## Usage / 使用方法

### Arithmetic Operations / 算术运算

```typescript
import { add, subtract, multiply, divide } from '@gvray/mathkit'

// High-precision arithmetic / 高精度算术
add(0.1, 0.2) // 0.3 (not 0.30000000000000004)
subtract(0.3, 0.1) // 0.2 (not 0.19999999999999998)
multiply(0.1, 0.2) // 0.02 (not 0.020000000000000004)
divide(0.3, 0.1) // 3 (not 2.9999999999999996)
```

### Comparison and Bounds / 比较和边界

```typescript
import { min, max, clamp, isEven, isOdd } from '@gvray/mathkit'

min([1, 2, 3, 4, 5]) // 1
max([1, 2, 3, 4, 5]) // 5
clamp(10, 0, 5) // 5
isEven(4) // true
isOdd(3) // true
```

### Random Number Generation / 随机数生成

```typescript
import { randomInt, randomFloat, shuffle, randomChoice, randomBoolean } from '@gvray/mathkit'

randomInt(1, 10) // Random integer between 1 and 10
randomFloat(0, 1, 2) // Random float like 0.42
shuffle([1, 2, 3, 4, 5]) // Shuffled array
randomChoice(['apple', 'banana', 'orange']) // Random element
randomBoolean(0.7) // 70% chance of true
```

### Sequences and Ranges / 序列和范围

```typescript
import { range, fibonacci, arithmeticSequence, geometricSequence, repeat } from '@gvray/mathkit'

range(0, 5) // [0, 1, 2, 3, 4]
range(1, 10, 2) // [1, 3, 5, 7, 9]
fibonacci(10) // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
arithmeticSequence(2, 3, 5) // [2, 5, 8, 11, 14]
geometricSequence(2, 3, 5) // [2, 6, 18, 54, 162]
repeat(0, 5) // [0, 0, 0, 0, 0]
```

## API Reference / API 参考

### Arithmetic / 算术运算

- `add(a: number, b: number): number` - High-precision addition / 高精度加法
- `subtract(a: number, b: number): number` - High-precision subtraction / 高精度减法
- `multiply(a: number, b: number): number` - High-precision multiplication / 高精度乘法
- `divide(a: number, b: number): number` - High-precision division / 高精度除法

### Comparison / 比较

- `min(values: number[]): number` - Find minimum value / 查找最小值
- `max(values: number[]): number` - Find maximum value / 查找最大值
- `clamp(value: number, lower: number, upper: number): number` - Clamp value to bounds / 将值限制在边界内
- `isEven(value: number): boolean` - Check if number is even / 检查是否为偶数
- `isOdd(value: number): boolean` - Check if number is odd / 检查是否为奇数

### Random / 随机

- `randomInt(min: number, max: number): number` - Random integer / 随机整数
- `randomFloat(min: number, max: number, precision?: number): number` - Random float / 随机浮点数
- `shuffle<T>(array: T[]): T[]` - Shuffle array / 打乱数组
- `randomChoice<T>(array: T[]): T` - Random array element / 随机数组元素
- `randomBoolean(probability?: number): boolean` - Random boolean / 随机布尔值

### Sequences / 序列

- `range(start: number, end: number, step?: number): number[]` - Number range / 数字范围
- `repeat<T>(value: T, count: number): T[]` - Repeat value / 重复值
- `fibonacci(n: number): number[]` - Fibonacci sequence / 斐波那契数列
- `arithmeticSequence(firstTerm: number, commonDifference: number, numberOfTerms: number): number[]` - Arithmetic sequence / 等差数列
- `geometricSequence(firstTerm: number, commonRatio: number, numberOfTerms: number): number[]` - Geometric sequence / 等比数列

## License / 许可证

MIT
