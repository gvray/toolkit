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
  private currentKit = 'eskit'
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

    this.currentKit = kit
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
      case 'chunk':
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const chunked = eskit.chunk(arr, 3)
        result.innerHTML = `结果: ${JSON.stringify(chunked)}`
        logger.log(`chunk([${arr}], 3) = ${JSON.stringify(chunked)}`, 'success')
        break

      case 'debounce':
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

      case 'deepClone':
        const obj = { a: 1, b: { c: 2, d: [3, 4] } }
        const cloned = eskit.deepClone(obj)
        cloned.b.c = 999
        result.innerHTML = `原对象: ${JSON.stringify(obj)}<br>克隆对象: ${JSON.stringify(cloned)}`
        logger.log(`深克隆测试完成，原对象未被修改`, 'success')
        break

      case 'unique':
        const dupArr = [1, 2, 2, 3, 3, 4, 5, 5]
        const uniqueArr = eskit.unique(dupArr)
        result.innerHTML = `原数组: [${dupArr}]<br>去重后: [${uniqueArr}]`
        logger.log(`数组去重: [${dupArr}] → [${uniqueArr}]`, 'success')
        break
    }
  }

  private runMathkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'clamp':
        const value = 15
        const clamped = mathkit.clamp(value, 5, 10)
        result.innerHTML = `clamp(${value}, 5, 10) = ${clamped}`
        logger.log(`数值限制: ${value} 被限制在 [5, 10] 范围内，结果: ${clamped}`, 'success')
        break

      case 'random':
        const randomNum = mathkit.random(1, 100)
        result.innerHTML = `随机数 (1-100): ${randomNum}`
        logger.log(`生成随机数: ${randomNum}`, 'success')
        break

      case 'average':
        const numbers = [10, 20, 30, 40, 50]
        const avg = mathkit.average(numbers)
        result.innerHTML = `数组 [${numbers}] 的平均值: ${avg}`
        logger.log(`计算平均值: [${numbers}] → ${avg}`, 'success')
        break

      case 'factorial':
        const n = 5
        const fact = mathkit.factorial(n)
        result.innerHTML = `${n}! = ${fact}`
        logger.log(`计算阶乘: ${n}! = ${fact}`, 'success')
        break
    }
  }

  private runDatekitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'format':
        const now = new Date()
        const formatted = datekit.format(now, 'YYYY-MM-DD HH:mm:ss')
        result.innerHTML = `当前时间: ${formatted}`
        logger.log(`格式化日期: ${formatted}`, 'success')
        break

      case 'diffInDays':
        const date1 = new Date('2024-01-01')
        const date2 = new Date('2024-01-15')
        const diff = datekit.diffInDays(date2, date1)
        result.innerHTML = `日期差: ${diff} 天`
        logger.log(`计算日期差: ${diff} 天`, 'success')
        break

      case 'addDays':
        const baseDate = new Date()
        const futureDate = datekit.addDays(baseDate, 30)
        result.innerHTML = `30天后: ${datekit.format(futureDate, 'YYYY-MM-DD')}`
        logger.log(`添加30天后的日期`, 'success')
        break
    }
  }

  private runValidationkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!
    const input = parent.querySelector('input') as HTMLInputElement

    const value = input?.value || ''

    switch (demo) {
      case 'isEmail':
        const isValid = validationkit.isEmail(value)
        result.innerHTML = `"${value}" ${isValid ? '是' : '不是'} 有效邮箱`
        result.className = `result ${isValid ? 'success' : 'error'}`
        logger.log(`邮箱验证: "${value}" → ${isValid}`, isValid ? 'success' : 'error')
        break

      case 'isPhone':
        const isValidPhone = validationkit.isPhone(value)
        result.innerHTML = `"${value}" ${isValidPhone ? '是' : '不是'} 有效手机号`
        result.className = `result ${isValidPhone ? 'success' : 'error'}`
        logger.log(`手机号验证: "${value}" → ${isValidPhone}`, isValidPhone ? 'success' : 'error')
        break

      case 'isIdCard':
        const isValidId = validationkit.isIdCard(value)
        result.innerHTML = `"${value}" ${isValidId ? '是' : '不是'} 有效身份证号`
        result.className = `result ${isValidId ? 'success' : 'error'}`
        logger.log(`身份证验证: "${value}" → ${isValidId}`, isValidId ? 'success' : 'error')
        break
    }
  }

  private runDomkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'addClass':
        const testEl = document.createElement('div')
        testEl.textContent = '测试元素'
        domkit.addClass(testEl, 'test-class', 'another-class')
        result.innerHTML = `添加类名后: ${testEl.className}`
        logger.log(`添加CSS类: ${testEl.className}`, 'success')
        break

      case 'getScrollPosition':
        const scrollPos = domkit.getScrollPosition()
        result.innerHTML = `当前滚动位置: x=${scrollPos.x}, y=${scrollPos.y}`
        logger.log(`获取滚动位置: (${scrollPos.x}, ${scrollPos.y})`, 'success')
        break

      case 'copyToClipboard':
        const textToCopy = '这是要复制的文本'
        domkit
          .copyToClipboard(textToCopy)
          .then(() => {
            result.innerHTML = `已复制到剪贴板: "${textToCopy}"`
            logger.log('文本已复制到剪贴板', 'success')
          })
          .catch((err) => {
            result.innerHTML = `复制失败: ${err.message}`
            logger.log(`复制失败: ${err.message}`, 'error')
          })
        break
    }
  }

  private runAdminkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!

    switch (demo) {
      case 'copy':
        const text = '这是通过 adminkit 复制的文本'
        adminkit
          .copy(text)
          .then(() => {
            result.innerHTML = `已复制: "${text}"`
            logger.log('使用 adminkit 复制文本成功', 'success')
          })
          .catch((err) => {
            result.innerHTML = `复制失败: ${err.message}`
            logger.log(`adminkit 复制失败: ${err.message}`, 'error')
          })
        break

      case 'download':
        const content = 'Hello, World!\n这是下载的文件内容'
        adminkit.download(content, 'test.txt', 'text/plain')
        result.innerHTML = '文件下载已触发'
        logger.log('文件下载已触发', 'success')
        break
    }
  }

  private runPathkitDemo(demo: string, button: HTMLButtonElement) {
    const parent = button.closest('.demo-card')!
    const result = parent.querySelector('.result')!
    const input = parent.querySelector('input') as HTMLInputElement

    const path = input?.value || '/path/to/file.txt'

    switch (demo) {
      case 'basename':
        const base = pathkit.basename(path)
        result.innerHTML = `basename("${path}") = "${base}"`
        logger.log(`路径基名: "${path}" → "${base}"`, 'success')
        break

      case 'dirname':
        const dir = pathkit.dirname(path)
        result.innerHTML = `dirname("${path}") = "${dir}"`
        logger.log(`路径目录: "${path}" → "${dir}"`, 'success')
        break

      case 'extname':
        const ext = pathkit.extname(path)
        result.innerHTML = `extname("${path}") = "${ext}"`
        logger.log(`文件扩展名: "${path}" → "${ext}"`, 'success')
        break

      case 'join':
        const parts = ['path', 'to', 'file.txt']
        const joined = pathkit.join(...parts)
        result.innerHTML = `join(${parts.map((p) => `"${p}"`).join(', ')}) = "${joined}"`
        logger.log(`路径拼接: [${parts.join(', ')}] → "${joined}"`, 'success')
        break
    }
  }
}

// 导出设置函数
export function setupToolkitPlayground() {
  new DemoManager()
  logger.log('🚀 Toolkit Playground 已启动!')
}
