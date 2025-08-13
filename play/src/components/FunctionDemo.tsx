import React, { useState } from 'react'
import CodeEditor from './CodeEditor'

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
}

const FunctionDemo: React.FC<FunctionDemoProps> = ({ title, functions }) => {
  const [selectedFunction, setSelectedFunction] = useState(functions[0])
  const [params, setParams] = useState<Record<string, any>>({})
  const [result, setResult] = useState<any>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])

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
    setParams({})
    addConsoleLog('参数已重置为默认值')
  }

  const getDefaultParams = () => {
    if (!selectedFunction.paramSchema) return {}

    const defaultParams: Record<string, any> = {}
    selectedFunction.paramSchema.forEach((param) => {
      if (param.defaultValue !== undefined) {
        // 根据参数类型处理默认值
        if (param.type === 'string') {
          defaultParams[param.name] = param.defaultValue
        } else if (param.type === 'number') {
          defaultParams[param.name] = Number(param.defaultValue)
        } else if (param.type === 'boolean') {
          defaultParams[param.name] = Boolean(param.defaultValue)
        } else {
          // 对于object和array类型，保持原值
          defaultParams[param.name] = param.defaultValue
        }
      }
    })
    return defaultParams
  }

  const getParamsJson = () => {
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
          <h2 className="text-xl font-semibold mb-4">{title}</h2>

          {/* 函数选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择函数</label>
            <select
              className="select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              value={selectedFunction.name}
              onChange={(e) => {
                const func = functions.find((f) => f.name === e.target.value)
                if (func) {
                  setSelectedFunction(func)
                  setParams({})
                  setResult(null)
                }
              }}
            >
              {functions.map((func) => (
                <option key={func.name} value={func.name}>
                  {func.name} - {func.description}
                </option>
              ))}
            </select>
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
