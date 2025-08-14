import React from 'react'
import FunctionDemo from './FunctionDemo'
import * as domkit from '@gvray/domkit'

const DOMKitDemo: React.FC = () => {
  const functions = [
    // DOM检测
    {
      name: 'isBrowser',
      description: '检查是否在浏览器环境',
      execute: () => domkit.isBrowser(),
      paramSchema: []
    },
    {
      name: 'canUseDom',
      description: '检查是否可以使用DOM',
      execute: () => domkit.canUseDom(),
      paramSchema: []
    },
    {
      name: 'getBrowser',
      description: '获取浏览器信息',
      execute: () => domkit.getBrowser(),
      paramSchema: []
    },
    {
      name: 'getPlatform',
      description: '获取平台信息',
      execute: () => domkit.getPlatform(),
      paramSchema: []
    },
    {
      name: 'isIE',
      description: '检查是否为IE浏览器',
      execute: () => domkit.isIE(),
      paramSchema: []
    },

    // DOM创建和操作
    {
      name: 'createDom',
      description: '创建DOM元素',
      execute: ({ tag, attributes, children }) => {
        const element = domkit.createDom(tag, attributes, children)
        return element.outerHTML
      },
      paramSchema: [
        { name: 'tag', type: 'string', description: '标签名', defaultValue: 'div' },
        {
          name: 'attributes',
          type: 'object',
          description: '属性对象',
          defaultValue: { class: 'demo', id: 'test' }
        },
        { name: 'children', type: 'string', description: '子元素HTML', defaultValue: '<span>Hello</span>' }
      ]
    },
    {
      name: 'removeDom',
      description: '移除DOM元素',
      execute: ({ selector }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.removeDom(element)
          return `已移除元素: ${selector}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [{ name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' }]
    },
    {
      name: 'emptyDom',
      description: '清空DOM元素内容',
      execute: ({ selector }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.emptyDom(element)
          return `已清空元素: ${selector}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [{ name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' }]
    },

    // 样式操作
    {
      name: 'addClass',
      description: '添加CSS类',
      execute: ({ selector, className }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.addClass(element, className)
          return `已添加类: ${className}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'className', type: 'string', description: '要添加的类名', defaultValue: 'highlight' }
      ]
    },
    {
      name: 'removeClass',
      description: '移除CSS类',
      execute: ({ selector, className }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.removeClass(element, className)
          return `已移除类: ${className}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'className', type: 'string', description: '要移除的类名', defaultValue: 'highlight' }
      ]
    },
    {
      name: 'hasClass',
      description: '检查是否包含CSS类',
      execute: ({ selector, className }) => {
        const element = document.querySelector(selector)
        if (element) {
          return domkit.hasClass(element, className)
        }
        return false
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'className', type: 'string', description: '要检查的类名', defaultValue: 'highlight' }
      ]
    },
    {
      name: 'setClass',
      description: '设置CSS类',
      execute: ({ selector, className }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.setClass(element, className)
          return `已设置类: ${className}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'className', type: 'string', description: '要设置的类名', defaultValue: 'new-class' }
      ]
    },
    {
      name: 'getClass',
      description: '获取CSS类',
      execute: ({ selector }) => {
        const element = document.querySelector(selector)
        if (element) {
          return domkit.getClass(element)
        }
        return ''
      },
      paramSchema: [{ name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' }]
    },

    // CSS变量操作
    {
      name: 'setCssVariable',
      description: '设置CSS变量',
      execute: ({ selector, name, value }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.setCssVariable(element, name, value)
          return `已设置CSS变量: ${name} = ${value}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'name', type: 'string', description: '变量名', defaultValue: '--primary-color' },
        { name: 'value', type: 'string', description: '变量值', defaultValue: '#007bff' }
      ]
    },
    {
      name: 'getCssVariable',
      description: '获取CSS变量',
      execute: ({ selector, name }) => {
        const element = document.querySelector(selector)
        if (element) {
          return domkit.getCssVariable(element, name)
        }
        return ''
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'name', type: 'string', description: '变量名', defaultValue: '--primary-color' }
      ]
    },
    {
      name: 'removeCssVariable',
      description: '移除CSS变量',
      execute: ({ selector, name }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.removeCssVariable(element, name)
          return `已移除CSS变量: ${name}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'name', type: 'string', description: '变量名', defaultValue: '--primary-color' }
      ]
    },

    // 位置和滚动
    {
      name: 'getBoundingClientPosition',
      description: '获取元素相对于视口的位置',
      execute: ({ selector }) => {
        const element = document.querySelector(selector)
        if (element) {
          return domkit.getBoundingClientPosition(element)
        }
        return null
      },
      paramSchema: [{ name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' }]
    },
    {
      name: 'getOffsetPosition',
      description: '获取元素相对于文档的位置',
      execute: ({ selector }) => {
        const element = document.querySelector(selector)
        if (element) {
          return domkit.getOffsetPosition(element)
        }
        return null
      },
      paramSchema: [{ name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' }]
    },
    {
      name: 'getScrollPosition',
      description: '获取滚动位置',
      execute: ({ element }) => {
        const target = element ? document.querySelector(element) : window
        return domkit.getScrollPosition(target)
      },
      paramSchema: [{ name: 'element', type: 'string', description: '元素选择器(可选)', defaultValue: '' }]
    },
    {
      name: 'scrollTo',
      description: '滚动到指定位置',
      execute: ({ x, y, element, smooth }) => {
        const target = element ? document.querySelector(element) : window
        domkit.scrollTo(target, x, y, smooth)
        return `已滚动到位置: x=${x}, y=${y}`
      },
      paramSchema: [
        { name: 'x', type: 'number', description: 'X坐标', defaultValue: 0 },
        { name: 'y', type: 'number', description: 'Y坐标', defaultValue: 100 },
        { name: 'element', type: 'string', description: '元素选择器(可选)', defaultValue: '' },
        { name: 'smooth', type: 'boolean', description: '是否平滑滚动', defaultValue: true }
      ]
    },

    // 事件处理
    {
      name: 'addEvent',
      description: '添加事件监听器',
      execute: ({ selector, event, handler }) => {
        const element = document.querySelector(selector)
        if (element) {
          const eventHandler = () => console.log(`事件触发: ${event}`)
          domkit.addEvent(element, event, eventHandler)
          return `已添加事件监听器: ${event}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'event', type: 'string', description: '事件名', defaultValue: 'click' },
        { name: 'handler', type: 'string', description: '处理函数(可选)', defaultValue: '' }
      ]
    },
    {
      name: 'removeEvent',
      description: '移除事件监听器',
      execute: ({ selector, event }) => {
        const element = document.querySelector(selector)
        if (element) {
          domkit.removeEvent(element, event)
          return `已移除事件监听器: ${event}`
        }
        return `未找到元素: ${selector}`
      },
      paramSchema: [
        { name: 'selector', type: 'string', description: 'CSS选择器', defaultValue: '.demo-element' },
        { name: 'event', type: 'string', description: '事件名', defaultValue: 'click' }
      ]
    },

    // 动画帧
    {
      name: 'requestAnimationFrame',
      description: '请求动画帧',
      execute: ({ callback }) => {
        const id = domkit.requestAnimationFrame(() => {
          console.log('动画帧执行')
        })
        return `动画帧ID: ${id}`
      },
      paramSchema: [{ name: 'callback', type: 'string', description: '回调函数(可选)', defaultValue: '' }]
    },
    {
      name: 'cancelAnimationFrame',
      description: '取消动画帧',
      execute: ({ id }) => {
        domkit.cancelAnimationFrame(id)
        return `已取消动画帧: ${id}`
      },
      paramSchema: [{ name: 'id', type: 'number', description: '动画帧ID', defaultValue: 1 }]
    },

    // 工具函数
    {
      name: 'rem',
      description: '将px转换为rem',
      execute: ({ px }) => domkit.rem(px),
      paramSchema: [{ name: 'px', type: 'number', description: '像素值', defaultValue: 16 }]
    },
    {
      name: 'getTextPixelWidth',
      description: '获取文本像素宽度',
      execute: ({ text, font }) => domkit.getTextPixelWidth(text, font),
      paramSchema: [
        { name: 'text', type: 'string', description: '文本内容', defaultValue: 'Hello World' },
        { name: 'font', type: 'string', description: '字体样式', defaultValue: '16px Arial' }
      ]
    }
  ]

  // 动态计算 DOMKit 的实际方法数量
  const totalFunctions = Object.keys(domkit).length

  return <FunctionDemo title="DOMKit - DOM 操作工具集" functions={functions} totalFunctions={totalFunctions} />
}

export default DOMKitDemo
