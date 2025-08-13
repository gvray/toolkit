import React from 'react'
import FunctionDemo from './FunctionDemo'
import * as adminkit from '@gvray/adminkit'

const AdminKitDemo: React.FC = () => {
  const functions = [
    // 复制功能
    {
      name: 'copy',
      description: '复制文本到剪贴板',
      execute: ({ text }) => adminkit.copy(text),
      paramSchema: [{ name: 'text', type: 'string', description: '要复制的文本', defaultValue: 'Hello World' }]
    },

    // 存储功能
    {
      name: 'setStorage',
      description: '设置存储项',
      execute: ({ key, value, type }) => adminkit.setStorage(key, value, type),
      paramSchema: [
        { name: 'key', type: 'string', description: '存储键名', defaultValue: 'test-key' },
        { name: 'value', type: 'string', description: '存储值', defaultValue: 'test-value' },
        { name: 'type', type: 'string', description: '存储类型(local/session)', defaultValue: 'local' }
      ]
    },
    {
      name: 'getStorage',
      description: '获取存储项',
      execute: ({ key, type }) => adminkit.getStorage(key, type),
      paramSchema: [
        { name: 'key', type: 'string', description: '存储键名', defaultValue: 'test-key' },
        { name: 'type', type: 'string', description: '存储类型(local/session)', defaultValue: 'local' }
      ]
    },
    {
      name: 'removeStorage',
      description: '移除存储项',
      execute: ({ key, type }) => adminkit.removeStorage(key, type),
      paramSchema: [
        { name: 'key', type: 'string', description: '存储键名', defaultValue: 'test-key' },
        { name: 'type', type: 'string', description: '存储类型(local/session)', defaultValue: 'local' }
      ]
    },
    {
      name: 'clearStorage',
      description: '清空存储',
      execute: ({ type }) => adminkit.clearStorage(type),
      paramSchema: [{ name: 'type', type: 'string', description: '存储类型(local/session)', defaultValue: 'local' }]
    },

    // 格式化功能
    {
      name: 'formatNumber',
      description: '格式化数字',
      execute: ({ number, options }) => adminkit.formatNumber(number, options),
      paramSchema: [
        { name: 'number', type: 'number', description: '要格式化的数字', defaultValue: '1234567.89' },
        {
          name: 'options',
          type: 'object',
          description: '格式化选项',
          defaultValue: { style: 'currency', currency: 'USD' }
        }
      ]
    },
    {
      name: 'formatDate',
      description: '格式化日期',
      execute: ({ date, format }) => adminkit.formatDate(date, format),
      paramSchema: [
        { name: 'date', type: 'string', description: '要格式化的日期', defaultValue: '2024-01-15' },
        { name: 'format', type: 'string', description: '格式化模板', defaultValue: 'YYYY-MM-DD' }
      ]
    },
    {
      name: 'formatFileSize',
      description: '格式化文件大小',
      execute: ({ bytes }) => adminkit.formatFileSize(bytes),
      paramSchema: [{ name: 'bytes', type: 'number', description: '字节数', defaultValue: '1024' }]
    },

    // 加载功能
    {
      name: 'showLoading',
      description: '显示加载状态',
      execute: ({ message }) => adminkit.showLoading(message),
      paramSchema: [{ name: 'message', type: 'string', description: '加载消息', defaultValue: '加载中...' }]
    },
    {
      name: 'hideLoading',
      description: '隐藏加载状态',
      execute: () => adminkit.hideLoading(),
      paramSchema: []
    },

    // 事件总线
    {
      name: 'emit',
      description: '发送事件',
      execute: ({ event, data }) => adminkit.emit(event, data),
      paramSchema: [
        { name: 'event', type: 'string', description: '事件名', defaultValue: 'test-event' },
        { name: 'data', type: 'object', description: '事件数据', defaultValue: { message: 'hello' } }
      ]
    },
    {
      name: 'on',
      description: '监听事件',
      execute: ({ event }) => {
        adminkit.on(event, (data) => {
          console.log(`收到事件: ${event}`, data)
        })
        return `已监听事件: ${event}`
      },
      paramSchema: [{ name: 'event', type: 'string', description: '事件名', defaultValue: 'test-event' }]
    },
    {
      name: 'off',
      description: '移除事件监听',
      execute: ({ event }) => adminkit.off(event),
      paramSchema: [{ name: 'event', type: 'string', description: '事件名', defaultValue: 'test-event' }]
    }
  ]

  return <FunctionDemo title="AdminKit - 管理后台工具集" functions={functions} />
}

export default AdminKitDemo
