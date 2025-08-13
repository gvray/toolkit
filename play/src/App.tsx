import React, { useState, useEffect, useRef } from 'react'
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
  const [nextTheme, setNextTheme] = useState<boolean | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
    if (isAnimating) return // 防止动画期间重复点击

    const newTheme = !isDark
    setNextTheme(newTheme)
    setIsAnimating(true)

    // 创建裁剪动画
    if (containerRef.current) {
      const container = containerRef.current
      const rect = container.getBoundingClientRect()

      // 创建动画遮罩
      const mask = document.createElement('div')
      mask.style.position = 'fixed'
      mask.style.top = '0'
      mask.style.left = '0'
      mask.style.width = '100vw'
      mask.style.height = '100vh'
      mask.style.backgroundColor = newTheme ? '#111827' : '#f9fafb' // 深色/浅色背景
      mask.style.zIndex = '9999'
      mask.style.clipPath = 'circle(0% at 50% 50%)'
      mask.style.transition = 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)'

      document.body.appendChild(mask)

      // 触发动画
      requestAnimationFrame(() => {
        mask.style.clipPath = 'circle(150% at 50% 50%)'
      })

      // 动画完成后切换主题
      setTimeout(() => {
        setIsDark(newTheme)
        mask.style.clipPath = 'circle(0% at 50% 50%)'

        setTimeout(() => {
          document.body.removeChild(mask)
          setIsAnimating(false)
          setNextTheme(null)
        }, 600)
      }, 300)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <header
        className={`shadow-sm border-b transition-colors duration-200 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold">🧰 Toolkit Playground</h1>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>各种工具包的交互式演示</p>
            </div>
            <button
              onClick={toggleTheme}
              disabled={isAnimating}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isAnimating
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:scale-110'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:scale-110'
              }`}
              title={isDark ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDark ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className={`flex space-x-8 border-b transition-colors duration-200 ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `tab transition-colors duration-200 ${
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
