import React from 'react'
import FunctionDemo from './FunctionDemo'
import * as mathkit from '@gvray/mathkit'

const MathKitDemo: React.FC = () => {
  const functions = [
    // 算术运算
    {
      name: 'add',
      description: '加法运算',
      execute: ({ a, b }) => mathkit.add(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '第一个数', defaultValue: '5' },
        { name: 'b', type: 'number', description: '第二个数', defaultValue: '3' }
      ]
    },
    {
      name: 'subtract',
      description: '减法运算',
      execute: ({ a, b }) => mathkit.subtract(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '被减数', defaultValue: '10' },
        { name: 'b', type: 'number', description: '减数', defaultValue: '3' }
      ]
    },
    {
      name: 'multiply',
      description: '乘法运算',
      execute: ({ a, b }) => mathkit.multiply(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '第一个数', defaultValue: '4' },
        { name: 'b', type: 'number', description: '第二个数', defaultValue: '5' }
      ]
    },
    {
      name: 'divide',
      description: '除法运算',
      execute: ({ a, b }) => mathkit.divide(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '被除数', defaultValue: '15' },
        { name: 'b', type: 'number', description: '除数', defaultValue: '3' }
      ]
    },
    {
      name: 'modulo',
      description: '取模运算',
      execute: ({ a, b }) => mathkit.modulo(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '被除数', defaultValue: '17' },
        { name: 'b', type: 'number', description: '除数', defaultValue: '5' }
      ]
    },
    {
      name: 'power',
      description: '幂运算',
      execute: ({ base, exponent }) => mathkit.power(base, exponent),
      paramSchema: [
        { name: 'base', type: 'number', description: '底数', defaultValue: '2' },
        { name: 'exponent', type: 'number', description: '指数', defaultValue: '3' }
      ]
    },

    // 比较和边界
    {
      name: 'clamp',
      description: '将数值限制在指定范围内',
      execute: ({ value, min, max }) => mathkit.clamp(value, min, max),
      paramSchema: [
        { name: 'value', type: 'number', description: '要限制的值', defaultValue: '15' },
        { name: 'min', type: 'number', description: '最小值', defaultValue: '0' },
        { name: 'max', type: 'number', description: '最大值', defaultValue: '10' }
      ]
    },
    {
      name: 'isBetween',
      description: '检查数值是否在指定范围内',
      execute: ({ value, min, max, inclusive }) => mathkit.isBetween(value, min, max, inclusive),
      paramSchema: [
        { name: 'value', type: 'number', description: '要检查的值', defaultValue: '5' },
        { name: 'min', type: 'number', description: '最小值', defaultValue: '0' },
        { name: 'max', type: 'number', description: '最大值', defaultValue: '10' },
        { name: 'inclusive', type: 'boolean', description: '是否包含边界', defaultValue: 'true' }
      ]
    },
    {
      name: 'isEven',
      description: '检查是否为偶数',
      execute: ({ value }) => mathkit.isEven(value),
      paramSchema: [{ name: 'value', type: 'number', description: '要检查的值', defaultValue: '6' }]
    },
    {
      name: 'isOdd',
      description: '检查是否为奇数',
      execute: ({ value }) => mathkit.isOdd(value),
      paramSchema: [{ name: 'value', type: 'number', description: '要检查的值', defaultValue: '7' }]
    },

    // 随机数生成
    {
      name: 'random',
      description: '生成指定范围内的随机数',
      execute: ({ min, max }) => mathkit.random(min, max),
      paramSchema: [
        { name: 'min', type: 'number', description: '最小值', defaultValue: '1' },
        { name: 'max', type: 'number', description: '最大值', defaultValue: '100' }
      ]
    },
    {
      name: 'randomInt',
      description: '生成指定范围内的随机整数',
      execute: ({ min, max }) => mathkit.randomInt(min, max),
      paramSchema: [
        { name: 'min', type: 'number', description: '最小值', defaultValue: '1' },
        { name: 'max', type: 'number', description: '最大值', defaultValue: '10' }
      ]
    },

    // 序列和范围
    {
      name: 'range',
      description: '生成数字序列',
      execute: ({ start, end, step }) => mathkit.range(start, end, step),
      paramSchema: [
        { name: 'start', type: 'number', description: '起始值', defaultValue: '0' },
        { name: 'end', type: 'number', description: '结束值', defaultValue: '10' },
        { name: 'step', type: 'number', description: '步长', defaultValue: '2' }
      ]
    },
    {
      name: 'sequence',
      description: '生成指定长度的序列',
      execute: ({ length, start, step }) => mathkit.sequence(length, start, step),
      paramSchema: [
        { name: 'length', type: 'number', description: '序列长度', defaultValue: '5' },
        { name: 'start', type: 'number', description: '起始值', defaultValue: '1' },
        { name: 'step', type: 'number', description: '步长', defaultValue: '2' }
      ]
    }
  ]

  return <FunctionDemo title="MathKit - 数学工具集" functions={functions} />
}

export default MathKitDemo
