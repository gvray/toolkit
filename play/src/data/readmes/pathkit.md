# @gvray/pathkit

A toolkit for path manipulation and URL utilities.

## Installation

```shell
npm i @gvray/pathkit
# or
yarn add @gvray/pathkit
# or
pnpm add @gvray/pathkit
```
<!-- AUTO-API-START -->

## API Reference

## Functions

### basename()

获取路径中的文件名部分。

**Parameters:**
- `path: string` - 要处理的路径
- `ext?: string` - 可选的扩展名，如果指定则会从结果中移除

**Returns:**
- string - 路径的最后一部分（文件名）

### dirname()

获取路径中的目录部分。

**Parameters:**
- `path: string` - 要处理的路径

**Returns:**
- string - 路径的目录部分

### extname()

获取路径中的扩展名部分。

**Parameters:**
- `path: string` - 要处理的路径

**Returns:**
- string - 路径的扩展名（包含点号）

### format()

从路径对象返回路径字符串。

**Parameters:**
- `pathObject: Partial\<[ParsedPath](../interfaces/ParsedPath.md)\>` - 路径对象

**Returns:**
- string - 格式化后的路径字符串

### fromFileUrl()

将 file:// URL 转换为路径。

**Parameters:**
- `url: string` - 要转换的 file:// URL

**Returns:**
- string - 路径字符串

### isAbsolute()

Determine whether the given path string is an absolute path.

**Parameters:**
- `path: string` - The path string to be determined.

**Returns:**
- boolean - True if it's an absolute path, false otherwise.

**Since:** 1.0.0

### isWithin()

检查路径是否在指定目录内。

**Parameters:**
- `directory: string` - 基准目录
- `path: string` - 要检查的路径

**Returns:**
- boolean - 如果路径在目录内则返回 true，否则返回 false

### join()

Combines an array of path segments into a single path string, with forward slashes (/) as separators.

**Parameters:**
- `paths: ...string[]` - An array of path segments to join.

**Returns:**
- string - A combined path string.

**Since:** 1.0.0

### normalize()

Normalize a file system path by removing any unnecessary "." and ".." segments and resolving any directory separators to match the host operating system.

**Parameters:**
- `path: string` - The file system path to be normalized.

**Returns:**
- string - The normalized path.

**Since:** 1.0.0

### parse()

解析路径为对象。

**Parameters:**
- `path: string` - 要解析的路径

**Returns:**
- [ParsedPath](../interfaces/ParsedPath.md) - 包含路径各个部分的对象

### parseUrl()

解析 URL 字符串，返回 URL 的各个组成部分。

**Parameters:**
- `url: string` - 要解析的 URL 字符串

**Returns:**
- object - 包含 URL 各个组成部分的对象

### queryString()

Converts a query object to a query string.

**Parameters:**
- `query: Record\<string, string \| number\> = {}` - The query object to convert.
- `separator: string = '?'` - The separator to use between the URL and the query string (default is '?').

**Returns:**
- string - The generated query string.

### relative()

根据当前工作目录，计算从 from 到 to 的相对路径。

**Parameters:**
- `from: string` - 源路径
- `to: string` - 目标路径

**Returns:**
- string - 相对路径

### resolve()

将路径或路径片段序列解析为绝对路径。

**Parameters:**
- `paths: ...string[]` - 要解析的路径片段

**Returns:**
- string - 解析后的绝对路径

### toFileUrl()

将路径转换为 file:// URL。

**Parameters:**
- `path: string` - 要转换的路径

**Returns:**
- string - file:// URL 字符串

### toPosix()

将路径转换为 POSIX 格式。

**Parameters:**
- `path: string` - 要转换的路径

**Returns:**
- string - POSIX 格式的路径

### toWin32()

将路径转换为 Windows 格式。

**Parameters:**
- `path: string` - 要转换的路径

**Returns:**
- string - Windows 格式的路径


## Interfaces

###

<!-- AUTO-API-END -->