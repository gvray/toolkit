import React from 'react'
import * as eskit from '@gvray/eskit'
import FunctionDemo from './FunctionDemo'

const ESKitDemo: React.FC = () => {
  const functions = [
    // 类型检查工具
    {
      name: 'getType',
      description: '获取值的类型',
      execute: ({ value }) => eskit.getType(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要检查的值', defaultValue: '{"a":1}' }]
    },
    {
      name: 'isArray',
      description: '检查是否为数组',
      execute: ({ value }) => eskit.isArray(value),
      paramSchema: [{ name: 'value', type: 'array', description: '要检查的值', defaultValue: [1, 2, 3] }]
    },
    {
      name: 'isString',
      description: '检查是否为字符串',
      execute: ({ value }) => eskit.isString(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要检查的值', defaultValue: 'hello' }]
    },
    {
      name: 'isNumber',
      description: '检查是否为数字',
      execute: ({ value }) => eskit.isNumber(value),
      paramSchema: [{ name: 'value', type: 'number', description: '要检查的值', defaultValue: 123 }]
    },
    {
      name: 'isBoolean',
      description: '检查是否为布尔值',
      execute: ({ value }) => eskit.isBoolean(value),
      paramSchema: [{ name: 'value', type: 'boolean', description: '要检查的值', defaultValue: true }]
    },
    {
      name: 'isObject',
      description: '检查是否为对象',
      execute: ({ value }) => eskit.isObject(value),
      paramSchema: [{ name: 'value', type: 'object', description: '要检查的值', defaultValue: { a: 1, b: 2 } }]
    },
    {
      name: 'isEmpty',
      description: '检查是否为空值',
      execute: ({ value }) => eskit.isEmpty(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要检查的值', defaultValue: '' }]
    },

    // 对象工具
    {
      name: 'clone',
      description: '浅克隆对象',
      execute: ({ value }) => eskit.clone(value),
      paramSchema: [{ name: 'value', type: 'object', description: '要克隆的对象', defaultValue: { a: 1, b: 2 } }]
    },
    {
      name: 'deepClone',
      description: '深克隆对象',
      execute: ({ value }) => eskit.deepClone(value),
      paramSchema: [
        { name: 'value', type: 'object', description: '要深克隆的对象', defaultValue: { a: 1, b: { c: 3 } } }
      ]
    },
    {
      name: 'pick',
      description: '从对象中选取指定属性',
      execute: ({ obj, keys }) => eskit.pick(obj, keys),
      paramSchema: [
        { name: 'obj', type: 'object', description: '源对象', defaultValue: { a: 1, b: 2, c: 3 } },
        { name: 'keys', type: 'array', description: '要选取的属性名数组', defaultValue: ['a', 'c'] }
      ]
    },

    // 数组工具
    {
      name: 'contains',
      description: '检查数组是否包含指定元素',
      execute: ({ array, value }) => eskit.contains(array, value),
      paramSchema: [
        { name: 'array', type: 'array', description: '要检查的数组', defaultValue: [1, 2, 3, 4, 5] },
        { name: 'value', type: 'number', description: '要查找的值', defaultValue: 3 }
      ]
    },
    {
      name: 'difference',
      description: '获取两个数组的差集',
      execute: ({ array1, array2 }) => eskit.difference(array1, array2),
      paramSchema: [
        { name: 'array1', type: 'array', description: '第一个数组', defaultValue: [1, 2, 3, 4] },
        { name: 'array2', type: 'array', description: '第二个数组', defaultValue: [3, 4, 5, 6] }
      ]
    },
    {
      name: 'flatten',
      description: '扁平化数组',
      execute: ({ array }) => eskit.flatten(array),
      paramSchema: [
        { name: 'array', type: 'array', description: '要扁平化的数组', defaultValue: [1, [2, 3], [4, [5, 6]]] }
      ]
    },

    // 函数工具
    {
      name: 'compose',
      description: '函数组合',
      execute: ({ f1, f2, value }) => {
        // 将字符串转换为函数
        const actualF1 = new Function(`return ${f1}`)()
        const actualF2 = new Function(`return ${f2}`)()
        const composed = eskit.compose(actualF1, actualF2)
        return composed(value)
      },
      paramSchema: [
        { name: 'f1', type: 'string', description: '第一个函数', defaultValue: 'x => x * 2' },
        { name: 'f2', type: 'string', description: '第二个函数', defaultValue: 'x => x + 1' },
        { name: 'value', type: 'number', description: '输入值', defaultValue: 5 }
      ]
    },
    {
      name: 'curry',
      description: '函数柯里化',
      execute: ({ fn, arg1, arg2 }) => {
        // 将字符串转换为函数
        const actualFn = new Function(`return ${fn}`)()
        const curried = eskit.curry(actualFn)
        return curried(arg1)(arg2)
      },
      paramSchema: [
        { name: 'fn', type: 'string', description: '要柯里化的函数', defaultValue: '(a,b) => a + b' },
        { name: 'arg1', type: 'number', description: '第一个参数', defaultValue: 5 },
        { name: 'arg2', type: 'number', description: '第二个参数', defaultValue: 3 }
      ]
    },

    // 字符串工具
    {
      name: 'upperFirst',
      description: '首字母大写',
      execute: ({ str }) => eskit.upperFirst(str),
      paramSchema: [{ name: 'str', type: 'string', description: '要处理的字符串', defaultValue: 'hello world' }]
    },
    {
      name: 'lowerFirst',
      description: '首字母小写',
      execute: ({ str }) => eskit.lowerFirst(str),
      paramSchema: [{ name: 'str', type: 'string', description: '要处理的字符串', defaultValue: 'Hello World' }]
    },

    // 性能工具
    {
      name: 'debounce',
      description: '防抖函数',
      execute: ({ fn, delay }) => {
        // 将字符串转换为函数
        const actualFn = new Function(`return ${fn}`)()
        const debounced = eskit.debounce(actualFn, delay)
        return debounced
      },
      paramSchema: [
        { name: 'fn', type: 'string', description: '要防抖的函数', defaultValue: '() => console.log("debounced")' },
        { name: 'delay', type: 'number', description: '延迟时间(ms)', defaultValue: 300 }
      ]
    },
    {
      name: 'throttle',
      description: '节流函数',
      execute: ({ fn, delay }) => {
        // 将字符串转换为函数
        const actualFn = new Function(`return ${fn}`)()
        const throttled = eskit.throttle(actualFn, delay)
        return throttled
      },
      paramSchema: [
        { name: 'fn', type: 'string', description: '要节流的函数', defaultValue: '() => console.log("throttled")' },
        { name: 'delay', type: 'number', description: '延迟时间(ms)', defaultValue: 300 }
      ]
    },

    // 数据结构工具
    {
      name: 'treeToList',
      description: '树形结构转列表',
      execute: ({ tree }) => eskit.treeToList(tree),
      paramSchema: [
        { name: 'tree', type: 'object', description: '树形结构', defaultValue: [{ id: 1, children: [{ id: 2 }] }] }
      ]
    },
    {
      name: 'listToTree',
      description: '列表转树形结构',
      execute: ({ list }) => eskit.listToTree(list),
      paramSchema: [
        {
          name: 'list',
          type: 'array',
          description: '列表数据',
          defaultValue: [
            { id: 1, parentId: null },
            { id: 2, parentId: 1 }
          ]
        }
      ]
    }
  ]

  // 动态计算 ESKit 的实际方法数量
  const totalFunctions = Object.keys(eskit).length

  return (
    <FunctionDemo title="ESKit - JavaScript/TypeScript 工具集" functions={functions} totalFunctions={totalFunctions} />
  )
}

export default ESKitDemo
