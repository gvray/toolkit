# @gvray/pathkit

A toolkit for path

## Usage

```shell
npm i @gvray/pathkit
```

@gvray/pathkit - v1.0.0-Beta

# @gvray/pathkit - v1.0.0-Beta

## Table of contents

### Functions

- [isAbsolute](README.md#isabsolute)
- [join](README.md#join)
- [normalize](README.md#normalize)
- [parseUrl](README.md#parseurl)

## Functions

### isAbsolute

▸ **isAbsolute**(`path`): `boolean`

Determine whether the given path string is an absolute path.

**`Since`**

1.0.0

**`Example`**

```ts
isAbsolute('/') // true
isAbsolute('/path') // true
isAbsolute('C:\\path') // true
isAbsolute('\\path') // true
isAbsolute('https://example.com') // true
isAbsolute('ftp://example.com') // true
isAbsolute('relative/path') // false
```

#### Parameters

| Name   | Type     | Description                       |
| :----- | :------- | :-------------------------------- |
| `path` | `string` | The path string to be determined. |

#### Returns

`boolean`

True if it's an absolute path, false otherwise.

#### Defined in

[isAbsolute.ts:18](https://github.com/GavinBirkhoff/toolkit/blob/7fa8b86/packages/pathkit/src/isAbsolute.ts#L18)

---

### join

▸ **join**(`...paths`): `string`

Combines an array of path segments into a single path string, with forward slashes (/) as separators.

**`Since`**

1.0.0

**`Example`**

```ts
const path = join('foo', 'bar', 'baz') // path == 'foo/bar/baz'
const path2 = join('foo/', '/bar/', '/baz/') // path2 == 'foo/bar/baz'
```

#### Parameters

| Name       | Type       | Description                        |
| :--------- | :--------- | :--------------------------------- |
| `...paths` | `string`[] | An array of path segments to join. |

#### Returns

`string`

A combined path string.

#### Defined in

[join.ts:13](https://github.com/GavinBirkhoff/toolkit/blob/7fa8b86/packages/pathkit/src/join.ts#L13)

---

### normalize

▸ **normalize**(`path`): `string`

Normalize a file system path by removing any unnecessary "." and ".." segments
and resolving any directory separators to match the host operating system.

**`Example`**

```ts
const path = '/users/john/../jane/./documents/'
const normalizedPath = normalize(path) // "/users/jane/documents/"
```

**`Since`**

1.0.0

#### Parameters

| Name   | Type     | Description                            |
| :----- | :------- | :------------------------------------- |
| `path` | `string` | The file system path to be normalized. |

#### Returns

`string`

The normalized path.

#### Defined in

[normalize.ts:17](https://github.com/GavinBirkhoff/toolkit/blob/7fa8b86/packages/pathkit/src/normalize.ts#L17)

---

### parseUrl

▸ **parseUrl**(`url`): `Object`

Parses the query and hash parameters of the specified URL string.

**`Example`**

```ts
// Basic usage
const url = 'http://example.com/path/to/page?a=1&b=2#section1'
const { query, hash } = parseUrl(url)
console.log(query) // { a: '1', b: '2' }
console.log(hash) // { section1: '' }

// Query and hash without value
const url2 = 'http://example.com/path/to/page?a&b#c'
const { query: query2, hash: hash2 } = parseUrl(url2)
console.log(query2) // { a: '', b: '' }
console.log(hash2) // { c: '' }

// Query with array value
const url3 = 'http://example.com/path/to/page?color=red&color=green&color=blue'
const { query: query3, hash: hash3 } = parseUrl(url3)
console.log(query3) // { color: ['red', 'green', 'blue'] }
console.log(hash3) // {}
```

**`Since`**

1.0.0

#### Parameters

| Name  | Type     | Description              |
| :---- | :------- | :----------------------- |
| `url` | `string` | The URL string to parse. |

#### Returns

`Object`

An object containing the query and hash parameters of the URL.

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `hash`  | `Record`<`string`, `string` \| `string`[]\> |
| `query` | `Record`<`string`, `string` \| `string`[]\> |

#### Defined in

[parseUrl.ts:64](https://github.com/GavinBirkhoff/toolkit/blob/7fa8b86/packages/pathkit/src/parseUrl.ts#L64)
