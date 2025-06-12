# @gvray/eskit

A toolkit for ts

## Usage

```shell
npm i @gvray/eskit
```

@gvray/eskit - v1.0.0-Beta

# @gvray/eskit - v1.0.0-Beta

## Table of contents

### References

- [includes](README.md#includes)

### Functions

- [add](README.md#add)
- [clamp](README.md#clamp)
- [clone](README.md#clone)
- [compose](README.md#compose)
- [constantize](README.md#constantize)
- [contains](README.md#contains)
- [copyProperties](README.md#copyproperties)
- [curry](README.md#curry)
- [debounced](README.md#debounced)
- [deepClone](README.md#deepclone)
- [difference](README.md#difference)
- [divide](README.md#divide)
- [each](README.md#each)
- [extendDeep](README.md#extenddeep)
- [filter](README.md#filter)
- [flatten](README.md#flatten)
- [formatMoney](README.md#formatmoney)
- [formatNumber](README.md#formatnumber)
- [getGlobal](README.md#getglobal)
- [getRandomInt](README.md#getrandomint)
- [getType](README.md#gettype)
- [hasOwnProperty](README.md#hasownproperty)
- [idleIterator](README.md#idleiterator)
- [isArguments](README.md#isarguments)
- [isArray](README.md#isarray)
- [isArrayBuffer](README.md#isarraybuffer)
- [isArrayLike](README.md#isarraylike)
- [isArrayLikeObject](README.md#isarraylikeobject)
- [isBoolean](README.md#isboolean)
- [isDate](README.md#isdate)
- [isDecimal](README.md#isdecimal)
- [isDefined](README.md#isdefined)
- [isElement](README.md#iselement)
- [isEmpty](README.md#isempty)
- [isEqual](README.md#isequal)
- [isEqualWith](README.md#isequalwith)
- [isError](README.md#iserror)
- [isEven](README.md#iseven)
- [isFunction](README.md#isfunction)
- [isInteger](README.md#isinteger)
- [isNil](README.md#isnil)
- [isNumber](README.md#isnumber)
- [isObject](README.md#isobject)
- [isObjectLike](README.md#isobjectlike)
- [isPrimitive](README.md#isprimitive)
- [isPromiseLike](README.md#ispromiselike)
- [isPrototype](README.md#isprototype)
- [isRegExp](README.md#isregexp)
- [isString](README.md#isstring)
- [isType](README.md#istype)
- [listToTree](README.md#listtotree)
- [lowerFirst](README.md#lowerfirst)
- [max](README.md#max)
- [memoize](README.md#memoize)
- [min](README.md#min)
- [mixin](README.md#mixin)
- [multiply](README.md#multiply)
- [noop](README.md#noop)
- [pick](README.md#pick)
- [range](README.md#range)
- [tryRun](README.md#tryrun)
- [tryRunSync](README.md#tryrunsync)
- [shuffle](README.md#shuffle)
- [sleep](README.md#sleep)
- [subtract](README.md#subtract)
- [throttle](README.md#throttle)
- [toString](README.md#tostring)
- [treeToList](README.md#treetolist)
- [upperFirst](README.md#upperfirst)

## References

### includes

Renames and re-exports [contains](README.md#contains)

## Functions

### add

▸ **add**(`a`, `b`): `number`

Adds two numbers with fixed precision.

**`Since`**

1.0.0

**`Example`**

```typescript
add(0.1, 0.2) // returns 0.3
```

#### Parameters

| Name | Type     | Description               |
| :--- | :------- | :------------------------ |
| `a`  | `number` | The first number to add.  |
| `b`  | `number` | The second number to add. |

#### Returns

`number`

The result of adding the two numbers.

#### Defined in

[packages/eskit/src/add.ts:14](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/add.ts#L14)

---

### clamp

▸ **clamp**(`num`, `min`, `max`): `number`

Limits a number to be within a certain range.

**`Since`**

1.0.0

**`Example`**

```typescript
// returns -5
clamp(-10, -5, 5)
```

**`Example`**

```typescript
// returns 5
clamp(10, -5, 5)
```

#### Parameters

| Name  | Type     | Description                      |
| :---- | :------- | :------------------------------- |
| `num` | `number` | The number to clamp.             |
| `min` | `number` | The lower boundary of the range. |
| `max` | `number` | The upper boundary of the range. |

#### Returns

`number`

The clamped number.

#### Defined in

[packages/eskit/src/clamp.ts:22](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/clamp.ts#L22)

---

### clone

▸ **clone**<`T`\>(`obj`): `T`

Create a clone of the given object.

**`Example`**

```ts
const obj = { a: 1, b: { c: 2 } }
const cloneObj = clone(obj)
console.log(cloneObj) // { a: 1, b: { c: 2 } }
```

**`Since`**

1.0.0

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type | Description          |
| :---- | :--- | :------------------- |
| `obj` | `T`  | The object to clone. |

#### Returns

`T`

The cloned object.

#### Defined in

[packages/eskit/src/clone.ts:14](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/clone.ts#L14)

---

### compose

▸ **compose**<`T`\>(`...funcs`): (`arg`: `T`) => `T`

Composes an array of functions into a single function from right to left.

**`Since`**

1.0.0

**`Example`**

```typescript
const add = (a: number) => (b: number) => a + b
const multiplyByTwo = (a: number) => a * 2
const addAndMultiply = compose(multiplyByTwo, add(1), add(2))
const result = addAndMultiply(3) // (3 + 2 + 1) * 2 = 12
```

#### Type parameters

| Name | Description                             |
| :--- | :-------------------------------------- |
| `T`  | The type of the input and output value. |

#### Parameters

| Name       | Type                  | Description                       |
| :--------- | :-------------------- | :-------------------------------- |
| `...funcs` | (`arg`: `T`) => `T`[] | An array of functions to compose. |

#### Returns

`fn`

A new function that will execute the input functions in reverse order.

▸ (`arg`): `T`

##### Parameters

| Name  | Type |
| :---- | :--- |
| `arg` | `T`  |

##### Returns

`T`

#### Defined in

[packages/eskit/src/compose.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/compose.ts#L17)

---

### constantize

▸ **constantize**<`T`\>(`obj`): `void`

Freezes an object and recursively freezes its enumerable properties (but not their children).

**`Since`**

1.0.0

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name  | Type | Description              |
| :---- | :--- | :----------------------- |
| `obj` | `T`  | The object to be frozen. |

#### Returns

`void`

#### Defined in

[packages/eskit/src/constantize.ts:7](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/constantize.ts#L7)

---

### contains

▸ **contains**(`arr`, `value`, `position?`): `boolean`

Determines whether an array or string contains a specified value.

**`Example`**

```typescript
const arr = [1, 2, 3, 4]
contains(arr, 3) // Returns true
contains('hello', 'w', 3) // Returns false
```

#### Parameters

| Name       | Type                | Default value | Description                                                 |
| :--------- | :------------------ | :------------ | :---------------------------------------------------------- |
| `arr`      | `string` \| `any`[] | `undefined`   | The array or string to search through.                      |
| `value`    | `any`               | `undefined`   | The value to search for.                                    |
| `position` | `number`            | `-1`          | Optional. The index to start searching from. Default is -1. |

#### Returns

`boolean`

A boolean indicating whether the value was found.

#### Defined in

[packages/eskit/src/contains.ts:19](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/contains.ts#L19)

---

### copyProperties

▸ **copyProperties**<`T`, `U`\>(`target`, `source`): `void`

Copies all properties of `source` to `target`, including non-enumerable ones.

**`Since`**

1.0.0

**`Example`**

```ts
const source = { a: 1, b: 2 }
const target = { c: 3 }

copyProperties(target, source)

console.log(target) // {a: 1, b: 2, c: 3}
```

#### Type parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `T`  | `T`                                    |
| `U`  | extends `Record`<`string`, `unknown`\> |

#### Parameters

| Name     | Type | Description                     |
| :------- | :--- | :------------------------------ |
| `target` | `T`  | The target object.              |
| `source` | `U`  | The source object to copy from. |

#### Returns

`void`

#### Defined in

[packages/eskit/src/copy-properties.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/copy-properties.ts#L17)

---

### curry

▸ **curry**(`fn`): (...`args`: `any`[]) => (...`args`: `any`[]) => `any`

Curry a function with given arguments.

**`Example`**

```ts
const add = (a: number, b: number) => a + b
const curriedAdd = curry(add)

const add5 = curriedAdd(5)
console.log(add5(3)) // Output: 8

const add2 = curriedAdd(2)
console.log(add2(4)) // Output: 6
```

#### Parameters

| Name | Type                          | Description                 |
| :--- | :---------------------------- | :-------------------------- |
| `fn` | (...`args`: `any`[]) => `any` | The function to be curried. |

#### Returns

`fn`

A curried function.

▸ (`...args`): (...`args`: `any`[]) => `any`

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`fn`

▸ (`...args`): `any`

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[packages/eskit/src/curry.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/curry.ts#L17)

---

### debounced

▸ **debounced**<`Args`\>(`fn`, `delay`, `immediate?`): `DebouncedFn`

Creates a debounced function that waits for the specified delay after the last call before executing.

#### Type parameters

| Name   | Type            |
| :----- | :-------------- |
| `Args` | extends `any`[] |

#### Parameters

| Name         | Type                          | Description                                                       |
| :----------- | :---------------------------- | :---------------------------------------------------------------- |
| `fn`         | (...`args`: `Args`) => `void` | The function to wrap.                                             |
| `delay`      | `number`                      | The delay time (in milliseconds) before the function is executed. |
| `immediate?` | `boolean`                     | Whether to execute the function immediately on the first call.    |

#### Returns

`DebouncedFn`

The wrapped debounced function.

#### Defined in

[packages/eskit/src/debounced.ts:14](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/debounced.ts#L14)

---

### deepClone

▸ **deepClone**<`T`\>(`obj`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `obj` | `T`  |

#### Returns

`T`

#### Defined in

[packages/eskit/src/deep-clone.ts:7](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/deep-clone.ts#L7)

---

### difference

▸ **difference**<`T`\>(`arr`, `values?`): `T`[]

Returns an array of values in `arr` that are not in the `values` array.

**`Typeparam`**

T The type of the array elements.

**`Example`**

```typescript
const arr = [1, 2, 3, 4, 5]
const values = [3, 4, 5, 6, 7]

difference(arr, values) // Returns: [1, 2]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type  | Default value | Description                            |
| :------- | :---- | :------------ | :------------------------------------- |
| `arr`    | `T`[] | `undefined`   | The array to inspect.                  |
| `values` | `T`[] | `[]`          | The values to exclude from the result. |

#### Returns

`T`[]

An array of values in `arr` that are not in the `values` array.

#### Defined in

[packages/eskit/src/difference.ts:20](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/difference.ts#L20)

---

### divide

▸ **divide**(`a`, `b`): `number`

Divides two numbers and returns the quotient.

**`Example`**

```ts
// Returns 2
divide(4, 2)
```

**`Example`**

```ts
// Returns 2.5
divide(5, 2)
```

#### Parameters

| Name | Type     | Description   |
| :--- | :------- | :------------ |
| `a`  | `number` | The dividend. |
| `b`  | `number` | The divisor.  |

#### Returns

`number`

The quotient.

#### Defined in

[packages/eskit/src/divide.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/divide.ts#L16)

---

### each

▸ **each**<`T`\>(`collection`, `func`): `void`

Iterates over elements of collection and invokes func for each element.

**`Example`**

```ts
each([1, 2, 3], (value, index, collection) => console.log(value, index))
each({ a: 1, b: 2, c: 3 }, (value, key, collection) => console.log(value, key))
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                                                    | Description                         |
| :----------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------- |
| `collection` | `Record`<`string`, `T`\> \| `T`[]                                                                       | The collection to iterate over.     |
| `func`       | (`value`: `T`, `key?`: `string` \| `number`, `collection?`: `Record`<`string`, `T`\> \| `T`[]) => `any` | The function invoked per iteration. |

#### Returns

`void`

#### Defined in

[packages/eskit/src/each.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/each.ts#L13)

---

### extendDeep

▸ **extendDeep**(`parent`, `child?`): `ObjectType`<`any`\>

Recursively extends an object or array.

**`Typeparam`**

T The type of the parent object.

**`Example`**

```ts
const parent = { a: { b: 1 } }
const child = { a: { c: 2 } }

extendDeep(parent, child) // { a: { b: 1, c: 2 } }
```

#### Parameters

| Name     | Type                 | Description                                       |
| :------- | :------------------- | :------------------------------------------------ |
| `parent` | `ObjectType`<`any`\> | The parent object to extend.                      |
| `child`  | `ObjectType`<`any`\> | The child object to merge into the parent object. |

#### Returns

`ObjectType`<`any`\>

The extended object.

#### Defined in

[packages/eskit/src/extend-deep.ts:19](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/extend-deep.ts#L19)

---

### filter

▸ **filter**<`T`\>(`collection`, `callback`): `T`

Filters the elements of an array or object based on a callback function.

**`Example`**

```ts
// Define an array of numbers
const numbers = [1, 2, 3, 4, 5]

// Define a callback function to filter even numbers
const isEven = (num: number) => num % 2 === 0

// Filter the array using the callback function
const evenNumbers = filter(numbers, isEven)

// The new array contains only even numbers
console.log(evenNumbers) // [2, 4]

// Define an object of key-value pairs
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }

// Define a callback function to filter even values
const isEvenValue = (val: number) => val % 2 === 0

// Filter the object using the callback function
const evenValuesObj = filter(obj, (_, value) => isEvenValue(value))

// The new object contains only key-value pairs where the value is even
console.log(evenValuesObj) // { b: 2, d: 4 }
```

#### Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `T`  | extends `Record`<`string`, `unknown`\> \| `unknown`[] |

#### Parameters

| Name         | Type                                                                                                                                              | Description                                                                                            |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------- |
| `collection` | `T`                                                                                                                                               | The array or object to filter.                                                                         |
| `callback`   | (`value`: `T` extends `U`[] ? `U` : `T`[keyof `T`], `indexOrKey`: `T` extends `unknown`[] ? `number` : keyof `T`, `collection`: `T`) => `boolean` | The function to call for each element. Should return `true` to keep the element, `false` to remove it. |

#### Returns

`T`

A new array or object containing only the elements for which the callback function returned `true`.

#### Defined in

[packages/eskit/src/filter.ts:31](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/filter.ts#L31)

---

### flatten

▸ **flatten**<`T`\>(`array`): `T`[]

Flattens an array.

**`Typeparam`**

T The type of the array elements.

**`Example`**

```ts
const arr = [1, [2, [3, 4]], 5]

flatten(arr) // [1, 2, 3, 4, 5]
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type             | Description           |
| :------ | :--------------- | :-------------------- |
| `array` | (`T` \| `T`[])[] | The array to flatten. |

#### Returns

`T`[]

The flattened array.

#### Defined in

[packages/eskit/src/flatten.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/flatten.ts#L13)

---

### formatMoney

▸ **formatMoney**(`money`, `currencySymbol?`): `string`

Formats a given number as a string with a currency symbol.

**`Example`**

```typescript
formatMoney(10) // "$10.00"
formatMoney(1000000, '£') // "£1,000,000.00"
```

**`Since`**

1.0.0

#### Parameters

| Name             | Type     | Default value | Description                                  |
| :--------------- | :------- | :------------ | :------------------------------------------- |
| `money`          | `number` | `undefined`   | The number to be formatted.                  |
| `currencySymbol` | `string` | `'$'`         | The currency symbol to use. Defaults to '$'. |

#### Returns

`string`

A string with the formatted currency symbol and number.

#### Defined in

[packages/eskit/src/format-money.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/format-money.ts#L16)

---

### formatNumber

▸ **formatNumber**(`val`, `separator`, `digitNum?`): `string`

Formats a number with the specified decimal separator and digit number.

This function formats a number with the specified decimal separator and digit number. If the input value is not a valid number, this function returns the input value as a string without formatting.

**`Example`**

```
const formattedNumber = formatNumber(123456.789, ',', 2)
console.log(formattedNumber)
// Output: "123,456.79"
```

#### Parameters

| Name        | Type     | Default value | Description                                                             |
| :---------- | :------- | :------------ | :---------------------------------------------------------------------- |
| `val`       | `number` | `undefined`   | The input number to be formatted.                                       |
| `separator` | `string` | `undefined`   | The decimal separator to use for formatting the number.                 |
| `digitNum`  | `number` | `0`           | The number of digits to appear after the decimal point (defaults to 0). |

#### Returns

`string`

The formatted number as a string.

#### Defined in

[packages/eskit/src/format-number.ts:18](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/format-number.ts#L18)

---

### getGlobal

▸ **getGlobal**(): `unknown`

Returns the global object for the current runtime environment.

This function returns the global object for the current runtime environment. It works in both browser and Node.js environments.

**`Throws`**

An error if the global object cannot be located.

**`Example`**

```
const globalObj = getGlobal()

if (typeof globalObj.process === 'object') {
  console.log('Running in Node.js')
} else {
  console.log('Running in browser')
}
```

#### Returns

`unknown`

The global object for the current runtime environment.

#### Defined in

[packages/eskit/src/get-global.ts:21](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/get-global.ts#L21)

---

### getRandomInt

▸ **getRandomInt**(`min`, `max`): `number`

Returns a random integer between the specified minimum and maximum values (inclusive).

This function returns a random integer between the specified minimum and maximum values (inclusive). The minimum and maximum values must be integers, and the minimum value must be less than or equal to the maximum value.

**`Example`**

```
const randomInt = getRandomInt(1, 10)
console.log(randomInt)
```

#### Parameters

| Name  | Type     | Description                    |
| :---- | :------- | :----------------------------- |
| `min` | `number` | The minimum value (inclusive). |
| `max` | `number` | The maximum value (inclusive). |

#### Returns

`number`

A random integer between the specified minimum and maximum values (inclusive).

#### Defined in

[packages/eskit/src/get-random-int.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/get-random-int.ts#L16)

---

### getType

▸ **getType**(`value`): `string`

Get the type of a value

**`Example`**

```
getType(42) // "Number"
getType("hello") // "String"
getType([]) // "Array"
getType(null) // "Null"
getType(undefined) // "Undefined"
getType({}) // "Object"
```

#### Parameters

| Name    | Type  | Description                  |
| :------ | :---- | :--------------------------- |
| `value` | `any` | The value to get the type of |

#### Returns

`string`

The type of the value

#### Defined in

[packages/eskit/src/get-type.ts:19](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/get-type.ts#L19)

---

### hasOwnProperty

▸ **hasOwnProperty**(`obj`, `key`): `boolean`

A reference to the Object.prototype.hasOwnProperty() method.

This function allows you to check if an object has a property defined on itself (i.e., not inherited from its prototype chain).

**`Example`**

```
const obj = { foo: 42 }

hasOwnProperty(obj, 'foo') // true
hasOwnProperty(obj, 'toString') // false
```

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `obj` | `unknown`     |
| `key` | `PropertyKey` |

#### Returns

`boolean`

`true` if the object has the property defined on itself, `false` otherwise.

#### Defined in

[packages/eskit/src/hasOwnProperty.ts:18](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/hasOwnProperty.ts#L18)

---

### idleIterator

▸ **idleIterator**<`T`\>(`array`, `callback`): `void`

Traverses an array and calls a callback on each item, only executing when the browser is idle.

**`Example`**

```typescript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

idleIterator(arr, (item, index) => {
  console.log(`Index ${index} with item ${item}`)
})
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                                       | Description                                                                             |
| :--------- | :----------------------------------------- | :-------------------------------------------------------------------------------------- |
| `array`    | `T`[]                                      | The array to iterate over.                                                              |
| `callback` | (`item`: `T`, `index`: `number`) => `void` | The function to execute on each item. It is passed the item and its index as arguments. |

#### Returns

`void`

#### Defined in

[packages/eskit/src/idle-iterator.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/idle-iterator.ts#L16)

---

### isArguments

▸ **isArguments**(`value`): `boolean`

Tests whether a value is an `arguments` object.

**`Example`**

```typescript
// Returns true
function sampleFunc() {
  return isArguments(arguments)
}
sampleFunc()
```

**`Example`**

```typescript
// Returns false
isArguments([1, 2, 3])
```

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

`true` if the value is an `arguments` object, `false` otherwise.

#### Defined in

[packages/eskit/src/is-arguments.ts:23](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-arguments.ts#L23)

---

### isArray

▸ **isArray**(`value`): value is any[]

Checks if a value is an array.

**`Example`**

```
isArray('abc') // => false
isArray([]) // => true
isArray({ 0: 'a', 1: 'b', 2: 'c', length: 3 }) // => false
```

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

value is any[]

`true` if the value is an array, else `false`.

#### Defined in

[packages/eskit/src/is-array.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-array.ts#L15)

---

### isArrayBuffer

▸ **isArrayBuffer**(`value`): value is unknown[]

Tests whether a value is an `ArrayBuffer` object.

**`Example`**

```typescript
// Returns false
isArrayBuffer([1, 2, 3])
```

**`Example`**

```typescript
// Returns true
const buffer = new ArrayBuffer(16)
isArrayBuffer(buffer)
```

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `value` | `unknown` | The value to test. |

#### Returns

value is unknown[]

`true` if the value is an `ArrayBuffer` object, `false` otherwise.

#### Defined in

[packages/eskit/src/is-array-buffer.ts:21](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-array-buffer.ts#L21)

---

### isArrayLike

▸ **isArrayLike**(`value`): `boolean`

Checks if a value is array-like.

**`Example`**

```
isArrayLike('abc') // => true
isArrayLike([]) // => true
isArrayLike({ 0: 'a', 1: 'b', 2: 'c', length: 3 }) // => true
isArrayLike(Function) // => false
```

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

`boolean`

`true` if the value is array-like, else `false`.

#### Defined in

[packages/eskit/src/is-array-like.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-array-like.ts#L15)

---

### isArrayLikeObject

▸ **isArrayLikeObject**(`value`): `boolean`

Checks if a value is array-like.

**`Example`**

```
isArrayLikeObject('abc') // => true
isArrayLikeObject([]) // => true
isArrayLikeObject(document.querySelectorAll('div')) // => true
isArrayLikeObject(Function) // => false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

`boolean`

`true` if the value is array-like, else `false`.

#### Defined in

[packages/eskit/src/is-array-like-object.ts:19](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-array-like-object.ts#L19)

---

### isBoolean

▸ **isBoolean**(`value`): value is boolean

Checks if a value is a boolean.

**`Example`**

```
isBoolean(true) // => true
isBoolean(false) // => true
isBoolean(0) // => false
isBoolean('true') // => false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is boolean

`true` if the value is a boolean, else `false`.

#### Defined in

[packages/eskit/src/is-boolean.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-boolean.ts#L16)

---

### isDate

▸ **isDate**(`value`): value is Date

Checks if a value is a Date object.

**`Example`**

```
isDate(new Date()) // => true
isDate(Date.now()) // => false
isDate('2022-03-30') // => false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is Date

`true` if the value is a Date object, else `false`.

#### Defined in

[packages/eskit/src/is-date.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-date.ts#L15)

---

### isDecimal

▸ **isDecimal**(`num`): `boolean`

Checks if a number is a decimal.

**`Example`**

```
isDecimal(1.5) // => true
isDecimal(3) // => false
isDecimal('1.23') // => false
```

#### Parameters

| Name  | Type      | Description          |
| :---- | :-------- | :------------------- |
| `num` | `unknown` | The number to check. |

#### Returns

`boolean`

`true` if the number is a decimal, else `false`.

#### Defined in

[packages/eskit/src/is-decimal.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-decimal.ts#L15)

---

### isDefined

▸ **isDefined**<`T`\>(`val`): val is T

Checks if a value is defined (not `undefined` or `null`).

**`Example`**

```
isDefined(1) // => true
isDefined('hello') // => true
isDefined(null) // => false
isDefined(undefined) // => false
```

#### Type parameters

| Name | Description                     |
| :--- | :------------------------------ |
| `T`  | The type of the value to check. |

#### Parameters

| Name  | Type                         | Description         |
| :---- | :--------------------------- | :------------------ |
| `val` | `undefined` \| `null` \| `T` | The value to check. |

#### Returns

val is T

`true` if the value is defined, else `false`.

#### Defined in

[packages/eskit/src/is-defined.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-defined.ts#L16)

---

### isElement

▸ **isElement**(`o`): `boolean`

Checks if a value is an Element or HTMLDocument object.

**`Example`**

```
isElement(document.body) // => true
isElement(document.querySelector('.my-class')) // => true
isElement(window) // => false
isElement('not an element') // => false
```

#### Parameters

| Name | Type      | Description         |
| :--- | :-------- | :------------------ |
| `o`  | `unknown` | The value to check. |

#### Returns

`boolean`

`true` if the value is an Element or HTMLDocument object, else `false`.

#### Defined in

[packages/eskit/src/is-element.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-element.ts#L15)

---

### isEmpty

▸ **isEmpty**(`value`): `boolean`

Checks if a value is empty.

A value is considered empty if it is `undefined`, `null`, an empty array or string,
an empty Map or Set object, or an object with no own properties.

**`Example`**

```
isEmpty(undefined) // => true
isEmpty(null) // => true
isEmpty('') // => true
isEmpty([]) // => true
isEmpty(new Map()) // => true
isEmpty(new Set()) // => true
isEmpty({}) // => true
isEmpty({ prop: 'value' }) // => false
isEmpty([1, 2, 3]) // => false
isEmpty('hello') // => false
isEmpty(new Map([['key', 'value']])) // => false
isEmpty(new Set([1, 2, 3])) // => false
```

#### Parameters

| Name    | Type  | Description         |
| :------ | :---- | :------------------ |
| `value` | `any` | The value to check. |

#### Returns

`boolean`

`true` if the value is empty, else `false`.

#### Defined in

[packages/eskit/src/is-empty.ts:32](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-empty.ts#L32)

---

### isEqual

▸ **isEqual**(`value`, `other`): `boolean`

Determines if two values are equal. Supports objects, arrays, and primitives.

**`Example`**

```
isEqual([1, 2, 3], [1, 2, 3]) // => true
isEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}}) // => true
isEqual('abc', 'abc') // => true
isEqual(1, 2) // => false
isEqual(null, undefined) // => false
```

#### Parameters

| Name    | Type  | Description                 |
| :------ | :---- | :-------------------------- |
| `value` | `any` | The value to compare.       |
| `other` | `any` | The other value to compare. |

#### Returns

`boolean`

True if the values are equal, false otherwise.

#### Defined in

[packages/eskit/src/is-equal.ts:19](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-equal.ts#L19)

---

### isEqualWith

▸ **isEqualWith**<`T`\>(`value`, `other`, `fn`): `boolean`

Performs a deep comparison between two values to determine if they are equivalent.

**`Example`**

```ts
isEqualWith([1, 2, 3], [1, 2, 3], (v1, v2) => {
  if (Array.isArray(v1) && Array.isArray(v2)) {
    return v1.length === v2.length
  }
  return undefined
}) // => true
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                | Description                                       |
| :------ | :---------------------------------- | :------------------------------------------------ |
| `value` | `T`                                 | The value to compare.                             |
| `other` | `T`                                 | The other value to compare.                       |
| `fn`    | (`v1`: `T`, `v2`: `T`) => `boolean` | The customizer function to use to compare values. |

#### Returns

`boolean`

Returns `true` if the values are equivalent, else `false`.

#### Defined in

[packages/eskit/src/is-equal-with.ts:19](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-equal-with.ts#L19)

---

### isError

▸ **isError**(`value`): value is Error

Determines whether the given value is an instance of `Error`.

**`Example`**

```ts
const err = new Error('Example error')
isError(err) // true

const obj = { error: new Error('Example error') }
isError(obj.error) // true

isError('Error') // false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is Error

Whether the given value is an instance of `Error`.

#### Defined in

[packages/eskit/src/is-error.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-error.ts#L17)

---

### isEven

▸ **isEven**(`num`): `boolean`

Checks if a number is even.

**`Example`**

```ts
isEven(2) // true
isEven(3) // false
```

#### Parameters

| Name  | Type     | Description          |
| :---- | :------- | :------------------- |
| `num` | `number` | The number to check. |

#### Returns

`boolean`

Whether the number is even or not.

#### Defined in

[packages/eskit/src/is-even.ts:12](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-even.ts#L12)

---

### isFunction

▸ **isFunction**(`value`): value is Function

Checks if a given value is a function

**`Example`**

```ts
isFunction(() => {}) // true
isFunction(function () {}) // true
isFunction(42) // false
```

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `value` | `unknown` | The value to check |

#### Returns

value is Function

True if the value is a function, false otherwise

#### Defined in

[packages/eskit/src/is-function.ts:11](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-function.ts#L11)

---

### isInteger

▸ **isInteger**(`number`): `boolean`

Checks if a value is an integer.

**`Example`**

```typescript
isInteger(0) // true
isInteger(5) // true
isInteger(-10) // true
isInteger(2.5) // false
```

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `number` | `unknown` |

#### Returns

`boolean`

Returns `true` if `value` is an integer, else `false`.

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:233

---

### isNil

▸ **isNil**(`value`): value is undefined \| null

Type guard to determine if a value is null or undefined.

**`Example`**

```typescript
isNil(null) // true
isNil(undefined) // true
isNil('') // false
isNil(0) // false
```

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `value` | `unknown` | The value to test. |

#### Returns

value is undefined \| null

Whether or not the value is null or undefined.

#### Defined in

[packages/eskit/src/is-nil.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-nil.ts#L17)

---

### isNumber

▸ **isNumber**(`value`): value is number

Checks if a value is a number.

**`Example`**

```ts
isNumber(42) // true
isNumber('42') // false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is number

Returns `true` if the value is a number, else `false`.

#### Defined in

[packages/eskit/src/is-number.ts:12](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-number.ts#L12)

---

### isObject

▸ **isObject**(`value`): value is Record<string, unknown\>

Check if a value is an object.

**`Example`**

```ts
isObject({}) // true
isObject([]) // true
isObject(null) // false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is Record<string, unknown\>

`true` if the value is an object, else `false`.

#### Defined in

[packages/eskit/src/is-object.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-object.ts#L13)

---

### isObjectLike

▸ **isObjectLike**(`value`): `boolean`

Checks if a value is object-like, which means it's not null and its type is 'object'.

**`Example`**

```ts
isObjectLike({}) // true
isObjectLike([]) // true
isObjectLike(null) // false
isObjectLike(42) // false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

`boolean`

True if the value is object-like, false otherwise.

#### Defined in

[packages/eskit/src/is-object-like.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-object-like.ts#L13)

---

### isPrimitive

▸ **isPrimitive**(`value`): `boolean`

Determines whether a given value is a JavaScript primitive type.

**`Example`**

```ts
try {
  console.log(isPrimitive('')) // true
  console.log(isPrimitive(0)) // true
  console.log(isPrimitive(false)) // true
  console.log(isPrimitive(null)) // true
  console.log(isPrimitive(undefined)) // true
  console.log(isPrimitive(Symbol())) // true
  console.log(isPrimitive({})) // false
  console.log(isPrimitive([])) // false
} catch (err) {
  console.error(err)
}
```

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

Returns `true` if the value is a primitive type, `false` otherwise.

#### Defined in

[packages/eskit/src/is-primitive.ts:20](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-primitive.ts#L20)

---

### isPromiseLike

▸ **isPromiseLike**(`obj`): `boolean`

Checks if a given object is promise-like (thenable).

**`Example`**

```ts
const myPromise = new Promise((resolve) => setTimeout(() => resolve('done'), 100))
console.log(isPromiseLike(myPromise)) // true
console.log(isPromiseLike({ then: () => {} })) // true
console.log(isPromiseLike({})) // false
```

#### Parameters

| Name  | Type  | Description          |
| :---- | :---- | :------------------- |
| `obj` | `any` | The object to check. |

#### Returns

`boolean`

Whether the object is promise-like.

#### Defined in

[packages/eskit/src/is-promise-like.ts:11](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-promise-like.ts#L11)

---

### isPrototype

▸ **isPrototype**(`value`): `boolean`

Checks if `value` is likely a prototype object.

**`Example`**

```ts
function Foo() {}
isPrototype(Foo.prototype)
// => true

isPrototype({})
// => false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

`boolean`

Whether `value` is a prototype object.

#### Defined in

[packages/eskit/src/is-prototype.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-prototype.ts#L16)

---

### isRegExp

▸ **isRegExp**(`value`): value is RegExp

Determines whether the given value is a regular expression.

**`Example`**

```ts
isRegExp(/ab+c/i) // => true
isRegExp('hello') // => false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is RegExp

`true` if the value is a regular expression, else `false`.

#### Defined in

[packages/eskit/src/is-reg-exp.ts:12](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-reg-exp.ts#L12)

---

### isString

▸ **isString**(`value`): value is string

Checks if a given value is a string.

**`Example`**

```ts
isString('hello') // => true
isString(123) // => false
```

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is string

Returns `true` if the given value is a string, else `false`.

#### Defined in

[packages/eskit/src/is-string.ts:12](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-string.ts#L12)

---

### isType

▸ **isType**(`type`, `value`): `boolean`

Checks if a value's type matches the specified type string.

**`Example`**

```ts
isType('String', 'hello') // true
isType('Array', {}) // false
```

#### Parameters

| Name    | Type      | Description                       |
| :------ | :-------- | :-------------------------------- |
| `type`  | `string`  | The type string to check against. |
| `value` | `unknown` | The value to check the type of.   |

#### Returns

`boolean`

True if the value's type matches the specified type string, false otherwise.

#### Defined in

[packages/eskit/src/is-type.ts:10](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/is-type.ts#L10)

---

### listToTree

▸ **listToTree**<`T`\>(`list`, `pid?`): `T`[]

Converts a flat list of items to a tree structure.

#### Type parameters

| Name | Type                       | Description                        |
| :--- | :------------------------- | :--------------------------------- |
| `T`  | extends `IItem`<`T`, `T`\> | The type of the items in the list. |

#### Parameters

| Name   | Type      | Description                                                   |
| :----- | :-------- | :------------------------------------------------------------ |
| `list` | `T`[]     | The list of items to convert.                                 |
| `pid`  | `PidType` | The parent ID to start the conversion from. Defaults to null. |

#### Returns

`T`[]

The resulting tree structure.

#### Defined in

[packages/eskit/src/list-to-tree.ts:22](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/list-to-tree.ts#L22)

---

### lowerFirst

▸ **lowerFirst**(`value`): `string`

Converts the first character of `value` to lower case.

**`Example`**

```ts
lowerFirst('Apple') // => 'apple'
```

#### Parameters

| Name    | Type     | Description            |
| :------ | :------- | :--------------------- |
| `value` | `string` | The string to convert. |

#### Returns

`string`

Returns the converted string.

#### Defined in

[packages/eskit/src/lower-first.ts:11](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/lower-first.ts#L11)

---

### max

▸ **max**(`arr`): `undefined` \| `number`

Returns the maximum value of a numeric array.
If the input value is not an array or the array is empty, returns `undefined`.

**`Example`**

```ts
max([1, 2, 3, 4, 5]) // 5
max([]) // undefined
max(null) // undefined
max(undefined) // undefined
```

#### Parameters

| Name  | Type       | Description                                           |
| :---- | :--------- | :---------------------------------------------------- |
| `arr` | `number`[] | The array of numbers to search for the maximum value. |

#### Returns

`undefined` \| `number`

The maximum value of the input array, or `undefined` if the input is not an array or the array is empty.

#### Defined in

[packages/eskit/src/max.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/max.ts#L15)

---

### memoize

▸ **memoize**<`T`\>(`fn`): `T`

Memoizes the result of a function for the same set of arguments.

**`Example`**

```ts
function expensiveOperation(arg1: string, arg2: number): number {
  // ...some expensive operation here...
}

const memoizedOperation = memoize(expensiveOperation)

const result1 = memoizedOperation('foo', 42) // Expensive operation is called.
const result2 = memoizedOperation('foo', 42) // Expensive operation is not called.
const result3 = memoizedOperation('bar', 42) // Expensive operation is called again.
```

#### Type parameters

| Name | Type                |
| :--- | :------------------ |
| `T`  | extends `MemoizeFn` |

#### Parameters

| Name | Type | Description                  |
| :--- | :--- | :--------------------------- |
| `fn` | `T`  | The function to be memoized. |

#### Returns

`T`

The memoized function.

#### Defined in

[packages/eskit/src/memoize.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/memoize.ts#L17)

---

### min

▸ **min**(`arr`): `undefined` \| `number`

Returns the smallest number in an array of numbers.
Returns undefined if the input array is not an array or is empty.

**`Example`**

```ts
min([3, 1, 4, 1, 5, 9]) // returns 1
min([]) // returns undefined
```

#### Parameters

| Name  | Type       | Description         |
| :---- | :--------- | :------------------ |
| `arr` | `number`[] | An array of numbers |

#### Returns

`undefined` \| `number`

The smallest number in the array, or undefined if the input is not an array or is empty

#### Defined in

[packages/eskit/src/min.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/min.ts#L13)

---

### mixin

▸ **mixin**(`...mixins`): `any`

Creates a new class by combining multiple classes.

**`Example`**

```ts
// Define some classes
class Foo {
  foo() {}
}

class Bar {
  bar() {}
}

// Create a new class by combining Foo and Bar
const Baz = mixin(Foo, Bar)

// Create an instance of Baz
const baz = new Baz()

// Call methods from both Foo and Bar
baz.foo()
baz.bar()
```

#### Parameters

| Name        | Type    | Description             |
| :---------- | :------ | :---------------------- |
| `...mixins` | `any`[] | The classes to combine. |

#### Returns

`any`

#### Defined in

[packages/eskit/src/mixin.ts:25](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/mixin.ts#L25)

---

### multiply

▸ **multiply**(`a`, `b`): `number`

Multiply two numbers accurately.

**`Example`**

```ts
const result = multiply(2.3, 4.5)
console.log(result) // Output: 10.35
```

#### Parameters

| Name | Type     | Description                    |
| :--- | :------- | :----------------------------- |
| `a`  | `number` | The first number to multiply.  |
| `b`  | `number` | The second number to multiply. |

#### Returns

`number`

The result of the multiplication.

#### Defined in

[packages/eskit/src/multiply.ts:10](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/multiply.ts#L10)

---

### noop

▸ **noop**(): `void`

#### Returns

`void`

#### Defined in

[packages/eskit/src/noop.ts:3](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/noop.ts#L3)

---

### pick

▸ **pick**<`T`, `K`\>(`obj`, `...keys`): `Pick`<`T`, `K`\>

Creates an object composed of the picked `obj` properties.

**`Example`**

```ts
const object = { a: 1, b: '2', c: 3 }
pick(object, 'a', 'c')
// => { 'a': 1, 'c': 3 }
```

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `T`  | `T`                                      |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name      | Type  | Description                |
| :-------- | :---- | :------------------------- |
| `obj`     | `T`   | The source object.         |
| `...keys` | `K`[] | The property keys to pick. |

#### Returns

`Pick`<`T`, `K`\>

The new object.

#### Defined in

[packages/eskit/src/pick.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/pick.ts#L16)

---

### range

▸ **range**(`start`, `end?`, `step?`): `number`[]

Creates an array of numbers progressing from start up to, but not including, end.
A step of -1 is used if a negative start is specified without an end or step.

**`Example`**

```ts
range(4); => [0, 1, 2, 3]
range(-4); => [0, -1, -2, -3]
range(1, 5); => [1, 2, 3, 4]
range(0, 20, 5); => [0, 5, 10, 15]
```

#### Parameters

| Name    | Type     | Description                             |
| :------ | :------- | :-------------------------------------- |
| `start` | `number` | The start of the range.                 |
| `end?`  | `number` | The end of the range.                   |
| `step?` | `number` | The value to increment or decrement by. |

#### Returns

`number`[]

Returns the range of numbers.

#### Defined in

[packages/eskit/src/range.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/range.ts#L15)

---

### tryRun

▸ **tryRun**<`T`\>(`fn`): `Promise`<`T` \| `null`\>

Safely executes a function (sync or async) and returns its result, or null if an error occurs.

**`Since`**

1.0.0

**`Example`**

```typescript
// Synchronous function success case
const result = await tryRun(() => JSON.parse('{"name": "test"}'))
console.log(result) // { name: "test" }

// Synchronous function error case
const errorResult = await tryRun(() => JSON.parse('invalid json'))
console.log(errorResult) // null

// Asynchronous function success case
const asyncResult = await tryRun(async () => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return { data: 'async test' }
})
console.log(asyncResult) // { data: 'async test' }

// Asynchronous function error case
const asyncError = await tryRun(async () => {
  throw new Error('async error')
})
console.log(asyncError) // null

// With calculation
const calc = await tryRun(() => 10 / 2)
console.log(calc) // 5
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type                         | Description                     |
| :--- | :--------------------------- | :------------------------------ |
| `fn` | () => `T` \| `Promise`<`T`\> | The function to execute safely. |

#### Returns

`Promise`<`T` \| `null`\>

A Promise that resolves to the function result or null if an error occurs.

#### Defined in

[packages/eskit/src/tryRun.ts](https://github.com/gvray/toolkit/blob/main/packages/eskit/src/tryRun.ts)

---

### tryRunSync

▸ **tryRunSync**<`T`\>(`fn`): `T` \| `null`

Safely executes a synchronous function and returns its result, or null if an error occurs.

This function provides a safe way to execute functions that might throw errors,
returning null instead of letting the error propagate.

**`Since`**

1.0.0

**`Example`**

```typescript
// Success case
const result = tryRunSync(() => {
  return JSON.parse('{"name": "test"}')
})
console.log(result) // { name: "test" }

// Error case
const errorResult = tryRunSync(() => {
  return JSON.parse('invalid json')
})
console.log(errorResult) // null

// Complex operations
const complexResult = tryRunSync(() => {
  const data = JSON.parse('{"values": [1, 2, 3]}')
  return data.values.reduce((sum, val) => sum + val, 0)
})
console.log(complexResult) // 6

// Error in complex operations
const complexError = tryRunSync(() => {
  const data = JSON.parse('invalid json')
  return data.values.reduce((sum, val) => sum + val, 0)
})
console.log(complexError) // null

// Working with different return types
const numberResult = tryRunSync(() => 42)
const stringResult = tryRunSync(() => 'hello')
const booleanResult = tryRunSync(() => true)
const objectResult = tryRunSync(() => ({ id: 1, name: 'test' }))
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type      | Description                                 |
| :--- | :-------- | :------------------------------------------ |
| `fn` | () => `T` | The synchronous function to execute safely. |

#### Returns

`T` \| `null`

The result of the function or null if an error occurs.

#### Defined in

[packages/eskit/src/tryRunSync.ts](https://github.com/gvray/toolkit/blob/main/packages/eskit/src/tryRunSync.ts)

---

### shuffle

▸ **shuffle**<`T`\>(`arr`): `void`

Randomly shuffle an array in place.

**`Remarks`**

This function modifies the original array and does not return a new array.

**`Example`**

```typescript
const arr = [1, 2, 3, 4, 5]
shuffle(arr)
console.log(arr) // Output: [3, 2, 5, 1, 4] (random order)
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type  | Description           |
| :---- | :---- | :-------------------- |
| `arr` | `T`[] | The array to shuffle. |

#### Returns

`void`

#### Defined in

[packages/eskit/src/shuffle.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/shuffle.ts#L16)

---

### sleep

▸ **sleep**(`ms`): `Promise`<`void`\>

Pauses the execution for the specified amount of time.

**`Example`**

```
console.log('Start')
await sleep(2000)
console.log('End')
```

#### Parameters

| Name | Type     | Description                          |
| :--- | :------- | :----------------------------------- |
| `ms` | `number` | The number of milliseconds to sleep. |

#### Returns

`Promise`<`void`\>

A promise that resolves after the specified amount of time.

#### Defined in

[packages/eskit/src/sleep.ts:16](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/sleep.ts#L16)

---

### subtract

▸ **subtract**(`a`, `b`): `number`

Returns the result of subtracting the second number from the first number.

**`Example`**

```typescript
subtract(3, 1) // 2
```

#### Parameters

| Name | Type     | Description                                          |
| :--- | :------- | :--------------------------------------------------- |
| `a`  | `number` | The first number to subtract.                        |
| `b`  | `number` | The second number to subtract from the first number. |

#### Returns

`number`

The result of subtracting the second number from the first number.

#### Defined in

[packages/eskit/src/subtract.ts:11](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/subtract.ts#L11)

---

### throttle

▸ **throttle**<`TArgs`\>(`fn`, `delay`, `options?`): (...`args`: `TArgs`) => `void`

Creates a throttled function that only invokes the original function at most once per every `delay` milliseconds.
The throttled function has optional leading or trailing invocation.

**`Example`**

```ts
const throttledFn = throttle(
  (x, y) => {
    console.log(x + y)
  },
  1000,
  { leading: true }
)

throttledFn(1, 2) // logs 3 immediately
throttledFn(3, 4) // not invoked
setTimeout(() => throttledFn(5, 6), 2000) // logs 11 after 2 seconds
```

#### Type parameters

| Name    | Type            |
| :------ | :-------------- |
| `TArgs` | extends `any`[] |

#### Parameters

| Name                | Type                           | Description                                                                                     |
| :------------------ | :----------------------------- | :---------------------------------------------------------------------------------------------- |
| `fn`                | (...`args`: `TArgs`) => `void` | The original function to be throttled.                                                          |
| `delay`             | `number`                       | The number of milliseconds to throttle.                                                         |
| `options?`          | `Object`                       | Optional configuration for leading and/or trailing invocation.                                  |
| `options.leading?`  | `boolean`                      | Specify invoking the original function on the leading edge of the throttle. Default is `false`. |
| `options.trailing?` | `boolean`                      | Specify invoking the original function on the trailing edge of the throttle. Default is `true`. |

#### Returns

`fn`

- Throttled function that delays invoking the original function
  at most once per every `delay` milliseconds.

▸ (`...args`): `void`

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `TArgs` |

##### Returns

`void`

#### Defined in

[packages/eskit/src/throttle.ts:23](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/throttle.ts#L23)

---

### toString

▸ **toString**(`value`): `string`

Converts a value to a string.

**`Example`**

```
toString(123); // '123'
toString('hello'); // 'hello'
toString(null); // ''
```

#### Parameters

| Name    | Type  | Description           |
| :------ | :---- | :-------------------- |
| `value` | `any` | The value to convert. |

#### Returns

`string`

The string representation of the value, or an empty string if the value is null or undefined.

#### Defined in

[packages/eskit/src/to-string.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/to-string.ts#L15)

---

### treeToList

▸ **treeToList**<`T`\>(`tree`): `T`[]

Flattens a tree structure represented by an array of items with child nodes into a flat array.

**`Example`**

```typescript
interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

const tree: TreeNode[] = [
  {
    id: 1,
    name: 'Node 1',
    children: [
      { id: 2, name: 'Node 1.1' },
      { id: 3, name: 'Node 1.2' }
    ]
  },
  {
    id: 4,
    name: 'Node 2',
    children: [
      { id: 5, name: 'Node 2.1' },
      { id: 6, name: 'Node 2.2', children: [{ id: 7, name: 'Node 2.2.1' }] }
    ]
  }
]

const result = treeToList(tree)
// [
//   { id: 2, name: "Node 1.1" },
//   { id: 3, name: "Node 1.2" },
//   { id: 1, name: "Node 1" },
//   { id: 5, name: "Node 2.1" },
//   { id: 7, name: "Node 2.2.1" },
//   { id: 6, name: "Node 2.2" },
//   { id: 4, name: "Node 2" }
// ]
```

#### Type parameters

| Name | Type                       | Description                |
| :--- | :------------------------- | :------------------------- |
| `T`  | extends `IItem`<`T`, `T`\> | Type of items in the tree. |

#### Parameters

| Name   | Type  | Description                                                           |
| :----- | :---- | :-------------------------------------------------------------------- |
| `tree` | `T`[] | The tree structure represented by an array of items with child nodes. |

#### Returns

`T`[]

A flat array of items.

#### Defined in

[packages/eskit/src/tree-to-list.ts:51](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/tree-to-list.ts#L51)

---

### upperFirst

▸ **upperFirst**(`value`): `string`

Converts the first character of a string to uppercase.

**`Example`**

```ts
upperFirst('hello world') // Returns 'Hello world'
```

#### Parameters

| Name    | Type     | Description           |
| :------ | :------- | :-------------------- |
| `value` | `string` | The string to modify. |

#### Returns

`string`

The modified string.

#### Defined in

[packages/eskit/src/upper-first.ts:11](https://github.com/gvray/toolkit/blob/7fa8b86/packages/eskit/src/upper-first.ts#L11)
