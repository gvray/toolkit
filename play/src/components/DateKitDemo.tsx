import React from 'react'
import FunctionDemo from './FunctionDemo'
import * as datekit from '@gvray/datekit'

const DateKitDemo: React.FC = () => {
  const functions = [
    // 日期格式化
    {
      name: 'format',
      description: '格式化日期',
      execute: ({ date, format }) => datekit.format(date, format),
      paramSchema: [
        { name: 'date', type: 'string', description: '日期字符串或Date对象', defaultValue: '2024-01-15' },
        { name: 'format', type: 'string', description: '格式化模板', defaultValue: 'YYYY-MM-DD HH:mm:ss' }
      ]
    },
    {
      name: 'formatRelative',
      description: '相对时间格式化',
      execute: ({ date, baseDate }) => datekit.formatRelative(date, baseDate),
      paramSchema: [
        { name: 'date', type: 'string', description: '目标日期', defaultValue: '2024-01-15' },
        { name: 'baseDate', type: 'string', description: '基准日期', defaultValue: '2024-01-20' }
      ]
    },

    // 日期解析
    {
      name: 'parse',
      description: '解析日期字符串',
      execute: ({ dateString, format }) => datekit.parse(dateString, format),
      paramSchema: [
        { name: 'dateString', type: 'string', description: '日期字符串', defaultValue: '2024-01-15' },
        { name: 'format', type: 'string', description: '日期格式', defaultValue: 'YYYY-MM-DD' }
      ]
    },
    {
      name: 'parseISO',
      description: '解析ISO格式日期',
      execute: ({ isoString }) => datekit.parseISO(isoString),
      paramSchema: [
        { name: 'isoString', type: 'string', description: 'ISO格式日期字符串', defaultValue: '2024-01-15T10:30:00Z' }
      ]
    },

    // 日期操作
    {
      name: 'add',
      description: '添加时间',
      execute: ({ date, amount, unit }) => datekit.add(date, amount, unit),
      paramSchema: [
        { name: 'date', type: 'string', description: '基准日期', defaultValue: '2024-01-15' },
        { name: 'amount', type: 'number', description: '数量', defaultValue: '7' },
        { name: 'unit', type: 'string', description: '时间单位', defaultValue: 'days' }
      ]
    },
    {
      name: 'subtract',
      description: '减去时间',
      execute: ({ date, amount, unit }) => datekit.subtract(date, amount, unit),
      paramSchema: [
        { name: 'date', type: 'string', description: '基准日期', defaultValue: '2024-01-15' },
        { name: 'amount', type: 'number', description: '数量', defaultValue: '3' },
        { name: 'unit', type: 'string', description: '时间单位', defaultValue: 'days' }
      ]
    },
    {
      name: 'startOf',
      description: '获取时间段的开始',
      execute: ({ date, unit }) => datekit.startOf(date, unit),
      paramSchema: [
        { name: 'date', type: 'string', description: '日期', defaultValue: '2024-01-15T14:30:45' },
        { name: 'unit', type: 'string', description: '时间单位', defaultValue: 'day' }
      ]
    },
    {
      name: 'endOf',
      description: '获取时间段的结束',
      execute: ({ date, unit }) => datekit.endOf(date, unit),
      paramSchema: [
        { name: 'date', type: 'string', description: '日期', defaultValue: '2024-01-15T14:30:45' },
        { name: 'unit', type: 'string', description: '时间单位', defaultValue: 'day' }
      ]
    },

    // 日期比较
    {
      name: 'isAfter',
      description: '检查日期是否在另一个日期之后',
      execute: ({ date1, date2 }) => datekit.isAfter(date1, date2),
      paramSchema: [
        { name: 'date1', type: 'string', description: '第一个日期', defaultValue: '2024-01-20' },
        { name: 'date2', type: 'string', description: '第二个日期', defaultValue: '2024-01-15' }
      ]
    },
    {
      name: 'isBefore',
      description: '检查日期是否在另一个日期之前',
      execute: ({ date1, date2 }) => datekit.isBefore(date1, date2),
      paramSchema: [
        { name: 'date1', type: 'string', description: '第一个日期', defaultValue: '2024-01-10' },
        { name: 'date2', type: 'string', description: '第二个日期', defaultValue: '2024-01-15' }
      ]
    },
    {
      name: 'isSame',
      description: '检查两个日期是否相同',
      execute: ({ date1, date2, unit }) => datekit.isSame(date1, date2, unit),
      paramSchema: [
        { name: 'date1', type: 'string', description: '第一个日期', defaultValue: '2024-01-15' },
        { name: 'date2', type: 'string', description: '第二个日期', defaultValue: '2024-01-15' },
        { name: 'unit', type: 'string', description: '比较单位', defaultValue: 'day' }
      ]
    },

    // 日期验证
    {
      name: 'isValid',
      description: '检查日期是否有效',
      execute: ({ date }) => datekit.isValid(date),
      paramSchema: [{ name: 'date', type: 'string', description: '要检查的日期', defaultValue: '2024-01-15' }]
    },
    {
      name: 'isLeapYear',
      description: '检查是否为闰年',
      execute: ({ year }) => datekit.isLeapYear(year),
      paramSchema: [{ name: 'year', type: 'number', description: '年份', defaultValue: '2024' }]
    },

    // 时长
    {
      name: 'duration',
      description: '创建时长对象',
      execute: ({ amount, unit }) => datekit.duration(amount, unit),
      paramSchema: [
        { name: 'amount', type: 'number', description: '数量', defaultValue: '7' },
        { name: 'unit', type: 'string', description: '时间单位', defaultValue: 'days' }
      ]
    },
    {
      name: 'humanize',
      description: '人性化显示时长',
      execute: ({ duration }) => datekit.humanize(duration),
      paramSchema: [{ name: 'duration', type: 'object', description: '时长对象', defaultValue: { days: 7 } }]
    }
  ]

  // 动态计算 DateKit 的实际方法数量
  const totalFunctions = Object.keys(datekit).length

  return <FunctionDemo title="DateKit - 日期时间工具集" functions={functions} totalFunctions={totalFunctions} />
}

export default DateKitDemo
