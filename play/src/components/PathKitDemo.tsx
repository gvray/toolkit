import React from 'react'
import FunctionDemo from './FunctionDemo'
import * as pathkit from '@gvray/pathkit'

const PathKitDemo: React.FC = () => {
  const functions = [
    // 路径解析
    {
      name: 'parse',
      description: '解析路径',
      execute: ({ path }) => pathkit.parse(path),
      paramSchema: [{ name: 'path', type: 'string', description: '要解析的路径', defaultValue: '/home/user/file.txt' }]
    },
    {
      name: 'basename',
      description: '获取文件名',
      execute: ({ path, ext }) => pathkit.basename(path, ext),
      paramSchema: [
        { name: 'path', type: 'string', description: '文件路径', defaultValue: '/home/user/file.txt' },
        { name: 'ext', type: 'string', description: '要移除的扩展名', defaultValue: '.txt' }
      ]
    },
    {
      name: 'dirname',
      description: '获取目录名',
      execute: ({ path }) => pathkit.dirname(path),
      paramSchema: [{ name: 'path', type: 'string', description: '文件路径', defaultValue: '/home/user/file.txt' }]
    },
    {
      name: 'extname',
      description: '获取文件扩展名',
      execute: ({ path }) => pathkit.extname(path),
      paramSchema: [{ name: 'path', type: 'string', description: '文件路径', defaultValue: '/home/user/file.txt' }]
    },

    // 路径操作
    {
      name: 'join',
      description: '连接路径片段',
      execute: ({ paths }) => pathkit.join(...paths),
      paramSchema: [
        { name: 'paths', type: 'array', description: '路径片段数组', defaultValue: '["home", "user", "file.txt"]' }
      ]
    },
    {
      name: 'resolve',
      description: '解析绝对路径',
      execute: ({ paths }) => pathkit.resolve(...paths),
      paramSchema: [
        { name: 'paths', type: 'array', description: '路径片段数组', defaultValue: '["/home", "user", "file.txt"]' }
      ]
    },
    {
      name: 'relative',
      description: '获取相对路径',
      execute: ({ from, to }) => pathkit.relative(from, to),
      paramSchema: [
        { name: 'from', type: 'string', description: '起始路径', defaultValue: '/home/user' },
        { name: 'to', type: 'string', description: '目标路径', defaultValue: '/home/user/documents/file.txt' }
      ]
    },
    {
      name: 'normalize',
      description: '标准化路径',
      execute: ({ path }) => pathkit.normalize(path),
      paramSchema: [
        { name: 'path', type: 'string', description: '要标准化的路径', defaultValue: '/home/user/../user/file.txt' }
      ]
    },

    // 路径检查
    {
      name: 'isAbsolute',
      description: '检查是否为绝对路径',
      execute: ({ path }) => pathkit.isAbsolute(path),
      paramSchema: [{ name: 'path', type: 'string', description: '要检查的路径', defaultValue: '/home/user/file.txt' }]
    },
    {
      name: 'isWithin',
      description: '检查路径是否在指定目录内',
      execute: ({ path, parent }) => pathkit.isWithin(path, parent),
      paramSchema: [
        { name: 'path', type: 'string', description: '要检查的路径', defaultValue: '/home/user/file.txt' },
        { name: 'parent', type: 'string', description: '父目录路径', defaultValue: '/home' }
      ]
    },

    // 路径格式化
    {
      name: 'format',
      description: '格式化路径对象',
      execute: ({ pathObject }) => pathkit.format(pathObject),
      paramSchema: [
        {
          name: 'pathObject',
          type: 'object',
          description: '路径对象',
          defaultValue: { root: '/', dir: '/home/user', base: 'file.txt', ext: '.txt', name: 'file' }
        }
      ]
    },

    // URL处理
    {
      name: 'parseUrl',
      description: '解析URL',
      execute: ({ url }) => pathkit.parseUrl(url),
      paramSchema: [
        {
          name: 'url',
          type: 'string',
          description: '要解析的URL',
          defaultValue: 'https://example.com/path?query=value#fragment'
        }
      ]
    },
    {
      name: 'queryString',
      description: '处理查询字符串',
      execute: ({ query, parse }) => pathkit.queryString(query, parse),
      paramSchema: [
        { name: 'query', type: 'string', description: '查询字符串', defaultValue: 'name=john&age=25' },
        { name: 'parse', type: 'boolean', description: '是否解析为对象', defaultValue: 'true' }
      ]
    },

    // 平台转换
    {
      name: 'toPosix',
      description: '转换为POSIX格式',
      execute: ({ path }) => pathkit.toPosix(path),
      paramSchema: [{ name: 'path', type: 'string', description: '要转换的路径', defaultValue: 'C:\\Users\\file.txt' }]
    },
    {
      name: 'toWin32',
      description: '转换为Windows格式',
      execute: ({ path }) => pathkit.toWin32(path),
      paramSchema: [{ name: 'path', type: 'string', description: '要转换的路径', defaultValue: '/home/user/file.txt' }]
    },

    // 文件URL
    {
      name: 'toFileUrl',
      description: '转换为文件URL',
      execute: ({ path }) => pathkit.toFileUrl(path),
      paramSchema: [{ name: 'path', type: 'string', description: '文件路径', defaultValue: '/home/user/file.txt' }]
    },
    {
      name: 'fromFileUrl',
      description: '从文件URL获取路径',
      execute: ({ url }) => pathkit.fromFileUrl(url),
      paramSchema: [{ name: 'url', type: 'string', description: '文件URL', defaultValue: 'file:///home/user/file.txt' }]
    }
  ]

  return <FunctionDemo title="PathKit - 路径处理工具集" functions={functions} />
}

export default PathKitDemo
