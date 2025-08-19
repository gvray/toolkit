# @gvray/eskit

A toolkit for TypeScript and JavaScript development.

## Installation

```shell
npm i @gvray/eskit
# or
yarn add @gvray/eskit
# or
pnpm add @gvray/eskit
```
<!-- AUTO-API-START -->

## API Reference

## Functions

### clone()

Creates a deep clone of an object using JSON serialization. 使用JSON序列化创建对象的深度克隆。

**Parameters:**
- `obj: T` - The object to clone / 要克隆的对象

**Returns:**
- T - A deep clone of the object / 对象的深度克隆

**Example:**
```typescript
const original = {
  a: 1,
  b: { c: 2, d: [3, 4] },
  e: 'hello'
}

const cloned = clone(original)
console.log(cloned) // { a: 1, b: { c: 2, d: [3, 4] }, e: 'hello' }

// Modifications to clone don't affect original
cloned.a = 999
cloned.b.c = 888
cloned.b.d.push(5)

console.log(original.a) // 1 (unchanged)
console.log(original.b.c) // 2 (unchanged)
console.log(original.b.d) // [3, 4] (unchanged)

// Works with arrays
const arr = [1, { a: 2 }, [3, 4]]
const clonedArr = clone(arr)
clonedArr[1].a = 999
console.log(arr[1].a) // 2 (unchanged)

// Note: Only works with JSON-serializable values
// Functions, undefined, symbols, dates will be lost or converted
const withFunction = { fn: () => 'hello', date: new Date() }
const clonedWithFunction = clone(withFunction)
console.log(clonedWithFunction.fn) // undefined
console.log(typeof clonedWithFunction.date) // 'string'
```

**Since:** 1.0.0

### compose()

Composes multiple functions into a single function that executes from right to left. 将多个函数组合成一个从右到左执行的单一函数。 Function composition allows you to chain operations together, where the output of one function becomes the input of the next function. 函数组合允许您将操作链接在一起，其中一个函数的输出成为下一个函数的输入。

**Parameters:**
- `funcs: ...(arg) => T[]` - An array of functions to compose / 要组合的函数数组

**Returns:**
- A new function that executes the input functions from right to left / 从右到左执行输入函数的新函数 - > (`arg`): `T`

**Example:**
```typescript
const add1 = (x: number) => x + 1
const multiply2 = (x: number) => x * 2
const square = (x: number) => x * x

// Compose functions: square(multiply2(add1(x)))
const composed = compose(square, multiply2, add1)

console.log(composed(3)) // ((3 + 1) * 2)² = (4 * 2)² = 8² = 64

// String transformations
const addExclamation = (s: string) => s + '!'
const toUpperCase = (s: string) => s.toUpperCase()
const addPrefix = (s: string) => 'RESULT: ' + s

const transform = compose(addPrefix, toUpperCase, addExclamation)
console.log(transform('hello')) // "RESULT: HELLO!"
```

**Since:** 1.0.0

### constantize()

Freezes an object and its immediate properties (shallow freeze). 冻结对象及其直接属性（浅冻结）。

**Parameters:**
- `obj: T` - The object to freeze / 要冻结的对象

**Example:**
```typescript
const config = {
  api: { url: 'https://api.example.com', timeout: 5000 },
  features: ['auth', 'logging'],
  debug: true
}

constantize(config)

// Object and its immediate properties are frozen
config.debug = false // TypeError: Cannot assign to read only property
config.newProp = 'value' // TypeError: Cannot add property
config.api.timeout = 10000 // TypeError: Cannot assign to read only property

// But nested objects' properties can still be modified
// (this is a shallow freeze, not deep freeze)

// Check if frozen
console.log(Object.isFrozen(config)) // true
console.log(Object.isFrozen(config.api)) // true
console.log(Object.isFrozen(config.features)) // true

// Useful for creating immutable configuration objects
const constants = { PI: 3.14159, E: 2.71828 }
constantize(constants)
// constants.PI = 3.14 // TypeError: Cannot assign to read only property
```

**Since:** 1.0.0

### contains()

Checks if an array or string contains a specified value. 检查数组或字符串是否包含指定的值。

**Parameters:**
- `value: any` - The value to search for / 要搜索的值
- `position: number = -1` - The index to start searching from / 开始搜索的索引位置

**Returns:**
- boolean - True if the value is found / 如果找到值则返回true

**Example:**
```typescript
// Array searching
const numbers = [1, 2, 3, 4, 5]
contains(numbers, 3) // true
contains(numbers, 6) // false
contains(numbers, 3, 3) // false (start from index 3)
contains(numbers, 4, 3) // true (start from index 3)

const fruits = ['apple', 'banana', 'orange']
contains(fruits, 'banana') // true
contains(fruits, 'grape') // false

// String searching
contains('hello world', 'world') // true
contains('hello world', 'World') // false (case sensitive)
contains('hello world', 'o', 5) // true (start from index 5)
contains('hello world', 'h', 1) // false (start from index 1)

// Edge cases
contains([], 'anything') // false
contains('', 'anything') // false
contains([1, 2, null], null) // false (null values are filtered out)
contains([1, 2, undefined], undefined) // false (undefined values are filtered out)
```

**Since:** 1.0.0

### copyProperties()

Copies all properties from source to target, including non-enumerable ones. 将所有属性从源对象复制到目标对象，包括不可枚举的属性。

**Parameters:**
- `target: T` - The target object to copy properties to / 要复制属性到的目标对象
- `source: U` - The source object to copy properties from / 要从中复制属性的源对象

**Example:**
```typescript
const source = { a: 1, b: 2 }
const target = { c: 3 }

copyProperties(target, source)
console.log(target) // { c: 3, a: 1, b: 2 }

// Copies non-enumerable properties too
const sourceWithHidden = {}
Object.defineProperty(sourceWithHidden, 'hidden', {
  value: 'secret',
  enumerable: false,
  writable: true,
  configurable: true
})

const targetForHidden = {}
copyProperties(targetForHidden, sourceWithHidden)
console.log(Object.getOwnPropertyDescriptor(targetForHidden, 'hidden'))
// { value: 'secret', writable: true, enumerable: false, configurable: true }

// Copies getters and setters
const sourceWithAccessor = {
  _value: 42,
  get value() { return this._value },
  set value(v) { this._value = v }
}

const targetForAccessor = {}
copyProperties(targetForAccessor, sourceWithAccessor)
console.log((targetForAccessor as any).value) // 42
```

**Since:** 1.0.0

### curry()

Creates a curried version of a function that can be called with partial arguments. 创建函数的柯里化版本，可以使用部分参数调用。 Currying transforms a function that takes multiple arguments into a sequence of functions that each take a single argument. This enables partial application and function composition patterns. 柯里化将接受多个参数的函数转换为一系列每个都接受单个参数的函数。 这使得部分应用和函数组合模式成为可能。

**Parameters:**
- `fn: (...args) => any` - The function to be curried / 要柯里化的函数

**Returns:**
- A curried function / 柯里化的函数 - > (...`args`): (...`args`) => `any`

**Example:**
```typescript
// Basic currying / 基本柯里化
const add = (a: number, b: number, c: number) => a + b + c
const curriedAdd = curry(add)

// Partial application / 部分应用
const add5 = curriedAdd(5)
const add5And3 = add5(3)
console.log(add5And3(2)) // 10

// Or call with all arguments at once / 或一次性传入所有参数
console.log(curriedAdd(1)(2)(3)) // 6
console.log(curriedAdd(1, 2, 3)) // 6

// Practical example: creating specialized functions / 实际示例：创建专用函数
const multiply = (a: number, b: number, c: number) => a * b * c
const curriedMultiply = curry(multiply)

const double = curriedMultiply(2)
const doubleAndTriple = double(3)
console.log(doubleAndTriple(4)) // 24

// Function composition / 函数组合
const formatMessage = curry((prefix: string, type: string, message: string) =>
  `[${prefix}] ${type}: ${message}`
)

const logError = formatMessage('APP')('ERROR')
const logWarning = formatMessage('APP')('WARNING')

console.log(logError('Something went wrong')) // "[APP] ERROR: Something went wrong"
console.log(logWarning('This is a warning')) // "[APP] WARNING: This is a warning"
```

**Since:** 1.0.0

### debounce()

Creates a debounced function that waits for the specified delay after the last call before executing. 创建一个防抖函数，在最后一次调用后等待指定延迟时间再执行。

**Parameters:**
- `fn: (...args) => void` - The function to wrap. / 要包装的函数
- `delay: number` - The delay time (in milliseconds) before the function is executed. / 函数执行前的延迟时间（毫秒）
- `immediate?: boolean` - Whether to execute the function immediately on the first call. / 是否在第一次调用时立即执行函数

**Returns:**
- [DebouncedFunction](../interfaces/DebouncedFunction.md)\<TArgs\> - The wrapped debounced function. / 包装后的防抖函数

**Example:**
```typescript
// Basic debounce
const debouncedFn = debounce(() => {
  console.log('Called after delay!');
}, 1000);

// With immediate execution
const immediateDebounced = debounce(() => {
  console.log('Called immediately!');
}, 1000, true);

// Search input example
const searchDebounced = debounce((query: string) => {
  performSearch(query);
}, 300);

// Cancel if needed
searchDebounced('hello');
searchDebounced.cancel(); // Cancels the pending call

// Force execution
searchDebounced('world');
searchDebounced.flush(); // Executes immediately
```

### deepClone()

Creates a deep clone of the given value, handling circular references. 创建给定值的深度克隆，处理循环引用。 This function recursively copies all properties of objects and arrays, including nested objects, while maintaining the original data types for dates, regular expressions, and other built-in objects. 此函数递归复制对象和数组的所有属性，包括嵌套对象， 同时保持日期、正则表达式和其他内置对象的原始数据类型。

**Parameters:**
- `obj: T` - The value to deep clone / 要深度克隆的值

**Returns:**
- T - A deep copy of the input value / 输入值的深度副本

**Example:**
```typescript
const original = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'gaming'],
  address: { city: 'New York', zip: '10001' },
  createdAt: new Date(),
  pattern: /test/gi
}

const cloned = deepClone(original)
cloned.hobbies.push('swimming') // doesn't affect original
console.log(original.hobbies) // ['reading', 'gaming']

// Handles circular references
const circular: any = { name: 'test' }
circular.self = circular
const clonedCircular = deepClone(circular) // works without infinite recursion
```

**Since:** 1.0.0

### difference()

Returns an array of values from the first array that are not present in the second array. 返回第一个数组中不存在于第二个数组中的值组成的数组。

**Parameters:**
- `arr: T[]` - The array to inspect / 要检查的数组
- `values: T[] = []` - The values to exclude from the result / 要从结果中排除的值

**Returns:**
- T[] - Array of values not present in the exclusion array / 不存在于排除数组中的值组成的数组

**Example:**
```typescript
const numbers = [1, 2, 3, 4, 5]
const toExclude = [3, 4, 5, 6, 7]
difference(numbers, toExclude) // [1, 2]

const fruits = ['apple', 'banana', 'orange', 'grape']
const citrus = ['orange', 'lemon', 'lime']
difference(fruits, citrus) // ['apple', 'banana', 'grape']

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]
const activeUsers = [{ id: 2, name: 'Bob' }]
difference(users, activeUsers) // [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// Empty exclusion array returns original array
difference([1, 2, 3], []) // [1, 2, 3]

// No matches returns original array
difference([1, 2, 3], [4, 5, 6]) // [1, 2, 3]
```

**Since:** 1.0.0

### each()

Iterates over a collection and applies a function to each element. 遍历集合并对每个元素应用函数。 This function provides a unified interface for iterating over different types of collections including arrays, objects, Maps, Sets, and strings. The iteration can be stopped early by returning false from the callback. 此函数为遍历不同类型的集合提供统一接口，包括数组、对象、Map、Set和字符串。 可以通过从回调函数返回false来提前停止迭代。

**Parameters:**
- `collection: Collection\<V, K\>` - The collection to iterate over / 要遍历的集合
- `callbackfn: (value, key, collection) => undefined \| boolean \| void` - The function to apply to each element / 应用于每个元素的函数

**Returns:**
- boolean - True if all iterations complete, false if stopped early / 如果所有迭代完成返回true，如果提前停止返回false

**Example:**
```typescript
// Array iteration / 数组遍历
const numbers = [1, 2, 3, 4, 5]
each(numbers, (value, index) => {
  console.log(`numbers[${index}] = ${value}`)
  return value < 3 // Stop when value >= 3
})

// Object iteration / 对象遍历
const user = { name: 'John', age: 30, city: 'New York' }
each(user, (value, key) => {
  console.log(`${key}: ${value}`)
})

// Map iteration / Map遍历
const userMap = new Map([
  ['name', 'John'],
  ['age', 30],
  ['city', 'New York']
])
each(userMap, (value, key) => {
  console.log(`${key} => ${value}`)
})

// Set iteration / Set遍历
const uniqueNumbers = new Set([1, 2, 3, 4, 5])
each(uniqueNumbers, (value, index) => {
  console.log(`Item ${index}: ${value}`)
})

// String iteration / 字符串遍历
each('hello', (char, index) => {
  console.log(`char[${index}] = ${char}`)
})
```

**Since:** 1.0.0

### extendDeep()

Recursively extends an object by deeply copying properties from parent to child. 通过将属性从父对象深度复制到子对象来递归扩展对象。

**Parameters:**
- `parent: ObjectType\<any\>` - The parent object to copy from / 要复制的父对象
- `child: ObjectType\<any\> = {}` - The child object to merge into / 要合并到的子对象

**Returns:**
- ObjectType\<any\> - The extended child object / 扩展后的子对象

**Example:**
```typescript
const parent = {
  a: { b: 1, c: 2 },
  d: [1, 2, 3],
  e: 'hello'
}
const child = { a: { c: 3, f: 4 } }

const result = extendDeep(parent, child)
console.log(result)
// {
//   a: { b: 1, c: 2, f: 4 },
//   d: [1, 2, 3],
//   e: 'hello'
// }

// Arrays are replaced, not merged
const parent2 = { arr: [1, 2] }
const child2 = {}
extendDeep(parent2, child2) // { arr: [] } (new empty array)

// Nested objects are deeply copied
const parent3 = { user: { name: 'John', settings: { theme: 'dark' } } }
const child3 = {}
extendDeep(parent3, child3) // { user: { name: 'John', settings: { theme: 'dark' } } }
```

**Since:** 1.0.0

### filter()

Filters elements of an array or object based on a callback function. 根据回调函数过滤数组或对象的元素。

**Parameters:**
- `collection: T` - The array or object to filter / 要过滤的数组或对象
- `callback: (value, indexOrKey, collection) => boolean` - The function to call for each element / 为每个元素调用的函数

**Returns:**
- T - A new array or object with filtered elements / 包含过滤元素的新数组或对象

**Example:**
```typescript
// Array filtering
const numbers = [1, 2, 3, 4, 5]
const evenNumbers = filter(numbers, (num) => num % 2 === 0)
console.log(evenNumbers) // [2, 4]

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
]
const adults = filter(users, (user) => user.age >= 18)
console.log(adults) // [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]

// Object filtering
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
const evenValues = filter(obj, (value) => value % 2 === 0)
console.log(evenValues) // { b: 2, d: 4 }

const config = { debug: true, timeout: 5000, retries: 3, verbose: false }
const booleanSettings = filter(config, (value) => typeof value === 'boolean')
console.log(booleanSettings) // { debug: true, verbose: false }
```

**Since:** 1.0.0

### flatten()

Flattens a nested array into a single-level array. 将嵌套数组展平为单级数组。 This function recursively flattens all nested arrays regardless of depth. It modifies the input array during processing, so pass a copy if you need to preserve the original array. 此函数递归展平所有嵌套数组，无论深度如何。 它在处理过程中会修改输入数组，如果需要保留原始数组，请传递副本。

**Parameters:**
- `array: (T \| T[])[]` - The array to flatten / 要展平的数组

**Returns:**
- T[] - The flattened array / 展平后的数组

**Example:**
```typescript
// Basic flattening / 基本展平
const nested = [1, [2, 3], [4, [5, 6]]]
flatten([...nested]) // [1, 2, 3, 4, 5, 6]

// Mixed types / 混合类型
const mixed = ['a', ['b', 'c'], ['d', ['e', 'f']]]
flatten([...mixed]) // ['a', 'b', 'c', 'd', 'e', 'f']

// Deep nesting / 深度嵌套
const deep = [1, [2, [3, [4, [5]]]]]
flatten([...deep]) // [1, 2, 3, 4, 5]

// Empty arrays / 空数组
const withEmpty = [1, [], [2, []], 3]
flatten([...withEmpty]) // [1, 2, 3]
```

**Since:** 1.0.0

### getGlobal()

Returns the global object for the current runtime environment. 返回当前运行时环境的全局对象。

**Returns:**
- unknown - The global object (window, self, global, or globalThis) / 全局对象

**Example:**
```typescript
const globalObj = getGlobal()

// Check runtime environment
if (typeof (globalObj as any).process === 'object') {
  console.log('Running in Node.js')
} else if (typeof (globalObj as any).window === 'object') {
  console.log('Running in browser')
} else if (typeof (globalObj as any).self === 'object') {
  console.log('Running in Web Worker')
}

// Access global variables safely
const global = getGlobal() as any
if (global.localStorage) {
  global.localStorage.setItem('key', 'value')
}

// Works in different environments:
// - Browser: returns window
// - Web Worker: returns self
// - Node.js: returns global
// - Modern environments: returns globalThis
```

**Since:** 1.0.0

### getType()

Gets the precise type of a value using Object.prototype.toString. 使用Object.prototype.toString获取值的精确类型。

**Parameters:**
- `value: any` - The value to get the type of / 要获取类型的值

**Returns:**
- string - The type name of the value / 值的类型名称

**Example:**
```typescript
getType(42) // "Number"
getType("hello") // "String"
getType([1, 2, 3]) // "Array"
getType({}) // "Object"
getType(null) // "Null"
getType(undefined) // "Undefined"
getType(/regex/) // "RegExp"
getType(new Date()) // "Date"
getType(() => {}) // "Function"
getType(new Map()) // "Map"
getType(new Set()) // "Set"
```

**Since:** 1.0.0

### hasOwnProperty()

Safely checks if an object has a property defined on itself (not inherited). 安全地检查对象是否具有自身定义的属性（非继承）。

**Parameters:**
- `obj: unknown` - The object to check / 要检查的对象
- `key: PropertyKey` - The property key to check for / 要检查的属性键

**Returns:**
- boolean - True if the object has the own property / 如果对象具有自身属性则返回true

**Example:**
```typescript
const obj = { foo: 42, bar: 'hello' }
const arr = [1, 2, 3]

hasOwnProperty(obj, 'foo') // true
hasOwnProperty(obj, 'toString') // false (inherited from Object.prototype)
hasOwnProperty(obj, 'hasOwnProperty') // false (inherited)

hasOwnProperty(arr, '0') // true
hasOwnProperty(arr, 0) // true (number key)
hasOwnProperty(arr, 'length') // true
hasOwnProperty(arr, 'push') // false (inherited from Array.prototype)

// Safe for objects without prototype
const nullObj = Object.create(null)
nullObj.prop = 'value'
hasOwnProperty(nullObj, 'prop') // true

// Works with symbols
const sym = Symbol('test')
const objWithSymbol = { [sym]: 'value' }
hasOwnProperty(objWithSymbol, sym) // true
```

**Since:** 1.0.0

### idleIterator()

Iterates over an array during browser idle time to avoid blocking the main thread. 在浏览器空闲时间迭代数组，避免阻塞主线程。

**Parameters:**
- `array: T[]` - The array to iterate over / 要迭代的数组
- `callbackfn: (item, index) => void` - Function to execute on each item / 对每个项目执行的函数

**Example:**
```typescript
// Process large dataset without blocking UI
const largeDataset = Array.from({ length: 10000 }, (_, i) => i)

idleIterator(largeDataset, (item, index) => {
  // Perform heavy computation on each item
  console.log(`Processing item ${item} at index ${index}`)
  // This won't block the UI because it runs during idle time
})

// Process user data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  // ... thousands more users
]

idleIterator(users, (user, index) => {
  // Validate email, update UI, etc.
  if (user.email.includes('@')) {
    console.log(`Valid user: ${user.name}`)
  }
})

// Image processing example
const imageUrls = ['img1.jpg', 'img2.jpg'] // ... many more

idleIterator(imageUrls, (url, index) => {
  // Preload images during idle time
  const img = new Image()
  img.src = url
  console.log('Preloaded image ' + (index + 1) + '/' + imageUrls.length)
})

// Note: Uses requestIdleCallback for optimal performance
// Falls back gracefully if not available in environment
```

**Since:** 1.0.0

### isArguments()

Checks if a value is an arguments object. 检查值是否为arguments对象。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is an arguments object / 如果值是arguments对象则返回true

**Example:**
```typescript
// Inside a function, arguments is an arguments object
function testFunction() {
  console.log(isArguments(arguments)) // true
  console.log(isArguments([1, 2, 3])) // false
}

// Arrow functions don't have arguments object
const arrowFunc = () => {
  // console.log(isArguments(arguments)) // ReferenceError
}

// Test with various values
isArguments([1, 2, 3]) // false (regular array)
isArguments('arguments') // false (string)
isArguments({ 0: 'a', 1: 'b', length: 2 }) // false (array-like object)
isArguments(null) // false
isArguments(undefined) // false

// Real arguments object example
function sum() {
  if (isArguments(arguments)) {
    return Array.from(arguments).reduce((a, b) => a + b, 0)
  }
  return 0
}
sum(1, 2, 3, 4) // 10
```

**Since:** 1.0.0

### isArray()

Checks if a value is an array. 检查值是否为数组。 This function uses the native Array.isArray when available, falling back to a type check for older environments. 此函数在可用时使用原生Array.isArray，在较旧环境中回退到类型检查。

**Parameters:**
- `value: any` - The value to check / 要检查的值

**Returns:**
- value is any[] - True if the value is an array / 如果值是数组则返回true

**Example:**
```typescript
isArray([1, 2, 3]) // true
isArray([]) // true
isArray(new Array(5)) // true
isArray('abc') // false
isArray({ 0: 'a', 1: 'b', length: 2 }) // false (array-like but not array)
isArray(null) // false
isArray(undefined) // false
isArray(arguments) // false (arguments object is not an array)
```

**Since:** 1.0.0

### isArrayBuffer()

Checks if a value is an ArrayBuffer object. 检查值是否为ArrayBuffer对象。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is unknown[] - True if the value is an ArrayBuffer object / 如果值是ArrayBuffer对象则返回true

**Example:**
```typescript
// Creating ArrayBuffers
const buffer1 = new ArrayBuffer(16)
const buffer2 = new ArrayBuffer(8)

isArrayBuffer(buffer1) // true
isArrayBuffer(buffer2) // true

// Test with related types
const uint8Array = new Uint8Array(buffer1)
const dataView = new DataView(buffer1)

isArrayBuffer(uint8Array) // false (typed array, not ArrayBuffer)
isArrayBuffer(dataView) // false (DataView, not ArrayBuffer)
isArrayBuffer(uint8Array.buffer) // true (the underlying buffer)

// Test with other types
isArrayBuffer([1, 2, 3]) // false (regular array)
isArrayBuffer('buffer') // false (string)
isArrayBuffer(null) // false
isArrayBuffer(undefined) // false
isArrayBuffer({}) // false

// Practical usage
function processBuffer(data: unknown) {
  if (isArrayBuffer(data)) {
    console.log(`ArrayBuffer size: ${data.byteLength} bytes`)
    return new Uint8Array(data)
  }
  throw new Error('Expected ArrayBuffer')
}
```

**Since:** 1.0.0

### isArrayLike()

Checks if a value is array-like (has length property and is indexable). 检查值是否类似数组（具有length属性且可索引）。

**Parameters:**
- `value: any` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is array-like / 如果值类似数组则返回true

**Example:**
```typescript
// Array-like values
isArrayLike('abc') // true (strings are array-like)
isArrayLike([1, 2, 3]) // true (arrays are array-like)
isArrayLike({ 0: 'a', 1: 'b', 2: 'c', length: 3 }) // true (object with length)

// In browser environment
isArrayLike(document.querySelectorAll('div')) // true (NodeList)
isArrayLike(document.getElementsByTagName('p')) // true (HTMLCollection)

// Function arguments object
function testArgs() {
  console.log(isArrayLike(arguments)) // true
}

// Typed arrays
isArrayLike(new Uint8Array([1, 2, 3])) // true
isArrayLike(new Int32Array(5)) // true

// Non-array-like values
isArrayLike(function() {}) // false (functions)
isArrayLike({}) // false (no length property)
isArrayLike({ length: 'not a number' }) // false (length not finite)
isArrayLike(null) // false
isArrayLike(undefined) // false
isArrayLike(42) // false

// Edge cases
isArrayLike({ length: -1 }) // false (negative length)
isArrayLike({ length: Infinity }) // false (infinite length)
```

**Since:** 1.0.0

### isArrayLikeObject()

Checks if a value is an array-like object (not string or function). 检查值是否为类数组对象（非字符串或函数）。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is an array-like object / 如果值是类数组对象则返回true

**Example:**
```typescript
// Array-like objects
isArrayLikeObject([1, 2, 3]) // true (arrays)
isArrayLikeObject({ 0: 'a', 1: 'b', length: 2 }) // true (object with length)
isArrayLikeObject(new Uint8Array([1, 2, 3])) // true (typed arrays)

// In browser environment
isArrayLikeObject(document.querySelectorAll('div')) // true (NodeList)
isArrayLikeObject(document.getElementsByTagName('p')) // true (HTMLCollection)

// Function arguments object
function testArgs() {
  console.log(isArrayLikeObject(arguments)) // true
}

// Not array-like objects
isArrayLikeObject('abc') // false (string, not object)
isArrayLikeObject(function() {}) // false (function)
isArrayLikeObject({}) // false (no length property)
isArrayLikeObject(null) // false (not object)
isArrayLikeObject(undefined) // false (not object)
isArrayLikeObject(42) // false (not object)

// Useful for filtering out strings and functions
const mixedValues = [
  [1, 2, 3],
  'hello',
  { 0: 'a', length: 1 },
  function() {},
  new Uint8Array([1, 2])
]

const arrayLikeObjects = mixedValues.filter(isArrayLikeObject)
// Results: [[1, 2, 3], { 0: 'a', length: 1 }, Uint8Array]
```

**Since:** 1.0.0

### isBoolean()

Checks if a value is a boolean. 检查值是否为布尔值。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is boolean - True if the value is a boolean / 如果值是布尔值则返回true

**Example:**
```typescript
isBoolean(true) // true
isBoolean(false) // true
isBoolean(Boolean(1)) // true
isBoolean(new Boolean(false)) // true
isBoolean(0) // false
isBoolean(1) // false
isBoolean('true') // false
isBoolean('false') // false
isBoolean(null) // false
isBoolean(undefined) // false
```

**Since:** 1.0.0

### isDate()

Checks if a value is a Date object. 检查值是否为Date对象。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is Date - True if the value is a Date object / 如果值是Date对象则返回true

**Example:**
```typescript
isDate(new Date()) // true
isDate(new Date('2023-01-01')) // true
isDate(new Date(Date.now())) // true
isDate(Date.now()) // false (number timestamp)
isDate('2022-03-30') // false
isDate(1640995200000) // false
isDate({}) // false
isDate(null) // false
isDate(undefined) // false

// Note: Invalid dates are still Date objects
isDate(new Date('invalid')) // true
```

**Since:** 1.0.0

### isDecimal()

Checks if a value is a decimal number (has fractional part). 检查值是否为小数（带有小数部分）。

**Parameters:**
- `num: unknown` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is a decimal number / 如果值是小数则返回true

**Example:**
```typescript
isDecimal(1.5) // true
isDecimal(3.14) // true
isDecimal(-2.5) // true
isDecimal(0.1) // true
isDecimal(3) // false
isDecimal(0) // false
isDecimal(-10) // false
isDecimal(NaN) // false
isDecimal(Infinity) // false
isDecimal('1.23') // false
isDecimal(null) // false
isDecimal(undefined) // false
```

**Since:** 1.0.0

### isDefined()

Checks if a value is defined (not undefined or null). 检查值是否已定义（非undefined或null）。

**Returns:**
- val is T - True if the value is defined / 如果值已定义则返回true

**Example:**
```typescript
isDefined(1) // true
isDefined('hello') // true
isDefined(false) // true
isDefined(0) // true
isDefined('') // true
isDefined([]) // true
isDefined({}) // true
isDefined(null) // false
isDefined(undefined) // false
isDefined(void 0) // false

// Useful for filtering arrays
const arr = [1, null, 'test', undefined, 0]
const filtered = arr.filter(isDefined) // [1, 'test', 0]
```

**Since:** 1.0.0

### isElement()

Checks if a value is a DOM Element or HTMLDocument object. 检查值是否为DOM元素或HTMLDocument对象。

**Parameters:**
- `o: unknown` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is an Element or HTMLDocument / 如果值是元素或HTMLDocument则返回true

**Example:**
```typescript
// DOM elements
isElement(document.body) // true
isElement(document.documentElement) // true (html element)
isElement(document.querySelector('div')) // true (if div exists)
isElement(document.getElementById('myId')) // true (if element exists)

// Created elements
const div = document.createElement('div')
const span = document.createElement('span')
isElement(div) // true
isElement(span) // true

// HTML Document
isElement(document) // true (HTMLDocument)

// Various element types
isElement(document.querySelector('input')) // true
isElement(document.querySelector('canvas')) // true
isElement(document.querySelector('svg')) // true

// Non-elements
isElement(window) // false (Window object)
isElement(document.querySelector('nonexistent')) // false (null)
isElement('div') // false (string)
isElement({ nodeType: 1 }) // false (plain object)
isElement(null) // false
isElement(undefined) // false

// Text nodes and other node types
const textNode = document.createTextNode('hello')
const comment = document.createComment('comment')
isElement(textNode) // false (Text node, not Element)
isElement(comment) // false (Comment node, not Element)

// Practical usage
function appendToElement(parent: unknown, child: HTMLElement) {
  if (isElement(parent)) {
    parent.appendChild(child)
  } else {
    throw new Error('Parent must be a DOM element')
  }
}
```

**Since:** 1.0.0

### isEmpty()

Checks if a value is empty according to JavaScript's notion of emptiness. 根据JavaScript的空值概念检查值是否为空。 A value is considered empty if it is: - `undefined` or `null` - An empty string, array, or array-like object - An empty Map or Set object - An object with no own enumerable properties 以下情况被认为是空值： - `undefined` 或 `null` - 空字符串、数组或类数组对象 - 空的Map或Set对象 - 没有自有可枚举属性的对象

**Parameters:**
- `value: any` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is empty / 如果值为空则返回true

**Example:**
```typescript
// Primitive empty values / 原始空值
isEmpty(undefined) // true
isEmpty(null) // true
isEmpty('') // true
isEmpty(0) // false (zero is not empty)
isEmpty(false) // false (false is not empty)

// Collections / 集合
isEmpty([]) // true
isEmpty([1, 2, 3]) // false
isEmpty({}) // true
isEmpty({ key: 'value' }) // false

// Built-in objects / 内置对象
isEmpty(new Map()) // true
isEmpty(new Map([['key', 'value']])) // false
isEmpty(new Set()) // true
isEmpty(new Set([1, 2, 3])) // false

// Array-like objects / 类数组对象
isEmpty(arguments) // true (if arguments is empty)
isEmpty({ length: 0 }) // true
isEmpty({ length: 1, 0: 'item' }) // false
```

**Since:** 1.0.0

### isEqual()

Performs deep equality comparison between two values. 执行两个值之间的深度相等比较。

**Parameters:**
- `value: any` - The first value to compare / 要比较的第一个值
- `other: any` - The second value to compare / 要比较的第二个值

**Returns:**
- boolean - True if the values are deeply equal / 如果值深度相等则返回true

**Example:**
```typescript
// Primitive values
isEqual(1, 1) // true
isEqual('hello', 'hello') // true
isEqual(true, true) // true
isEqual(null, null) // true
isEqual(undefined, undefined) // true

// Different primitive values
isEqual(1, 2) // false
isEqual('hello', 'world') // false
isEqual(null, undefined) // false

// Arrays
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual(['a', 'b'], ['a', 'b']) // true
isEqual([1, 2], [1, 2, 3]) // false (different lengths)
isEqual([1, 2], [2, 1]) // false (different order)

// Nested arrays
isEqual([[1, 2], [3, 4]], [[1, 2], [3, 4]]) // true
isEqual([[1, 2], [3, 4]], [[1, 2], [3, 5]]) // false

// Objects
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }) // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }) // true (key order doesn't matter)
isEqual({ a: 1 }, { a: 1, b: 2 }) // false (different keys)

// Nested objects
isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } }) // true
isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }) // false

// Mixed structures
const obj1 = { users: [{ name: 'Alice', age: 25 }], count: 1 }
const obj2 = { users: [{ name: 'Alice', age: 25 }], count: 1 }
isEqual(obj1, obj2) // true
```

**Since:** 1.0.0

### isEqualWith()

Performs deep comparison with a custom comparator function. 使用自定义比较函数执行深度比较。

**Parameters:**
- `value: T` - The first value to compare / 要比较的第一个值
- `other: T` - The second value to compare / 要比较的第二个值
- `fn: (v1, v2) => boolean` - Custom comparator function / 自定义比较函数

**Returns:**
- boolean - True if values are equivalent according to comparator / 如果根据比较器值相等则返回true

**Example:**
```typescript
// Custom comparison for arrays (only compare lengths)
const compareArraysByLength = (v1: any, v2: any) => {
  if (Array.isArray(v1) && Array.isArray(v2)) {
    return v1.length === v2.length
  }
  return undefined // Use default comparison
}

isEqualWith([1, 2, 3], [4, 5, 6], compareArraysByLength) // true (same length)
isEqualWith([1, 2], [4, 5, 6], compareArraysByLength) // false (different length)

// Custom comparison for objects (ignore specific keys)
const compareIgnoringId = (v1: any, v2: any) => {
  if (typeof v1 === 'object' && typeof v2 === 'object' && v1 && v2) {
    const { id: id1, ...rest1 } = v1
    const { id: id2, ...rest2 } = v2
    return isEqual(rest1, rest2)
  }
  return undefined
}

const user1 = { id: 1, name: 'Alice', email: 'alice@example.com' }
const user2 = { id: 2, name: 'Alice', email: 'alice@example.com' }
isEqualWith(user1, user2, compareIgnoringId) // true (ignore id field)

// Case-insensitive string comparison
const caseInsensitiveCompare = (v1: any, v2: any) => {
  if (typeof v1 === 'string' && typeof v2 === 'string') {
    return v1.toLowerCase() === v2.toLowerCase()
  }
  return undefined
}

isEqualWith('Hello', 'HELLO', caseInsensitiveCompare) // true
isEqualWith('Hello', 'World', caseInsensitiveCompare) // false

// Falls back to default comparison if no custom function provided
isEqualWith([1, 2, 3], [1, 2, 3], null) // true (uses isEqual internally)
```

**Since:** 1.0.0

### isError()

Checks if a value is an Error instance. 检查值是否为Error实例。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is Error - True if the value is an Error instance / 如果值是Error实例则返回true

**Example:**
```typescript
isError(new Error('Example error')) // true
isError(new TypeError('Type error')) // true
isError(new ReferenceError()) // true
isError(new SyntaxError()) // true
isError(new RangeError()) // true

const customError = class extends Error {}
isError(new customError()) // true

isError('Error') // false
isError({ message: 'error' }) // false
isError(null) // false
isError(undefined) // false
```

**Since:** 1.0.0

### isFunction()

Checks if a value is a function. 检查值是否为函数。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is (args: any[]) => any - True if the value is a function / 如果值是函数则返回true

**Example:**
```typescript
isFunction(() => {}) // true
isFunction(function() {}) // true
isFunction(async function() {}) // true
isFunction(function* generator() {}) // true
isFunction(class MyClass {}) // true
isFunction(Array.isArray) // true
isFunction(console.log) // true
isFunction(42) // false
isFunction('function') // false
isFunction({}) // false
isFunction([]) // false
```

**Since:** 1.0.0

### isNil()

Checks if a value is null or undefined. 检查值是否为null或undefined。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is undefined \| null - True if the value is null or undefined / 如果值是null或undefined则返回true

**Example:**
```typescript
isNil(null) // true
isNil(undefined) // true
isNil(void 0) // true (void 0 is undefined)
isNil('') // false
isNil(0) // false
isNil(false) // false
isNil([]) // false
isNil({}) // false
isNil(NaN) // false

// Useful for optional chaining checks
const obj = { a: null, b: undefined, c: 'value' }
Object.keys(obj).filter(key => !isNil(obj[key])) // ['c']
```

**Since:** 1.0.0

### isNumber()

Checks if a value is a number (including NaN and Infinity). 检查值是否为数字（包括NaN和Infinity）。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is number - True if the value is a number / 如果值是数字则返回true

**Example:**
```typescript
isNumber(42) // true
isNumber(3.14) // true
isNumber(NaN) // true (NaN is type 'number')
isNumber(Infinity) // true
isNumber(-Infinity) // true
isNumber('42') // false
isNumber(null) // false
isNumber(undefined) // false
isNumber([]) // false
isNumber({}) // false
```

**Since:** 1.0.0

### isObject()

Checks if a value is an object (including arrays, but excluding null). 检查值是否为对象（包括数组，但排除null）。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is Record<string, unknown> - True if the value is an object / 如果值是对象则返回true

**Example:**
```typescript
isObject({}) // true
isObject({ name: 'John' }) // true
isObject([1, 2, 3]) // true
isObject(new Date()) // true
isObject(/regex/) // true
isObject(() => {}) // true
isObject(null) // false
isObject(undefined) // false
isObject('string') // false
isObject(123) // false
```

**Since:** 1.0.0

### isObjectLike()

Checks if a value is object-like (not null and type is 'object'). 检查值是否类似对象（非null且类型为'object'）。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is object-like / 如果值类似对象则返回true

**Example:**
```typescript
// Object-like values
isObjectLike({}) // true (plain object)
isObjectLike([1, 2, 3]) // true (arrays are objects)
isObjectLike(new Date()) // true (Date objects)
isObjectLike(/regex/) // true (RegExp objects)
isObjectLike(new Error('test')) // true (Error objects)
isObjectLike(new Map()) // true (Map objects)
isObjectLike(new Set()) // true (Set objects)

// Typed arrays are object-like
isObjectLike(new Uint8Array([1, 2, 3])) // true
isObjectLike(new ArrayBuffer(8)) // true

// Not object-like values
isObjectLike(null) // false (null is not object-like)
isObjectLike(undefined) // false
isObjectLike(42) // false (number)
isObjectLike('hello') // false (string)
isObjectLike(true) // false (boolean)
isObjectLike(Symbol('test')) // false (symbol)
isObjectLike(function() {}) // false (functions are not object-like)

// Practical usage - filtering object-like values
const mixedValues = [
  {},
  [],
  42,
  'hello',
  new Date(),
  null,
  function() {}
]

const objectLikeValues = mixedValues.filter(isObjectLike)
// Results: [{}, [], new Date()]
```

**Since:** 1.0.0

### isPrimitive()

Checks if a value is a JavaScript primitive type. 检查值是否为JavaScript原始类型。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is a primitive type / 如果值是原始类型则返回true

**Example:**
```typescript
// Primitive types
isPrimitive('') // true
isPrimitive('hello') // true
isPrimitive(0) // true
isPrimitive(42) // true
isPrimitive(true) // true
isPrimitive(false) // true
isPrimitive(null) // true
isPrimitive(undefined) // true
isPrimitive(Symbol()) // true
isPrimitive(BigInt(123)) // true

// Non-primitive types (objects)
isPrimitive({}) // false
isPrimitive([]) // false
isPrimitive(function() {}) // false
isPrimitive(new Date()) // false
isPrimitive(new Error()) // false
isPrimitive(/regex/) // false
```

**Since:** 1.0.0

### isPromiseLike()

Checks if a value is promise-like (thenable). 检查值是否类似Promise（可thenable）。

**Parameters:**
- `obj: any` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is promise-like / 如果值类似Promise则返回true

**Example:**
```typescript
isPromiseLike(new Promise(resolve => resolve('done'))) // true
isPromiseLike(Promise.resolve('value')) // true
isPromiseLike(Promise.reject('error')) // true

// Thenable objects
isPromiseLike({ then: (resolve) => resolve('value') }) // true
isPromiseLike({ then: function() {} }) // true

// Non-promise-like values
isPromiseLike({}) // false
isPromiseLike(null) // false
isPromiseLike('promise') // false
isPromiseLike(123) // false
isPromiseLike([]) // false
isPromiseLike(function() {}) // false
```

**Since:** 1.0.0

### isPrototype()

Checks if a value is likely a prototype object. 检查值是否可能是原型对象。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- boolean - True if the value is a prototype object / 如果值是原型对象则返回true

**Example:**
```typescript
// Constructor function prototypes
function MyClass() {}
isPrototype(MyClass.prototype) // true

class MyModernClass {}
isPrototype(MyModernClass.prototype) // true

// Built-in prototypes
isPrototype(Object.prototype) // true
isPrototype(Array.prototype) // true
isPrototype(String.prototype) // true
isPrototype(Function.prototype) // true

// Regular objects and instances
isPrototype({}) // false (plain object)
isPrototype(new MyClass()) // false (instance, not prototype)
isPrototype([]) // false (array instance)
isPrototype('hello') // false (string primitive)

// Edge cases
isPrototype(null) // false
isPrototype(undefined) // false

// Custom objects that look like prototypes
const customProto = { constructor: MyClass }
MyClass.prototype = customProto
isPrototype(customProto) // true

// Practical usage - checking if object is a prototype
function isCustomPrototype(obj: unknown) {
  return isPrototype(obj) && obj !== Object.prototype
}

function enhancePrototype(proto: unknown) {
  if (isPrototype(proto)) {
    // Safe to add methods to prototype
    console.log('Adding methods to prototype')
  } else {
    console.log('Not a prototype object')
  }
}
```

**Since:** 1.0.0

### isRegExp()

Checks if a value is a regular expression. 检查值是否为正则表达式。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is RegExp - True if the value is a regular expression / 如果值是正则表达式则返回true

**Example:**
```typescript
isRegExp(/ab+c/i) // true
isRegExp(new RegExp('pattern')) // true
isRegExp(new RegExp('\\d+', 'g')) // true
isRegExp(/^[a-z]+$/gi) // true
isRegExp('hello') // false
isRegExp('/pattern/') // false (string, not regex)
isRegExp({}) // false
isRegExp(null) // false
isRegExp(undefined) // false
```

**Since:** 1.0.0

### isString()

Checks if a value is a string. 检查值是否为字符串。

**Parameters:**
- `value: unknown` - The value to check / 要检查的值

**Returns:**
- value is string - True if the value is a string / 如果值是字符串则返回true

**Example:**
```typescript
isString('hello') // true
isString('') // true
isString(`template`) // true
isString(123) // false
isString(null) // false
isString(undefined) // false
isString([]) // false
```

**Since:** 1.0.0

### isType()

Checks if a value's type matches the specified type string. 检查值的类型是否与指定的类型字符串匹配。

**Parameters:**
- `type: string` - The type string to check against / 要检查的类型字符串
- `value: unknown` - The value to check the type of / 要检查类型的值

**Returns:**
- boolean - True if the value's type matches the specified type string / 如果值的类型匹配指定的类型字符串则返回true

**Example:**
```typescript
isType('String', 'hello') // true
isType('Number', 42) // true
isType('Array', [1, 2, 3]) // true
isType('Object', {}) // true
isType('RegExp', /test/) // true
isType('Date', new Date()) // true
isType('Function', () => {}) // true
isType('Array', {}) // false
isType('String', 123) // false
```

**Since:** 1.0.0

### listToTree()

Converts a flat list of items to a hierarchical tree structure. 将扁平的项目列表转换为分层树结构。

**Parameters:**
- `items: T[]` - The flat list of items to convert / 要转换的扁平项目列表
- `options: ListToTreeOptions\<T\> = {}` - Configuration options for the conversion / 转换的配置选项

**Returns:**
- T[] - The hierarchical tree structure / 分层树结构

**Example:**
```typescript
interface MenuItem {
  id: number
  parentId: number | null
  name: string
  children?: MenuItem[]
}

const flatList: MenuItem[] = [
  { id: 1, parentId: null, name: 'Home' },
  { id: 2, parentId: null, name: 'Products' },
  { id: 3, parentId: 2, name: 'Electronics' },
  { id: 4, parentId: 2, name: 'Clothing' },
  { id: 5, parentId: 3, name: 'Phones' },
  { id: 6, parentId: 3, name: 'Laptops' }
]

// Basic usage
const tree = listToTree(flatList)
console.log(tree)
// [
//   { id: 1, parentId: null, name: 'Home', children: [] },
//   {
//     id: 2, parentId: null, name: 'Products',
//     children: [
//       {
//         id: 3, parentId: 2, name: 'Electronics',
//         children: [
//           { id: 5, parentId: 3, name: 'Phones', children: [] },
//           { id: 6, parentId: 3, name: 'Laptops', children: [] }
//         ]
//       },
//       { id: 4, parentId: 2, name: 'Clothing', children: [] }
//     ]
//   }
// ]

// With custom keys
const treeWithCustomKeys = listToTree(flatList, {
  idKey: 'id',
  parentKey: 'parentId',
  childrenKey: 'subItems',
  keepEmptyChildren: false
})

// With node transformation
const treeWithTransform = listToTree(flatList, {
  transformNode: (node) => ({
    ...node,
    label: node.name,
    value: node.id
  })
})
```

**Since:** 1.0.0

### lowerFirst()

Converts the first character of a string to lowercase. 将字符串的第一个字符转换为小写。

**Parameters:**
- `value: string` - The string to convert / 要转换的字符串

**Returns:**
- string - The string with the first character in lowercase / 第一个字符为小写的字符串

**Example:**
```typescript
lowerFirst('Apple') // "apple"
lowerFirst('HELLO WORLD') // "hELLO WORLD"
lowerFirst('Hello') // "hello"
lowerFirst('') // ""
lowerFirst('A') // "a"
lowerFirst('123ABC') // "123ABC"
lowerFirst('Åpple') // "åpple" (works with Unicode)
```

**Since:** 1.0.0

### mapTree()

Maps over a tree structure, transforming each node while preserving the tree hierarchy. 遍历树结构，转换每个节点同时保持树的层次结构。

**Parameters:**
- `trees: TreeNode\<T\>[]` - The tree structure to map over / 要遍历的树结构
- `mapper: (node, level, index) => R` - Function to transform each node / 转换每个节点的函数
- `options: MapTreeOptions\<T\> = {}` - Configuration options / 配置选项

**Returns:**
- TreeNode\<R\>[] - A new tree with transformed nodes / 转换后的新树

**Example:**
```typescript
// Basic usage - 基本用法
const tree = [
  { id: 1, name: 'Root', children: [
    { id: 2, name: 'Child 1' },
    { id: 3, name: 'Child 2' }
  ]}
]

const mapped = mapTree(tree, (node) => ({
  ...node,
  name: node.name.toUpperCase()
}))
// Result: [{ id: 1, name: 'ROOT', children: [
//   { id: 2, name: 'CHILD 1' },
//   { id: 3, name: 'CHILD 2' }
// ]}]

// With level and index - 使用层级和索引
const mappedWithLevel = mapTree(tree, (node, level, index) => ({
  ...node,
  path: `${level}-${index}`,
  name: `${node.name} (Level ${level})`
}))

// Custom children key - 自定义子节点键名
const customTree = [
  { id: 1, name: 'Root', items: [
    { id: 2, name: 'Child 1' }
  ]}
]

const mappedCustom = mapTree(customTree, (node) => node, {
  childrenKey: 'items'
})
```

**Since:** 1.1.0

### memoize()

Creates a memoized version of a function that caches results for identical arguments. 创建函数的记忆化版本，为相同参数缓存结果。 The memoized function will cache the result of the first call with specific arguments and return the cached result on subsequent calls with the same arguments. 记忆化函数将缓存第一次调用特定参数的结果， 并在后续使用相同参数调用时返回缓存的结果。

**Parameters:**
- `fn: T` - The function to be memoized / 要记忆化的函数

**Returns:**
- T - The memoized function / 记忆化的函数

**Example:**
```typescript
// Expensive calculation function
function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const memoizedFib = memoize(fibonacci)

console.log(memoizedFib(40)) // First call - calculates result
console.log(memoizedFib(40)) // Second call - returns cached result instantly

// Works with multiple arguments
const expensiveOperation = (a: string, b: number) => {
  console.log('Computing...')
  return `${a}-${b * 2}`
}

const memoized = memoize(expensiveOperation)
memoized('test', 5) // Logs "Computing..." and returns "test-10"
memoized('test', 5) // Returns "test-10" without logging
```

**Since:** 1.0.0

### mixin()

Creates a new class by combining multiple classes (mixin pattern). 通过组合多个类创建新类（混入模式）。

**Parameters:**
- `mixins: ...any[]` - The classes to combine / 要组合的类

**Returns:**
- any - A new class with combined functionality / 具有组合功能的新类

**Example:**
```typescript
// Define base classes
class Walkable {
  walk() {
    console.log('Walking...')
  }
}

class Swimmable {
  swim() {
    console.log('Swimming...')
  }
}

class Flyable {
  fly() {
    console.log('Flying...')
  }
}

// Create combined classes
const Duck = mixin(Walkable, Swimmable, Flyable)
const Fish = mixin(Swimmable)
const Bird = mixin(Walkable, Flyable)

// Use the mixed classes
const duck = new Duck()
duck.walk() // 'Walking...'
duck.swim() // 'Swimming...'
duck.fly() // 'Flying...'

const fish = new Fish()
fish.swim() // 'Swimming...'
// fish.walk() // Error: walk is not a function

// With properties and constructor logic
class HasName {
  constructor() {
    this.name = 'Unknown'
  }
  getName() {
    return this.name
  }
}

class HasAge {
  constructor() {
    this.age = 0
  }
  getAge() {
    return this.age
  }
}

const Person = mixin(HasName, HasAge)
const person = new Person()
console.log(person.getName()) // 'Unknown'
console.log(person.getAge()) // 0
```

**Since:** 1.0.0

### noop()

A function that does nothing and returns undefined. 一个什么都不做并返回undefined的函数。 This function is useful as a default callback or placeholder function when you need to provide a function but don't want it to do anything. 当您需要提供一个函数但不希望它执行任何操作时， 此函数作为默认回调或占位符函数很有用。

**Returns:**
- void - undefined

**Example:**
```typescript
// As a default callback / 作为默认回调
function processData(data: any[], callback = noop) {
  // Process data...
  callback()
}

// As a placeholder in event handlers / 作为事件处理程序中的占位符
const button = {
  onClick: noop, // Default empty handler
  onHover: noop
}

// In conditional assignments / 在条件赋值中
const handler = shouldHandle ? actualHandler : noop

// For testing / 用于测试
const mockCallback = noop
someFunction(data, mockCallback)
```

**Since:** 1.0.0

### pick()

Creates a new object with only the specified properties from the source object. 从源对象中创建一个只包含指定属性的新对象。 This function is useful for extracting specific properties from an object, creating a subset with only the properties you need. 此函数对于从对象中提取特定属性很有用， 创建一个只包含所需属性的子集。

**Parameters:**
- `obj: T` - The source object / 源对象
- `keys: ...K[]` - The property keys to pick / 要选择的属性键

**Returns:**
- Pick\<T, K\> - A new object with only the picked properties / 只包含选择属性的新对象

**Example:**
```typescript
// Basic usage / 基本用法
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  role: 'admin'
}

const publicUser = pick(user, 'id', 'name', 'email')
// { id: 1, name: 'John', email: 'john@example.com' }

// With different types / 不同类型
const config = {
  host: 'localhost',
  port: 3000,
  debug: true,
  secret: 'my-secret',
  timeout: 5000
}

const serverConfig = pick(config, 'host', 'port', 'timeout')
// { host: 'localhost', port: 3000, timeout: 5000 }

// Empty selection / 空选择
const empty = pick(user)
// {}
```

**Since:** 1.0.0

### sleep()

Creates a promise that resolves after the specified number of milliseconds. 创建一个在指定毫秒数后解析的Promise。 This function is useful for adding delays in async functions or creating timeouts in your code. It's a promisified version of setTimeout. 此函数对于在异步函数中添加延迟或在代码中创建超时很有用。 它是setTimeout的Promise版本。

**Parameters:**
- `ms: number` - The number of milliseconds to wait / 等待的毫秒数

**Returns:**
- Promise\<void\> - A promise that resolves after the specified time / 在指定时间后解析的Promise

**Example:**
```typescript
// Basic usage / 基本用法
console.log('Start')
await sleep(2000) // Wait 2 seconds
console.log('End')

// In a loop with delays / 在循环中使用延迟
for (let i = 0; i < 5; i++) {
  console.log(`Step ${i}`)
  await sleep(1000) // Wait 1 second between steps
}

// Timeout simulation / 超时模拟
const fetchWithTimeout = async () => {
  const timeoutPromise = sleep(5000).then(() => {
    throw new Error('Timeout')
  })

  const dataPromise = fetch('/api/data')

  return Promise.race([dataPromise, timeoutPromise])
}
```

**Since:** 1.0.0

### throttle()

Creates a throttled function that only invokes the original function at most once per every `delay` milliseconds. The throttled function has optional leading or trailing invocation. 创建一个节流函数，在每个 `delay` 毫秒内最多只调用一次原函数。 节流函数可以选择在前沿或后沿调用。

**Parameters:**
- `fn: (...args) => void` - The original function to be throttled. / 要被节流的原函数
- `delay: number` - The number of milliseconds to throttle. / 节流的毫秒数
- `options: [ThrottleOptions](../interfaces/ThrottleOptions.md) = {}` - Optional configuration for leading and/or trailing invocation. / 前沿和/或后沿调用的可选配置

**Returns:**
- Throttled function / 节流函数 - > (...`args`): `void`

**Example:**
```typescript
// Basic throttle
const throttledFn = throttle(() => {
  console.log('Called!');
}, 1000);

// With leading edge
const throttledWithLeading = throttle(() => {
  console.log('Called immediately!');
}, 1000, { leading: true });

// Search input example
const searchThrottled = throttle((query: string) => {
  performSearch(query);
}, 300);
```

### toString()

Converts a value to a string representation. 将值转换为字符串表示。

**Parameters:**
- `value: any` - The value to convert / 要转换的值

**Returns:**
- string - The string representation, or empty string for null/undefined / 字符串表示，null/undefined返回空字符串

**Example:**
```typescript
toString(123) // '123'
toString('hello') // 'hello'
toString(true) // 'true'
toString(false) // 'false'
toString([1, 2, 3]) // '1,2,3'
toString({ a: 1 }) // '[object Object]'
toString(new Date('2023-01-01')) // 'Sun Jan 01 2023...'
toString(null) // ''
toString(undefined) // ''
toString(Symbol('test')) // 'Symbol(test)'
toString(BigInt(123)) // '123'
```

**Since:** 1.0.0

### treeToList()

Flattens a tree structure into a flat array, removing the children property. 将树结构展平为平面数组，移除children属性。 This function traverses a tree structure breadth-first and collects all nodes into a single flat array. The children property is removed from each node. The order of nodes in the result follows a breadth-first traversal pattern. 此函数广度优先遍历树结构，将所有节点收集到单个平面数组中。 每个节点的children属性会被移除。结果中节点的顺序遵循广度优先遍历模式。

**Parameters:**
- `trees: T[]` - Array of tree root nodes / 树根节点数组
- `options: TreeToListOptions\<T\> = {}` - Configuration options for the conversion / 转换的配置选项

**Returns:**
- T[] - Flat array of all nodes without children properties / 不包含children属性的所有节点的平面数组

**Example:**
```typescript
interface MenuItem extends TreeNode<MenuItem> {
  id: number
  name: string
  url?: string
}

const menuTree: MenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
    children: [
      { id: 2, name: "Analytics", url: "/dashboard/analytics" },
      { id: 3, name: "Reports", url: "/dashboard/reports" }
    ]
  },
  {
    id: 4,
    name: "Settings",
    children: [
      {
        id: 5,
        name: "User Management",
        children: [
          { id: 6, name: "Add User", url: "/settings/users/add" }
        ]
      }
    ]
  }
]

// Basic usage
const flatMenu = treeToList(menuTree)
// Result (breadth-first order):
// [
//   { id: 1, name: "Dashboard", url: "/dashboard" },
//   { id: 4, name: "Settings" },
//   { id: 2, name: "Analytics", url: "/dashboard/analytics" },
//   { id: 3, name: "Reports", url: "/dashboard/reports" },
//   { id: 5, name: "User Management" },
//   { id: 6, name: "Add User", url: "/settings/users/add" }
// ]

// With custom children key
const flatMenuWithCustomKey = treeToList(menuTree, {
  childrenKey: 'subItems'
})

// With node transformation
const flatMenuWithTransform = treeToList(menuTree, {
  transformNode: (node) => ({
    ...node,
    label: node.name,
    value: node.id
  })
})
```

**Since:** 1.0.0

### tryRun()

Safely executes a function (sync or async) and returns its result, or null if an error occurs. 安全地执行函数（同步或异步）并返回其结果，如果发生错误则返回 null。

**Parameters:**
- `fn: () => T \| Promise\<T\>` - The function to execute safely / 要安全执行的函数

**Returns:**
- Promise\<null \| T\> - A Promise that resolves to the function result or null if an error occurs / 返回一个 Promise，解析为函数结果或在发生错误时返回 null

**Example:**
```typescript
// Synchronous function success case / 同步函数成功情况
const result = await tryRun(() => JSON.parse('{"name": "test"}'))
console.log(result) // { name: "test" }

// Synchronous function error case / 同步函数错误情况
const errorResult = await tryRun(() => JSON.parse('invalid json'))
console.log(errorResult) // null

// Asynchronous function success case / 异步函数成功情况
const asyncResult = await tryRun(async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return { data: 'async test' }
})
console.log(asyncResult) // { data: 'async test' }

// Asynchronous function error case / 异步函数错误情况
const asyncError = await tryRun(async () => {
  throw new Error('async error')
})
console.log(asyncError) // null

// With calculation / 计算示例
const calc = await tryRun(() => 10 / 2)
console.log(calc) // 5
```

### tryRunSync()

Safely executes a synchronous function and returns its result, or null if an error occurs. 安全地执行同步函数并返回其结果，如果发生错误则返回 null。 This function provides a safe way to execute functions that might throw errors, returning null instead of letting the error propagate. 此函数提供了一种安全执行可能抛出错误的函数的方式，在发生错误时返回 null 而不是让错误传播。

**Parameters:**
- `fn: () => T` - The synchronous function to execute safely / 要安全执行的同步函数

**Returns:**
- null \| T - The result of the function or null if an error occurs / 函数的结果，或在发生错误时返回 null

**Example:**
```typescript
// Success case / 成功情况
const result = tryRunSync(() => {
  return JSON.parse('{"name": "test"}')
})
console.log(result) // { name: "test" }

// Error case / 错误情况
const errorResult = tryRunSync(() => {
  return JSON.parse('invalid json')
})
console.log(errorResult) // null

// With complex operations / 复杂操作示例
const complexResult = tryRunSync(() => {
  const data = JSON.parse('{"values": [1, 2, 3]}')
  return data.values.reduce((sum, val) => sum + val, 0)
})
console.log(complexResult) // 6

// Error in complex operations / 复杂操作中的错误
const complexError = tryRunSync(() => {
  const data = JSON.parse('invalid json')
  return data.values.reduce((sum, val) => sum + val, 0)
})
console.log(complexError) // null

// Working with different return types / 处理不同返回类型
const numberResult = tryRunSync(() => 42)
const stringResult = tryRunSync(() => "hello")
const booleanResult = tryRunSync(() => true)
const objectResult = tryRunSync(() => ({ id: 1, name: "test" }))
```

### upperFirst()

Converts the first character of a string to uppercase. 将字符串的第一个字符转换为大写。

**Parameters:**
- `value: string` - The string to modify / 要修改的字符串

**Returns:**
- string - The string with the first character in uppercase / 第一个字符为大写的字符串

**Example:**
```typescript
upperFirst('hello world') // "Hello world"
upperFirst('HELLO WORLD') // "HELLO WORLD"
upperFirst('hello') // "Hello"
upperFirst('') // ""
upperFirst('a') // "A"
upperFirst('123abc') // "123abc"
upperFirst('åpple') // "Åpple" (works with Unicode)
```

**Since:** 1.0.0

### walkTree()

Walks through a tree structure, calling a visitor function for each node. 遍历树结构，为每个节点调用访问者函数。

**Parameters:**
- `trees: TreeNode\<T\>[]` - The tree structure to walk through / 要遍历的树结构
- `visitor: (node, level, index) => boolean \| void` - Function called for each node / 为每个节点调用的函数
- `options: WalkTreeOptions = {}` - Configuration options / 配置选项

**Returns:**
- boolean - Whether the traversal completed successfully / 遍历是否成功完成

**Example:**
```typescript
// Basic usage - 基本用法
const tree = [
  { id: 1, name: 'Root', children: [
    { id: 2, name: 'Child 1' },
    { id: 3, name: 'Child 2' }
  ]}
]

walkTree(tree, (node, level, index) => {
  console.log(`${'  '.repeat(level)}${node.name} (Level ${level}, Index ${index})`)
})
// Output:
// Root (Level 0, Index 0)
//   Child 1 (Level 1, Index 0)
//   Child 2 (Level 1, Index 1)

// Stop traversal when condition is met - 满足条件时停止遍历
walkTree(tree, (node, level, index) => {
  console.log(`Visiting: ${node.name}`)
  if (node.id === 2) {
    return false // Stop traversal
  }
})

// Custom children key - 自定义子节点键名
const customTree = [
  { id: 1, name: 'Root', items: [
    { id: 2, name: 'Child 1' }
  ]}
]

walkTree(customTree, (node) => {
  console.log(node.name)
}, { childrenKey: 'items' })

// Collect all node names - 收集所有节点名称
const names: string[] = []
walkTree(tree, (node) => {
  names.push(node.name)
})
console.log(names) // ['Root', 'Child 1', 'Child 2']
```

**Since:** 1.1.0


## Interfaces

### DebouncedFunction

### 

### 

### 

### 

### 


## Variables

### isInteger

Checks if a value is an integer. 检查值是否为整数。 Returns true if the value passed is an integer, false otherwise.

**Example:**
```typescript
isInteger(0) // true
isInteger(5) // true
isInteger(-10) // true
isInteger(42) // true
isInteger(Number.MAX_SAFE_INTEGER) // true
isInteger(2.5) // false
isInteger(3.14) // false
isInteger(NaN) // false
isInteger(Infinity) // false
isInteger(-Infinity) // false
isInteger('42') // false
isInteger(null) // false
isInteger(undefined) // false
```

**Since:** 1.0.0

<!-- AUTO-API-END -->