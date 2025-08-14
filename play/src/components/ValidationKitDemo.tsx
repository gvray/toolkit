import React from 'react'
import FunctionDemo from './FunctionDemo'
import * as validationkit from '@gvray/validationkit'

const ValidationKitDemo: React.FC = () => {
  const functions = [
    // 基础验证器
    {
      name: 'isEmail',
      description: '验证邮箱格式',
      execute: ({ value }) => validationkit.isEmail(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的邮箱', defaultValue: 'test@example.com' }]
    },
    {
      name: 'isPhone',
      description: '验证手机号格式',
      execute: ({ value }) => validationkit.isPhone(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的手机号', defaultValue: '13800138000' }]
    },
    {
      name: 'isUrl',
      description: '验证URL格式',
      execute: ({ value }) => validationkit.isUrl(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的URL', defaultValue: 'https://example.com' }]
    },
    {
      name: 'isIdCard',
      description: '验证身份证号格式',
      execute: ({ value }) => validationkit.isIdCard(value),
      paramSchema: [
        { name: 'value', type: 'string', description: '要验证的身份证号', defaultValue: '110101199001011234' }
      ]
    },
    {
      name: 'isPostcode',
      description: '验证邮政编码格式',
      execute: ({ value }) => validationkit.isPostcode(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的邮政编码', defaultValue: '100000' }]
    },

    // 字符串验证
    {
      name: 'isString',
      description: '验证是否为字符串',
      execute: ({ value }) => validationkit.isString(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的值', defaultValue: 'hello' }]
    },
    {
      name: 'isNotEmpty',
      description: '验证字符串是否非空',
      execute: ({ value }) => validationkit.isNotEmpty(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的字符串', defaultValue: 'hello' }]
    },
    {
      name: 'isLength',
      description: '验证字符串长度',
      execute: ({ value, min, max }) => validationkit.isLength(value, min, max),
      paramSchema: [
        { name: 'value', type: 'string', description: '要验证的字符串', defaultValue: 'hello' },
        { name: 'min', type: 'number', description: '最小长度', defaultValue: '3' },
        { name: 'max', type: 'number', description: '最大长度', defaultValue: '10' }
      ]
    },

    // 数字验证
    {
      name: 'isNumber',
      description: '验证是否为数字',
      execute: ({ value }) => validationkit.isNumber(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的值', defaultValue: '123' }]
    },
    {
      name: 'isInteger',
      description: '验证是否为整数',
      execute: ({ value }) => validationkit.isInteger(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的值', defaultValue: '123' }]
    },
    {
      name: 'isPositive',
      description: '验证是否为正数',
      execute: ({ value }) => validationkit.isPositive(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的值', defaultValue: '123' }]
    },
    {
      name: 'isNegative',
      description: '验证是否为负数',
      execute: ({ value }) => validationkit.isNegative(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的值', defaultValue: '-123' }]
    },
    {
      name: 'isRange',
      description: '验证数值是否在指定范围内',
      execute: ({ value, min, max }) => validationkit.isRange(value, min, max),
      paramSchema: [
        { name: 'value', type: 'string', description: '要验证的值', defaultValue: '50' },
        { name: 'min', type: 'number', description: '最小值', defaultValue: '0' },
        { name: 'max', type: 'number', description: '最大值', defaultValue: '100' }
      ]
    },

    // 数组验证
    {
      name: 'isArray',
      description: '验证是否为数组',
      execute: ({ value }) => validationkit.isArray(value),
      paramSchema: [{ name: 'value', type: 'array', description: '要验证的值', defaultValue: [1, 2, 3] }]
    },
    {
      name: 'isNotEmptyArray',
      description: '验证数组是否非空',
      execute: ({ value }) => validationkit.isNotEmptyArray(value),
      paramSchema: [{ name: 'value', type: 'array', description: '要验证的数组', defaultValue: [1, 2, 3] }]
    },
    {
      name: 'isArrayLength',
      description: '验证数组长度',
      execute: ({ value, min, max }) => validationkit.isArrayLength(value, min, max),
      paramSchema: [
        { name: 'value', type: 'array', description: '要验证的数组', defaultValue: [1, 2, 3] },
        { name: 'min', type: 'number', description: '最小长度', defaultValue: 2 },
        { name: 'max', type: 'number', description: '最大长度', defaultValue: 5 }
      ]
    },

    // 对象验证
    {
      name: 'isObject',
      description: '验证是否为对象',
      execute: ({ value }) => validationkit.isObject(value),
      paramSchema: [{ name: 'value', type: 'object', description: '要验证的值', defaultValue: { a: 1 } }]
    },
    {
      name: 'hasKeys',
      description: '验证对象是否包含指定键',
      execute: ({ value, keys }) => validationkit.hasKeys(value, keys),
      paramSchema: [
        { name: 'value', type: 'object', description: '要验证的对象', defaultValue: { name: 'john', age: 25 } },
        { name: 'keys', type: 'array', description: '必需的键数组', defaultValue: ['name', 'age'] }
      ]
    },

    // 日期验证
    {
      name: 'isDate',
      description: '验证是否为有效日期',
      execute: ({ value }) => validationkit.isDate(value),
      paramSchema: [{ name: 'value', type: 'string', description: '要验证的日期', defaultValue: '2024-01-15' }]
    },
    {
      name: 'isDateRange',
      description: '验证日期是否在指定范围内',
      execute: ({ value, start, end }) => validationkit.isDateRange(value, start, end),
      paramSchema: [
        { name: 'value', type: 'string', description: '要验证的日期', defaultValue: '2024-01-15' },
        { name: 'start', type: 'string', description: '开始日期', defaultValue: '2024-01-01' },
        { name: 'end', type: 'string', description: '结束日期', defaultValue: '2024-12-31' }
      ]
    },

    // 自定义验证
    {
      name: 'custom',
      description: '自定义验证函数',
      execute: ({ value, validator }) => {
        // 这里需要根据实际情况实现自定义验证
        return validationkit.custom(value, (val) => val.length > 0)
      },
      paramSchema: [
        { name: 'value', type: 'string', description: '要验证的值', defaultValue: 'hello' },
        { name: 'validator', type: 'string', description: '验证函数(可选)', defaultValue: '' }
      ]
    },

    // 组合验证
    {
      name: 'validate',
      description: '组合验证多个规则',
      execute: ({ value, rules }) => {
        // 这里需要根据实际情况实现组合验证
        return validationkit.validate(value, rules)
      },
      paramSchema: [
        { name: 'value', type: 'string', description: '要验证的值', defaultValue: 'test@example.com' },
        { name: 'rules', type: 'array', description: '验证规则数组', defaultValue: ['isEmail', 'isNotEmpty'] }
      ]
    }
  ]

  // 动态计算 ValidationKit 的实际方法数量
  const totalFunctions = Object.keys(validationkit).length

  return <FunctionDemo title="ValidationKit - 数据验证工具集" functions={functions} totalFunctions={totalFunctions} />
}

export default ValidationKitDemo
