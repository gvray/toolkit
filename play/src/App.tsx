import React, { useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { TabGroup, TabList, TabPanels, Tab, TabPanel } from '@headlessui/react'
import ESKitDemo from './components/ESKitDemo'
import MathKitDemo from './components/MathKitDemo'
import DateKitDemo from './components/DateKitDemo'
import ValidationKitDemo from './components/ValidationKitDemo'
import DOMKitDemo from './components/DOMKitDemo'
import AdminKitDemo from './components/AdminKitDemo'
import PathKitDemo from './components/PathKitDemo'

const tabs = [
  { name: 'ESKit', component: ESKitDemo },
  { name: 'MathKit', component: MathKitDemo },
  { name: 'DateKit', component: DateKitDemo },
  { name: 'ValidationKit', component: ValidationKitDemo },
  { name: 'DOMKit', component: DOMKitDemo },
  { name: 'AdminKit', component: AdminKitDemo },
  { name: 'PathKit', component: PathKitDemo }
]

function App() {
  const [isDark, setIsDark] = useState(() => {
    // 从localStorage读取主题偏好，默认为浅色
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // 保存主题偏好到localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    // 更新document的class
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    if (isAnimating || !buttonRef.current) return

    setIsAnimating(true)
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()

    // 计算按钮中心位置
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // 计算需要覆盖整个屏幕的半径
    const maxRadius = Math.max(
      Math.sqrt(centerX * centerX + centerY * centerY),
      Math.sqrt((window.innerWidth - centerX) * (window.innerWidth - centerX) + centerY * centerY),
      Math.sqrt(centerX * centerX + (window.innerHeight - centerY) * (window.innerHeight - centerY)),
      Math.sqrt(
        (window.innerWidth - centerX) * (window.innerWidth - centerX) +
          (window.innerHeight - centerY) * (window.innerHeight - centerY)
      )
    )

    // 创建克隆遮罩容器
    const maskContainer = document.createElement('div')
    maskContainer.style.position = 'fixed'
    maskContainer.style.top = '0'
    maskContainer.style.left = '0'
    maskContainer.style.width = '100vw'
    maskContainer.style.height = '100vh'
    maskContainer.style.zIndex = '9999'
    maskContainer.style.pointerEvents = 'none'
    maskContainer.style.clipPath = `circle(0px at ${centerX}px ${centerY}px)`
    maskContainer.style.transition = 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)'

    // 创建新主题的完整页面克隆
    const newTheme = !isDark
    const clonedPage = document.createElement('div')
    clonedPage.style.position = 'absolute'
    clonedPage.style.top = '0'
    clonedPage.style.left = '0'
    clonedPage.style.width = '100%'
    clonedPage.style.height = '100%'
    clonedPage.style.backgroundColor = newTheme ? '#111827' : '#f9fafb'
    clonedPage.style.color = newTheme ? '#f9fafb' : '#111827'
    clonedPage.style.overflow = 'auto'

    // 克隆页面的HTML结构 - 包含更真实的内容
    clonedPage.innerHTML = `
      <div class="min-h-screen ${newTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}">
        <header class="shadow-sm border-b ${newTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
              <div>
                <h1 class="text-3xl font-bold">🧰 Toolkit Playground</h1>
                <p class="mt-1 text-sm ${newTheme ? 'text-gray-400' : 'text-gray-500'}">各种工具包的交互式演示</p>
              </div>
              <button class="p-2 rounded-lg ${newTheme ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'}">
                ${
                  newTheme
                    ? `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  `
                    : `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                  `
                }
              </button>
            </div>
          </div>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex space-x-8 border-b ${newTheme ? 'border-gray-700' : 'border-gray-200'}">
            ${tabs
              .map(
                (tab) => `
              <button class="px-4 py-2 text-sm font-medium border-b-2 ${
                newTheme ? 'border-transparent text-gray-400' : 'border-transparent text-gray-500'
              }">
                ${tab.name}
              </button>
            `
              )
              .join('')}
          </div>
          <div class="mt-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2 space-y-6">
                <div class="${newTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6">
                  <div class="flex justify-between items-start mb-4">
                    <h2 class="text-xl font-semibold">ESKit 演示</h2>
                    <div class="text-sm ${
                      newTheme ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'
                    } px-3 py-1 rounded-full">
                      展示 8 / 58 个方法
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium ${
                      newTheme ? 'text-gray-300' : 'text-gray-700'
                    } mb-2">选择函数</label>
                    <div class="relative">
                      <button class="w-full px-3 py-2 border ${
                        newTheme
                          ? 'border-gray-600 bg-gray-700 text-gray-100'
                          : 'border-gray-300 bg-white text-gray-900'
                      } rounded-lg text-left">
                        <span class="block truncate">isArray - 检查值是否为数组</span>
                      </button>
                    </div>
                  </div>
                  <div class="mb-4 p-3 ${newTheme ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg">
                    <h4 class="text-sm font-medium ${newTheme ? 'text-blue-300' : 'text-blue-800'} mb-2">参数说明：</h4>
                    <pre class="text-xs ${
                      newTheme ? 'text-blue-400' : 'text-blue-700'
                    } whitespace-pre-wrap">"value": any - 要检查的值</pre>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium ${
                      newTheme ? 'text-gray-300' : 'text-gray-700'
                    } mb-2">参数 (JSON格式)</label>
                    <div class="border ${
                      newTheme ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-gray-50'
                    } rounded-lg p-3 h-32 overflow-auto">
                      <pre class="text-sm ${newTheme ? 'text-gray-300' : 'text-gray-700'}">{}</pre>
                    </div>
                  </div>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">执行函数</button>
                </div>
              </div>
              <div class="lg:col-span-1">
                <div class="${newTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 h-full">
                  <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold">控制台输出</h3>
                    <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm">清空控制台</button>
                  </div>
                  <div class="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-auto font-mono text-sm">
                    <span class="text-gray-500">暂无输出...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `

    maskContainer.appendChild(clonedPage)
    document.body.appendChild(maskContainer)

    // 触发展开动画
    requestAnimationFrame(() => {
      maskContainer.style.clipPath = `circle(${maxRadius}px at ${centerX}px ${centerY}px)`
    })

    // 监听动画完成事件
    const handleTransitionEnd = () => {
      // 使用flushSync确保React状态立即更新
      flushSync(() => {
        setIsDark(newTheme)
      })

      // 立即移除遮罩，此时底层页面已经是新主题了
      document.body.removeChild(maskContainer)
      setIsAnimating(false)

      // 清理事件监听器
      maskContainer.removeEventListener('transitionend', handleTransitionEnd)
    }

    // 添加动画完成事件监听器
    maskContainer.addEventListener('transitionend', handleTransitionEnd)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <header
        className={`shadow-sm border-b transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold transition-colors duration-300">🧰 Toolkit Playground</h1>
              <p
                className={`mt-1 text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                各种工具包的交互式演示
              </p>
            </div>
            <button
              ref={buttonRef}
              onClick={toggleTheme}
              disabled={isAnimating}
              className={`p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
                isAnimating
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700'
              }`}
              title={isDark ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDark ? (
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabGroup>
          <TabList
            className={`flex space-x-8 border-b transition-colors duration-300 ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `tab transition-colors duration-300 ${
                    selected
                      ? isDark
                        ? 'border-blue-400 text-blue-400'
                        : 'border-blue-500 text-blue-600'
                      : isDark
                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-8">
            {tabs.map((tab) => (
              <TabPanel key={tab.name}>
                <tab.component />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </main>
    </div>
  )
}

export default App
