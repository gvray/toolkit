import React from 'react'
import * as mathkit from '@gvray/mathkit'
import FunctionDemo from './FunctionDemo'

const MathKitDemo: React.FC = () => {
  const functions = [
    // 算术运算
    {
      name: 'add',
      description: '高精度加法运算',
      execute: ({ a, b }) => mathkit.add(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '第一个加数', defaultValue: 0.1 },
        { name: 'b', type: 'number', description: '第二个加数', defaultValue: 0.2 }
      ]
    },
    {
      name: 'subtract',
      description: '高精度减法运算',
      execute: ({ a, b }) => mathkit.subtract(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '被减数', defaultValue: 0.3 },
        { name: 'b', type: 'number', description: '减数', defaultValue: 0.1 }
      ]
    },
    {
      name: 'multiply',
      description: '高精度乘法运算',
      execute: ({ a, b }) => mathkit.multiply(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '第一个乘数', defaultValue: 0.1 },
        { name: 'b', type: 'number', description: '第二个乘数', defaultValue: 0.2 }
      ]
    },
    {
      name: 'divide',
      description: '高精度除法运算',
      execute: ({ a, b }) => mathkit.divide(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '被除数', defaultValue: 0.3 },
        { name: 'b', type: 'number', description: '除数', defaultValue: 0.1 }
      ]
    },

    // 比较运算
    {
      name: 'isEqual',
      description: '比较两个数字是否相等',
      execute: ({ a, b }) => mathkit.isEqual(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '第一个数字', defaultValue: 0.1 },
        { name: 'b', type: 'number', description: '第二个数字', defaultValue: 0.1 }
      ]
    },
    {
      name: 'isGreaterThan',
      description: '检查第一个数字是否大于第二个',
      execute: ({ a, b }) => mathkit.isGreaterThan(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '第一个数字', defaultValue: 5 },
        { name: 'b', type: 'number', description: '第二个数字', defaultValue: 3 }
      ]
    },
    {
      name: 'isLessThan',
      description: '检查第一个数字是否小于第二个',
      execute: ({ a, b }) => mathkit.isLessThan(a, b),
      paramSchema: [
        { name: 'a', type: 'number', description: '第一个数字', defaultValue: 3 },
        { name: 'b', type: 'number', description: '第二个数字', defaultValue: 5 }
      ]
    },

    // 随机数生成
    {
      name: 'random',
      description: '生成指定范围内的随机数',
      execute: ({ min, max }) => mathkit.random(min, max),
      paramSchema: [
        { name: 'min', type: 'number', description: '最小值', defaultValue: 1 },
        { name: 'max', type: 'number', description: '最大值', defaultValue: 10 }
      ]
    },
    {
      name: 'randomInt',
      description: '生成指定范围内的随机整数',
      execute: ({ min, max }) => mathkit.randomInt(min, max),
      paramSchema: [
        { name: 'min', type: 'number', description: '最小值', defaultValue: 1 },
        { name: 'max', type: 'number', description: '最大值', defaultValue: 100 }
      ]
    },

    // 序列生成
    {
      name: 'range',
      description: '生成数字序列',
      execute: ({ start, end, step }) => mathkit.range(start, end, step),
      paramSchema: [
        { name: 'start', type: 'number', description: '起始值', defaultValue: 1 },
        { name: 'end', type: 'number', description: '结束值', defaultValue: 10 },
        { name: 'step', type: 'number', description: '步长', defaultValue: 1 }
      ]
    },
    {
      name: 'sequence',
      description: '生成指定长度的序列',
      execute: ({ length, start, step }) => mathkit.sequence(length, start, step),
      paramSchema: [
        { name: 'length', type: 'number', description: '序列长度', defaultValue: 5 },
        { name: 'start', type: 'number', description: '起始值', defaultValue: 1 },
        { name: 'step', type: 'number', description: '步长', defaultValue: 2 }
      ]
    }
  ]

  // 动态计算 MathKit 的实际方法数量
  const totalFunctions = Object.keys(mathkit).length

  return <FunctionDemo title="MathKit - 数学计算工具集" functions={functions} totalFunctions={totalFunctions} />
}

export default MathKitDemo
