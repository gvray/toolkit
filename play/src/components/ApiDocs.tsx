import React, { useState, useEffect } from 'react'
import { KitApi, loadKitApiData, ApiFunction } from '../utils/apiParser'

const ApiDocs: React.FC = () => {
  const [selectedKit, setSelectedKit] = useState<string>('eskit')
  const [apiData, setApiData] = useState<KitApi[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFunctions, setFilteredFunctions] = useState<ApiFunction[]>([])

  const kits = [
    { id: 'eskit', name: 'ESKit', description: 'TypeScript和JavaScript开发工具包' },
    { id: 'datekit', name: 'DateKit', description: '日期和时间操作工具包' },
    { id: 'domkit', name: 'DOMKit', description: 'DOM操作和浏览器工具包' },
    { id: 'mathkit', name: 'MathKit', description: '数学计算工具包' },
    { id: 'pathkit', name: 'PathKit', description: '路径处理工具包' },
    { id: 'validationkit', name: 'ValidationKit', description: '数据验证工具包' },
    { id: 'adminkit', name: 'AdminKit', description: '管理后台工具包' }
  ]

  useEffect(() => {
    // 加载所有kit的API数据
    const loadApiData = async () => {
      setLoading(true)
      try {
        const allKitData: KitApi[] = []

        for (const kit of kits) {
          const kitData = await loadKitApiData(kit.id)
          allKitData.push(kitData)
        }

        setApiData(allKitData)
      } catch (error) {
        console.error('加载API数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadApiData()
  }, [])

  const currentKit = apiData.find((kit) => kit.name.toLowerCase() === selectedKit)

  // 过滤函数
  useEffect(() => {
    if (currentKit) {
      const filtered = currentKit.functions.filter(
        (func) =>
          func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          func.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredFunctions(filtered)
    }
  }, [currentKit, searchTerm])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
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

      {/* API文档内容 */}
      {currentKit && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{currentKit.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{currentKit.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentKit.functions.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">个函数</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">API 函数</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索函数..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {searchTerm && (
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                找到 {filteredFunctions.length} 个匹配的函数
              </div>
            )}

            <div className="space-y-8">
              {filteredFunctions.map((func, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-mono font-semibold text-blue-600 dark:text-blue-400">{func.name}</h4>
                    {func.since && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        v{func.since}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">{func.description}</p>

                  {func.parameters && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">参数：</h5>
                      <pre className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded border text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {func.parameters}
                      </pre>
                    </div>
                  )}

                  {func.returns && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">返回值：</h5>
                      <pre className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded border text-gray-700 dark:text-gray-300">
                        {func.returns}
                      </pre>
                    </div>
                  )}

                  {func.example && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100">示例：</h5>
                        <button
                          onClick={() => {
                            navigator.clipboard
                              .writeText(func.example || '')
                              .then(() => {
                                // 可以添加一个临时的成功提示
                                const button = event?.target as HTMLButtonElement
                                const originalText = button.textContent
                                button.textContent = '已复制!'
                                button.classList.add('text-green-600')
                                setTimeout(() => {
                                  button.textContent = originalText
                                  button.classList.remove('text-green-600')
                                }, 2000)
                              })
                              .catch((err) => console.error('复制失败:', err))
                          }}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          复制代码
                        </button>
                      </div>
                      <pre className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded border text-gray-700 dark:text-gray-300 overflow-x-auto">
                        <code>{func.example}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApiDocs
