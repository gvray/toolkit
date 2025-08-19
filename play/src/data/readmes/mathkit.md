# @gvray/mathkit

A toolkit for mathematical operations and calculations.

## Installation

```shell
npm i @gvray/mathkit
# or
yarn add @gvray/mathkit
# or
pnpm add @gvray/mathkit
```
<!-- AUTO-API-START -->

## API Reference

## Functions

### add()

Adds two numbers with fixed precision to avoid floating point errors. 高精度加法运算，避免浮点数误差。

**Parameters:**
- `a: number` - The first number to add / 第一个加数
- `b: number` - The second number to add / 第二个加数

**Returns:**
- number - The result of adding the two numbers / 加法结果

**Example:**
```typescript
add(0.1, 0.2) // returns 0.3 (not 0.30000000000000004)
add(123.456, 78.9) // returns 202.356
```

### arithmeticSequence()

Generates an arithmetic sequence. 生成等差数列。

**Parameters:**
- `firstTerm: number` - The first term / 首项
- `commonDifference: number` - The common difference / 公差
- `numberOfTerms: number` - The number of terms / 项数

**Returns:**
- number[] - An array containing the arithmetic sequence / 包含等差数列的数组

**Example:**
```typescript
arithmeticSequence(2, 3, 5) // returns [2, 5, 8, 11, 14]
arithmeticSequence(10, -2, 6) // returns [10, 8, 6, 4, 2, 0]
```

### clamp()

Clamps a number within the inclusive lower and upper bounds. 将数字限制在指定的上下边界内。

**Parameters:**
- `value: number` - The number to clamp / 要限制的数字
- `lower: number` - The lower bound / 下边界
- `upper: number` - The upper bound / 上边界

**Returns:**
- number - The clamped value / 限制后的值

**Example:**
```typescript
clamp(10, 0, 5) // returns 5
clamp(-10, 0, 5) // returns 0
clamp(3, 0, 5) // returns 3
```

### divide()

Divides first number by second number with fixed precision. 高精度除法运算，避免浮点数误差。

**Parameters:**
- `a: number` - The dividend / 被除数
- `b: number` - The divisor / 除数

**Returns:**
- number - The result of dividing a by b / 除法结果

**Example:**
```typescript
divide(0.3, 0.1) // returns 3 (not 2.9999999999999996)
divide(123.456, 12.3) // returns 10.037073170731707
divide(5, 0) // throws Error
```

### fibonacci()

Generates the Fibonacci sequence up to n terms. 生成斐波那契数列的前n项。

**Parameters:**
- `n: number` - The number of terms to generate / 要生成的项数

**Returns:**
- number[] - An array containing the Fibonacci sequence / 包含斐波那契数列的数组

**Example:**
```typescript
fibonacci(10) // returns [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
fibonacci(5) // returns [0, 1, 1, 2, 3]
fibonacci(0) // returns []
```

### geometricSequence()

Generates a geometric sequence. 生成等比数列。

**Parameters:**
- `firstTerm: number` - The first term / 首项
- `commonRatio: number` - The common ratio / 公比
- `numberOfTerms: number` - The number of terms / 项数

**Returns:**
- number[] - An array containing the geometric sequence / 包含等比数列的数组

**Example:**
```typescript
geometricSequence(2, 3, 5) // returns [2, 6, 18, 54, 162]
geometricSequence(1, 0.5, 4) // returns [1, 0.5, 0.25, 0.125]
```

### isEven()

Checks if a number is even. 检查数字是否为偶数。

**Parameters:**
- `value: number` - The number to check / 要检查的数字

**Returns:**
- boolean - True if the number is even / 如果是偶数返回true

**Example:**
```typescript
isEven(2) // returns true
isEven(3) // returns false
isEven(0) // returns true
```

### isOdd()

Checks if a number is odd. 检查数字是否为奇数。

**Parameters:**
- `value: number` - The number to check / 要检查的数字

**Returns:**
- boolean - True if the number is odd / 如果是奇数返回true

**Example:**
```typescript
isOdd(3) // returns true
isOdd(2) // returns false
isOdd(1) // returns true
```

### max()

Returns the maximum value from an array of numbers. 返回数字数组中的最大值。

**Parameters:**
- `values: number[]` - Array of numbers / 数字数组

**Returns:**
- number - The maximum value / 最大值

**Example:**
```typescript
max([1, 2, 3, 4, 5]) // returns 5
max([-10, 0, 10]) // returns 10
max([]) // throws Error
```

### min()

Returns the minimum value from an array of numbers. 返回数字数组中的最小值。

**Parameters:**
- `values: number[]` - Array of numbers / 数字数组

**Returns:**
- number - The minimum value / 最小值

**Example:**
```typescript
min([1, 2, 3, 4, 5]) // returns 1
min([-10, 0, 10]) // returns -10
min([]) // throws Error
```

### multiply()

Multiplies two numbers with fixed precision. 高精度乘法运算，避免浮点数误差。

**Parameters:**
- `a: number` - The first number to multiply / 第一个乘数
- `b: number` - The second number to multiply / 第二个乘数

**Returns:**
- number - The result of multiplying the two numbers / 乘法结果

**Example:**
```typescript
multiply(0.1, 0.2) // returns 0.02 (not 0.020000000000000004)
multiply(1.23, 4.56) // returns 5.6088
```

### randomBoolean()

Generates a random boolean value. 生成随机布尔值。

**Parameters:**
- `probability: number = 0.5` - Probability of returning true (0-1, default: 0.5) / 返回true的概率（0-1，默认：0.5）

**Returns:**
- boolean - A random boolean / 随机布尔值

**Example:**
```typescript
randomBoolean() // 50% chance of true
randomBoolean(0.7) // 70% chance of true
randomBoolean(0.1) // 10% chance of true
```

### randomChoice()

Picks a random element from an array. 从数组中随机选择一个元素。

**Parameters:**
- `array: T[]` - The array to pick from / 要选择的数组

**Returns:**
- T - A random element from the array / 数组中的随机元素

**Example:**
```typescript
randomChoice([1, 2, 3, 4, 5]) // returns one of the numbers
randomChoice(['apple', 'banana', 'orange']) // returns one of the fruits
```

### randomFloat()

Generates a random float between min and max. 生成指定范围内的随机浮点数。

**Parameters:**
- `min: number` - The minimum value / 最小值
- `max: number` - The maximum value / 最大值
- `precision: number = 2` - Number of decimal places (default: 2) / 小数位数（默认：2）

**Returns:**
- number - A random float / 随机浮点数

**Example:**
```typescript
randomFloat(0, 1) // returns a number like 0.42
randomFloat(1.5, 10.7, 3) // returns a number like 7.394
```

### randomInt()

Generates a random integer between min and max (inclusive). 生成指定范围内的随机整数（包含边界）。

**Parameters:**
- `min: number` - The minimum value (inclusive) / 最小值（包含）
- `max: number` - The maximum value (inclusive) / 最大值（包含）

**Returns:**
- number - A random integer / 随机整数

**Example:**
```typescript
randomInt(1, 10) // returns a number between 1 and 10
randomInt(0, 100) // returns a number between 0 and 100
randomInt(-5, 5) // returns a number between -5 and 5
```

### range()

Creates an array of numbers progressing from start up to, but not including, end. 创建一个从start到end（不包含end）的数字数组。

**Parameters:**
- `start: number` - The start of the range / 范围的开始
- `end: number` - The end of the range / 范围的结束
- `step: number = 1` - The value to increment or decrement by (default: 1) / 步长（默认：1）

**Returns:**
- number[] - An array of numbers / 数字数组

**Example:**
```typescript
range(0, 5) // returns [0, 1, 2, 3, 4]
range(1, 10, 2) // returns [1, 3, 5, 7, 9]
range(10, 0, -2) // returns [10, 8, 6, 4, 2]
```

### repeat()

Creates an array with a single value repeated n times. 创建一个包含重复值的数组。

**Parameters:**
- `value: T` - The value to repeat / 要重复的值
- `count: number` - The number of times to repeat / 重复次数

**Returns:**
- T[] - An array with repeated values / 包含重复值的数组

**Example:**
```typescript
repeat(0, 5) // returns [0, 0, 0, 0, 0]
repeat('hello', 3) // returns ['hello', 'hello', 'hello']
repeat(true, 2) // returns [true, true]
```

### shuffle()

Shuffles an array using Fisher-Yates algorithm. 使用Fisher-Yates算法打乱数组。

**Parameters:**
- `array: T[]` - The array to shuffle / 要打乱的数组

**Returns:**
- T[] - A new shuffled array / 打乱后的新数组

**Example:**
```typescript
shuffle([1, 2, 3, 4, 5]) // returns something like [3, 1, 5, 2, 4]
shuffle(['a', 'b', 'c']) // returns something like ['c', 'a', 'b']
```

### subtract()

Subtracts second number from first number with fixed precision. 高精度减法运算，避免浮点数误差。

**Parameters:**
- `a: number` - The minuend / 被减数
- `b: number` - The subtrahend / 减数

**Returns:**
- number - The result of subtracting b from a / 减法结果

**Example:**
```typescript
subtract(0.3, 0.1) // returns 0.2 (not 0.19999999999999998)
subtract(123.456, 23.45) // returns 100.006
```

<!-- AUTO-API-END -->