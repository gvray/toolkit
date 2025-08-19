import React, { useState, useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

interface KitInfo {
  id: string
  name: string
  description: string
  readmePath: string
}

const kits: KitInfo[] = [
  {
    id: 'eskit',
    name: 'ESKit',
    description: 'TypeScript和JavaScript开发工具包',
    readmePath: '/src/data/readmes/eskit.md'
  },
  {
    id: 'datekit',
    name: 'DateKit',
    description: '日期和时间操作工具包',
    readmePath: '/src/data/readmes/datekit.md'
  },
  {
    id: 'domkit',
    name: 'DOMKit',
    description: 'DOM操作和浏览器工具包',
    readmePath: '/src/data/readmes/domkit.md'
  },
  {
    id: 'mathkit',
    name: 'MathKit',
    description: '数学计算工具包',
    readmePath: '/src/data/readmes/mathkit.md'
  },
  {
    id: 'pathkit',
    name: 'PathKit',
    description: '路径处理工具包',
    readmePath: '/src/data/readmes/pathkit.md'
  },
  {
    id: 'validationkit',
    name: 'ValidationKit',
    description: '数据验证工具包',
    readmePath: '/src/data/readmes/validationkit.md'
  },
  {
    id: 'adminkit',
    name: 'AdminKit',
    description: '管理后台工具包',
    readmePath: '/src/data/readmes/adminkit.md'
  }
]

const MarkdownApiDocs: React.FC = () => {
  const [selectedKit, setSelectedKit] = useState<string>('eskit')
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  // 配置 Markdown-it
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
  }).use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '§',
    level: [1, 2, 3, 4]
  })

  useEffect(() => {
    const loadReadme = async () => {
      setLoading(true)
      setError('')

      try {
        const currentKit = kits.find((kit) => kit.id === selectedKit)
        if (!currentKit) {
          throw new Error('工具包不存在')
        }

        // 使用 fetch 读取文件内容
        const response = await fetch(currentKit.readmePath)
        if (!response.ok) {
          throw new Error(`无法加载文件: ${response.statusText}`)
        }

        const content = await response.text()
        setMarkdownContent(content)
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败')
      } finally {
        setLoading(false)
      }
    }

    loadReadme()
  }, [selectedKit])

  const currentKit = kits.find((kit) => kit.id === selectedKit)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <div className="text-xl font-semibold mb-2">加载失败</div>
          <div className="text-sm">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 工具包选择器 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">选择工具包</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {kits.map((kit) => (
            <button
              key={kit.id}
              onClick={() => setSelectedKit(kit.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedKit === kit.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <h3 className="font-medium">{kit.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{kit.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Markdown 内容 */}
      {currentKit && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{currentKit.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{currentKit.description}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: md.render(markdownContent)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MarkdownApiDocs
