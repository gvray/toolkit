import React, { useState, useEffect } from 'react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  height?: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'json',
  placeholder = '输入参数...',
  height = '120px'
}) => {
  const [editorValue, setEditorValue] = useState(value)

  useEffect(() => {
    setEditorValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setEditorValue(newValue)
    onChange(newValue)
  }

  const formatCode = () => {
    try {
      if (language === 'json') {
        const parsed = JSON.parse(editorValue)
        const formatted = JSON.stringify(parsed, null, 2)
        setEditorValue(formatted)
        onChange(formatted)
      }
    } catch (error) {
      // 如果格式化失败，保持原值
    }
  }

  const getLanguageClass = () => {
    switch (language) {
      case 'json':
        return 'language-json'
      case 'javascript':
        return 'language-javascript'
      case 'typescript':
        return 'language-typescript'
      default:
        return 'language-plaintext'
    }
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{language}</span>
        {language === 'json' && (
          <button
            onClick={formatCode}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
          >
            格式化
          </button>
        )}
      </div>
      <div className="relative">
        <textarea
          value={editorValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-3 font-mono text-sm bg-gray-900 dark:bg-gray-950 text-green-400 dark:text-green-300 border border-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 resize-none transition-colors duration-200 ${getLanguageClass()}`}
          style={{ height, minHeight: height }}
          spellCheck={false}
        />
        <div className="absolute top-0 right-0 p-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
