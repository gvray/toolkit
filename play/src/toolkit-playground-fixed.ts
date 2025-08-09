// 导入所有工具包
import * as eskit from '@gvray/eskit'
import * as mathkit from '@gvray/mathkit'
import * as datekit from '@gvray/datekit'
import * as validationkit from '@gvray/validationkit'
import * as domkit from '@gvray/domkit'
import * as adminkit from '@gvray/adminkit'
import * as pathkit from '@gvray/pathkit'

import { createEskitDemos } from './demos/eskit-demos'
import { createMathkitDemos } from './demos/mathkit-demos'
import { createDatekitDemos } from './demos/datekit-demos'
import { createValidationkitDemos } from './demos/validationkit-demos'
import { createDomkitDemos } from './demos/domkit-demos'
import { createAdminkitDemos } from './demos/adminkit-demos'
import { createPathkitDemos } from './demos/pathkit-demos'

// 控制台输出管理
class Console {
  private output: HTMLElement

  constructor() {
    this.output = document.getElementById('console-output')!
  }

  log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const timestamp = new Date().toLocaleTimeString()
    const prefix = type === 'info' ? '📝' : type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'

    this.output.textContent += `[${timestamp}] ${prefix} ${message}\n`
    this.output.scrollTop = this.output.scrollHeight
  }

  clear() {
    this.output.textContent = ''
  }
}

// 全局控制台实例
export const logger = new Console()

// 演示管理器
class DemoManager {
  private demoArea: HTMLElement
  private navButtons: NodeListOf<HTMLButtonElement>

  constructor() {
    this.demoArea = document.getElementById('demo-area')!
    this.navButtons = document.querySelectorAll('.nav-btn')
    this.setupEventListeners()
    this.showKit('eskit')
  }

  private setupEventListeners() {
    // 导航按钮事件
    this.navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const kit = btn.dataset.kit!
        this.showKit(kit)
      })
    })

    // 清空控制台
    document.getElementById('clear-console')!.addEventListener('click', () => {
      logger.clear()
    })
  }

  private showKit(kit: string) {
    // 更新当前活跃的导航按钮
    this.navButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.kit === kit)
    })

    this.renderDemos(kit)
    logger.log(`切换到 ${kit.toUpperCase()} 演示`)
  }

  private renderDemos(kit: string) {
    switch (kit) {
      case 'eskit':
        this.demoArea.innerHTML = createEskitDemos()
        break
      case 'mathkit':
        this.demoArea.innerHTML = createMathkitDemos()
        break
      case 'datekit':
        this.demoArea.innerHTML = createDatekitDemos()
        break
      case 'validationkit':
        this.demoArea.innerHTML = createValidationkitDemos()
        break
      case 'domkit':
        this.demoArea.innerHTML = createDomkitDemos()
        break
      case 'adminkit':
        this.demoArea.innerHTML = createAdminkitDemos()
        break
      case 'pathkit':
        this.demoArea.innerHTML = createPathkitDemos()
        break
    }

    // 绑定演示事件
    this.bindDemoEvents(kit)
  }

  private bindDemoEvents(kit: string) {
    // 根据不同的 kit 绑定相应的演示事件
    const buttons = this.demoArea.querySelectorAll('button[data-demo]')
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const demo = btn.getAttribute('data-demo')!
        this.runDemo(kit, demo, btn as HTMLButtonElement)
      })
    })
  }

  private runDemo(kit: string, demo: string, button: HTMLButtonElement) {
    try {
      logger.log(`执行 ${kit}.${demo} 演示...`)

      // 根据不同的工具包执行相应的演示
      switch (kit) {
        case 'eskit':
          this.runEskitDemo(demo, button)
          break
        case 'mathkit':
          this.runMathkitDemo(demo, button)
          break
        case 'datekit':
          this.runDatekitDemo(demo, button)
          break
        case 'validationkit':
          this.runValidationkitDemo(demo, button)
          break
        case 'domkit':
          this.runDomkitDemo(demo, button)
          break
        case 'adminkit':
          this.runAdminkitDemo(demo, button)
          break
        case 'pathkit':
          this.runPathkitDemo(demo, button)
          break
      }
    } catch (error) {
      logger.log(`演示执行失败: ${error}`, 'error')
    }
  }

  private runEskitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'contains': {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const hasThree = eskit.contains(arr, 3)
        result.innerHTML = `数组 [${arr}] 是否包含 3: ${hasThree}`
        logger.log(`contains([${arr}], 3) = ${hasThree}`, 'success')
        break
      }

      case 'debounce': {
        let count = 0
        const debouncedFn = eskit.debounce(() => {
          count++
          result.innerHTML = `防抖函数被调用 ${count} 次`
          logger.log(`防抖函数执行，调用次数: ${count}`, 'success')
        }, 300)

        // 连续调用多次
        for (let i = 0; i < 5; i++) {
          setTimeout(() => debouncedFn(), i * 50)
        }
        break
      }

      case 'throttle': {
        let throttleCount = 0
        const throttledFn = eskit.throttle(
          () => {
            throttleCount++
            result.innerHTML = `节流函数被调用 ${throttleCount} 次`
            logger.log(`节流函数执行，调用次数: ${throttleCount}`, 'success')
          },
          300,
          { leading: true }
        )

        // 连续调用多次
        for (let i = 0; i < 5; i++) {
          setTimeout(() => throttledFn(), i * 50)
        }
        break
      }

      case 'deepClone': {
        const obj = { a: 1, b: { c: 2, d: [3, 4] } }
        const cloned = eskit.deepClone(obj)
        cloned.b.c = 999
        result.innerHTML = `原对象: ${JSON.stringify(obj)}<br>克隆对象: ${JSON.stringify(cloned)}`
        logger.log(`深克隆测试完成，原对象未被修改`, 'success')
        break
      }

      case 'flatten': {
        const nestedArr = [1, [2, 3], [4, [5, 6]]]
        const flattenedArr = eskit.flatten(nestedArr)
        result.innerHTML = `原数组: ${JSON.stringify(nestedArr)}<br>展平后: [${flattenedArr}]`
        logger.log(`数组展平: ${JSON.stringify(flattenedArr)}`, 'success')
        break
      }

      case 'tryRun': {
        // 演示同步函数成功的情况
        eskit
          .tryRun(() => JSON.parse('{"name": "test"}'))
          .then((syncResult) => {
            result.innerHTML = `同步成功: ${JSON.stringify(syncResult)}<br>`
            logger.log(`tryRun 同步成功: ${JSON.stringify(syncResult)}`, 'success')

            // 演示同步函数失败的情况
            return eskit.tryRun(() => JSON.parse('invalid json'))
          })
          .then((syncError) => {
            result.innerHTML += `同步失败: ${syncError}<br>`
            logger.log(`tryRun 同步失败: ${syncError}`, 'info')

            // 演示异步函数成功的情况
            return eskit.tryRun(async () => {
              await new Promise((resolve) => setTimeout(resolve, 100))
              return { async: 'success', data: 42 }
            })
          })
          .then((asyncResult) => {
            result.innerHTML += `异步成功: ${JSON.stringify(asyncResult)}<br>`
            logger.log(`tryRun 异步成功: ${JSON.stringify(asyncResult)}`, 'success')

            // 演示异步函数失败的情况
            return eskit.tryRun(async () => {
              await new Promise((resolve) => setTimeout(resolve, 50))
              throw new Error('Async error')
            })
          })
          .then((asyncError) => {
            result.innerHTML += `异步失败: ${asyncError}`
            logger.log(`tryRun 异步失败: ${asyncError}`, 'info')
          })
          .catch((error) => {
            result.innerHTML = `演示出错: ${error.message}`
            logger.log(`tryRun 演示出错: ${error.message}`, 'error')
          })
        break
      }

      case 'tryRunSync': {
        // 演示成功情况
        const successResult = eskit.tryRunSync(() => {
          return JSON.parse(`{"data": "sync success", "timestamp": ${Date.now()}}`)
        })

        result.innerHTML = `同步成功: ${JSON.stringify(successResult)}<br>`
        logger.log(`tryRunSync 同步成功: ${JSON.stringify(successResult)}`, 'success')

        // 演示错误情况
        const errorResult = eskit.tryRunSync(() => {
          return JSON.parse('invalid json')
        })

        result.innerHTML += `同步失败: ${errorResult}<br>`
        logger.log(`tryRunSync 同步失败: ${errorResult}`, 'info')

        // 演示复杂操作
        const complexResult = eskit.tryRunSync(() => {
          const data = JSON.parse('{"values": [1, 2, 3, 4, 5]}')
          return data.values
            .filter((n: number) => n % 2 === 0)
            .map((n: number) => n * 2)
            .reduce((sum: number, n: number) => sum + n, 0)
        })

        result.innerHTML += `复杂操作: ${complexResult}`
        logger.log(`tryRunSync 复杂操作: ${complexResult}`, 'success')
        break
      }
    }
  }

  private runMathkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'clamp': {
        const value = 15
        const clamped = mathkit.clamp(value, 5, 10)
        result.innerHTML = `clamp(${value}, 5, 10) = ${clamped}`
        logger.log(`数值限制: ${value} 被限制在 [5, 10] 范围内，结果: ${clamped}`, 'success')
        break
      }

      case 'randomInt': {
        const randomNum = mathkit.randomInt(1, 100)
        result.innerHTML = `随机整数 (1-100): ${randomNum}`
        logger.log(`生成随机整数: ${randomNum}`, 'success')
        break
      }

      case 'add': {
        const a = 0.1
        const b = 0.2
        const sum = mathkit.add(a, b)
        result.innerHTML = `高精度加法: ${a} + ${b} = ${sum}`
        logger.log(`高精度计算: ${a} + ${b} = ${sum}`, 'success')
        break
      }

      case 'multiply': {
        const x = 0.1
        const y = 0.2
        const product = mathkit.multiply(x, y)
        result.innerHTML = `高精度乘法: ${x} × ${y} = ${product}`
        logger.log(`高精度计算: ${x} × ${y} = ${product}`, 'success')
        break
      }
    }
  }

  private runDatekitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'format': {
        const now = new Date()
        const formatted = datekit.format(now, 'YYYY-MM-DD HH:mm:ss')
        result.innerHTML = `当前时间: ${formatted}`
        logger.log(`格式化日期: ${formatted}`, 'success')
        break
      }

      case 'parse': {
        const dateStr = '2024-12-08 15:30:00'
        const parsed = datekit.parse(dateStr, 'YYYY-MM-DD HH:mm:ss')
        if (parsed) {
          result.innerHTML = `解析日期: ${dateStr} → ${parsed.toLocaleString()}`
          logger.log(`解析日期字符串: ${dateStr}`, 'success')
        } else {
          result.innerHTML = `解析日期失败: ${dateStr}`
          logger.log(`解析日期失败: ${dateStr}`, 'error')
        }
        break
      }

      case 'addDays': {
        const baseDate = new Date()
        const futureDate = datekit.add(baseDate, 30, 'days')
        result.innerHTML = `30天后: ${datekit.format(futureDate, 'YYYY-MM-DD')}`
        logger.log(`添加30天后的日期`, 'success')
        break
      }
    }
  }

  private runValidationkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!
    const input = parent.querySelector('input') as HTMLInputElement

    const value = input?.value || ''

    switch (demo) {
      case 'email': {
        const validationResult = validationkit.email(value)
        const { isValid } = validationResult
        result.innerHTML = `"${value}" ${isValid ? '是' : '不是'} 有效邮箱`
        result.className = `result ${isValid ? 'success' : 'error'}`
        logger.log(`邮箱验证: "${value}" → ${isValid}`, isValid ? 'success' : 'error')
        break
      }

      case 'phone': {
        const validationResult = validationkit.phone(value)
        const isValidPhone = validationResult.isValid
        result.innerHTML = `"${value}" ${isValidPhone ? '是' : '不是'} 有效手机号`
        result.className = `result ${isValidPhone ? 'success' : 'error'}`
        logger.log(`手机号验证: "${value}" → ${isValidPhone}`, isValidPhone ? 'success' : 'error')
        break
      }

      case 'required': {
        const validationResult = validationkit.required(value)
        const isRequired = validationResult.isValid
        result.innerHTML = `"${value}" ${isRequired ? '非空' : '为空'}`
        result.className = `result ${isRequired ? 'success' : 'error'}`
        logger.log(`必填验证: "${value}" → ${isRequired}`, isRequired ? 'success' : 'error')
        break
      }
    }
  }

  private runDomkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'addClass': {
        const testEl = document.createElement('div')
        testEl.textContent = '测试元素'
        domkit.addClass(testEl, 'test-class')
        domkit.addClass(testEl, 'another-class')
        result.innerHTML = `添加类名后: ${testEl.className}`
        logger.log(`添加CSS类: ${testEl.className}`, 'success')
        break
      }

      case 'getScrollPosition': {
        const scrollPos = domkit.getScrollPosition(window)
        result.innerHTML = `当前滚动位置: left=${scrollPos.left}, top=${scrollPos.top}`
        logger.log(`获取滚动位置: (${scrollPos.left}, ${scrollPos.top})`, 'success')
        break
      }

      case 'isScrollEnd': {
        const isAtEnd = domkit.isScrollEnd(document.documentElement)
        result.innerHTML = `是否滚动到底部: ${isAtEnd}`
        logger.log(`滚动到底部检测: ${isAtEnd}`, 'success')
        break
      }
    }
  }

  private runAdminkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'copyText': {
        const textToCopy = '这是要复制的文本'
        adminkit
          .copyText(textToCopy)
          .then(() => {
            result.innerHTML = `已复制到剪贴板: "${textToCopy}"`
            logger.log('文本已复制到剪贴板', 'success')
          })
          .catch((err: any) => {
            result.innerHTML = `复制失败: ${err.message}`
            logger.log(`复制失败: ${err.message}`, 'error')
          })
        break
      }

      case 'downloadText': {
        const content = '这是下载的文本内容'
        // 使用原生的下载方法
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'test.txt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        result.innerHTML = '已触发文件下载'
        logger.log('文件下载已开始', 'success')
        break
      }
    }
  }

  private runPathkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'join': {
        const parts = ['usr', 'local', 'bin', 'node']
        const joined = pathkit.join(...parts)
        result.innerHTML = `路径拼接: [${parts.join(', ')}] → "${joined}"`
        logger.log(`路径拼接: ${joined}`, 'success')
        break
      }

      case 'dirname': {
        const fullPath = '/usr/local/bin/node'
        const dir = pathkit.dirname(fullPath)
        result.innerHTML = `获取目录: "${fullPath}" → "${dir}"`
        logger.log(`获取目录名: ${dir}`, 'success')
        break
      }

      case 'extname': {
        const filename = 'document.pdf'
        const ext = pathkit.extname(filename)
        result.innerHTML = `获取扩展名: "${filename}" → "${ext}"`
        logger.log(`获取扩展名: ${ext}`, 'success')
        break
      }

      case 'basename': {
        const path = '/home/user/documents/file.txt'
        const base = pathkit.basename(path)
        result.innerHTML = `获取文件名: "${path}" → "${base}"`
        logger.log(`获取文件名: ${base}`, 'success')
        break
      }
    }
  }
}

export function setupToolkitPlayground() {
  new DemoManager()
}
