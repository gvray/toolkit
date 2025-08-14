import React, { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import { Listbox } from '@headlessui/react'

interface FunctionDemoProps {
  title: string
  functions: Array<{
    name: string
    description: string
    execute: (params: any) => any
    paramSchema?: Array<{
      name: string
      type: string
      description: string
      defaultValue?: any
    }>
  }>
  totalFunctions?: number
}

const FunctionDemo: React.FC<FunctionDemoProps> = ({ title, functions, totalFunctions }) => {
  const [selectedFunction, setSelectedFunction] = useState(functions[0])
  const [params, setParams] = useState<Record<string, any>>({})
  const [result, setResult] = useState<any>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])

  // 当选择的函数改变时，自动更新参数为默认值
  useEffect(() => {
    const defaultParams = getDefaultParams()
    setParams(defaultParams)
    addConsoleLog(`切换到函数: ${selectedFunction.name}`)
  }, [selectedFunction])

  const addConsoleLog = (message: string) => {
    setConsoleLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const executeFunction = () => {
    try {
      addConsoleLog(`执行函数: ${selectedFunction.name}`)
      addConsoleLog(`参数: ${JSON.stringify(params, null, 2)}`)

      const result = selectedFunction.execute(params)
      setResult(result)

      addConsoleLog(`结果: ${JSON.stringify(result, null, 2)}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      setResult({ error: errorMessage })
      addConsoleLog(`错误: ${errorMessage}`)
    }
  }

  const clearConsole = () => {
    setConsoleLogs([])
  }

  const resetParams = () => {
    const defaultParams = getDefaultParams()
    setParams(defaultParams)
    addConsoleLog('参数已重置为默认值')
  }

  const getDefaultParams = () => {
    if (!selectedFunction.paramSchema) return {}

    const defaultParams: Record<string, any> = {}
    selectedFunction.paramSchema.forEach((param) => {
      if (param.defaultValue !== undefined) {
        // 直接使用默认值，不需要类型转换
        defaultParams[param.name] = param.defaultValue
      }
    })
    return defaultParams
  }

  const getParamsJson = () => {
    // 如果当前参数为空，使用默认参数
    const currentParams = Object.keys(params).length > 0 ? params : getDefaultParams()
    return JSON.stringify(currentParams, null, 2)
  }

  const handleParamsChange = (jsonString: string) => {
    try {
      const parsedParams = JSON.parse(jsonString)
      setParams(parsedParams)
    } catch (error) {
      // 如果JSON解析失败，保持当前参数不变
      console.log('JSON解析失败，保持当前参数')
    }
  }

  const formatDefaultValue = (value: any): string => {
    if (typeof value === 'string') {
      return `"${value}"`
    }
    if (Array.isArray(value)) {
      return `[${value.map(formatDefaultValue).join(', ')}]`
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value)
    }
    return String(value)
  }

  const getParamDescription = () => {
    if (!selectedFunction.paramSchema || selectedFunction.paramSchema.length === 0) {
      return '此函数无需参数'
    }

    return selectedFunction.paramSchema
      .map((param) => {
        const defaultValue =
          param.defaultValue !== undefined ? ` (默认值: ${formatDefaultValue(param.defaultValue)})` : ''
        return `"${param.name}": ${param.type} - ${param.description}${defaultValue}`
      })
      .join('\n')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 左侧：函数选择和参数输入 */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {totalFunctions && (
              <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                展示 {functions.length} / {totalFunctions} 个方法
              </div>
            )}
          </div>

          {/* 函数选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择函数</label>
            <Listbox value={selectedFunction} onChange={setSelectedFunction}>
              <div className="relative">
                <Listbox.Button className="select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 appearance-none pr-10 cursor-pointer hover:border-blue-400 dark:hover:border-blue-300 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 w-full text-left">
                  <span className="block truncate">
                    {selectedFunction.name} - {selectedFunction.description}
                  </span>
                  {/* 自定义下拉箭头 */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {functions.map((func) => (
                    <Listbox.Option
                      key={func.name}
                      value={func}
                      className={({ active, selected }) =>
                        `cursor-pointer select-none relative py-2 px-3 ${
                          active
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                            : 'text-gray-900 dark:text-gray-100'
                        } ${selected ? 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100' : ''}`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {func.name} - {func.description}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            {/* 函数统计信息 */}
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">共 {functions.length} 个函数可供选择</div>
          </div>

          {/* 参数说明 */}
          {selectedFunction.paramSchema && selectedFunction.paramSchema.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">参数说明：</h4>
              <pre className="text-xs text-blue-700 dark:text-blue-400 whitespace-pre-wrap">
                {getParamDescription()}
              </pre>
            </div>
          )}

          {/* 参数输入 */}
          {selectedFunction.paramSchema && selectedFunction.paramSchema.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">参数 (JSON格式)</label>
                <button
                  onClick={resetParams}
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  重置参数
                </button>
              </div>
              <CodeEditor
                value={getParamsJson()}
                onChange={handleParamsChange}
                language="json"
                placeholder="输入参数JSON..."
                height="200px"
              />
            </div>
          )}

          {/* 执行按钮 */}
          <button className="btn btn-primary" onClick={executeFunction}>
            执行函数
          </button>
        </div>

        {/* 结果展示 */}
        {result !== null && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-3">执行结果</h3>
            <CodeEditor value={JSON.stringify(result, null, 2)} onChange={() => {}} language="json" height="200px" />
          </div>
        )}
      </div>

      {/* 右侧：控制台 */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-full transition-colors duration-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">控制台输出</h3>
            <button className="btn btn-secondary text-sm" onClick={clearConsole}>
              清空控制台
            </button>
          </div>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-auto font-mono text-sm">
            {consoleLogs.length === 0 ? (
              <span className="text-gray-500">暂无输出...</span>
            ) : (
              consoleLogs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FunctionDemo
