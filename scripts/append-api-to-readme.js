const fs = require('fs')
const path = require('path')

const pkgRoot = process.argv[2]
const docsDir = process.argv[3] || 'docs'

if (!pkgRoot) {
  console.error('❌ 请输入子项目路径，如 ./packages/foo')
  process.exit(1)
}

const resolvedRoot = path.resolve(pkgRoot)
const apiDir = path.join(resolvedRoot, docsDir)
const readmePath = path.join(resolvedRoot, 'README.md')

if (!fs.existsSync(apiDir)) {
  console.error(`❌ API 文档目录不存在: ${apiDir}`)
  process.exit(1)
}
if (!fs.existsSync(readmePath)) {
  console.error(`❌ README.md 不存在: ${readmePath}`)
  process.exit(1)
}

// 解析函数文档内容
function parseFunctionDoc(content) {
  const lines = content.split('\n')

  // 提取函数签名
  const signatureMatch = content.match(/> \*\*([^*]+)\*\*[^`]*`([^`]+)`/)
  const functionName = signatureMatch ? signatureMatch[1].trim() : ''
  const signature = signatureMatch ? signatureMatch[2] : ''

  // 提取描述（在Defined in:之后，Type Parameters之前）
  let description = ''
  const definedInIndex = lines.findIndex((line) => line.includes('Defined in:'))
  const typeParamsIndex = lines.findIndex((line) => line.includes('## Type Parameters'))

  if (definedInIndex !== -1) {
    const startIndex = definedInIndex + 1
    const endIndex = typeParamsIndex !== -1 ? typeParamsIndex : lines.length

    for (let i = startIndex; i < endIndex; i++) {
      const line = lines[i].trim()
      if (line && !line.startsWith('##')) {
        description += `${line} `
      } else if (line.startsWith('##')) {
        break
      }
    }
  }
  description = description.trim()

  // 提取参数
  const parameters = []
  const paramsSection = content.match(/## Parameters\s*\n([\s\S]*?)(?=## Returns|$)/)
  if (paramsSection) {
    const paramContent = paramsSection[1]

    // 使用更简单的方法：按行分割并查找参数模式
    const lines = paramContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.startsWith('### ')) {
        const paramName = line.replace('### ', '').trim()
        // 查找下一行的类型
        if (i + 1 < lines.length) {
          const typeLine = lines[i + 1]
          const paramType = typeLine.replace(/`/g, '').trim()
          // 查找下一行的描述
          if (i + 2 < lines.length) {
            const descLine = lines[i + 2]
            if (descLine && !descLine.startsWith('###') && !descLine.startsWith('`')) {
              parameters.push({
                name: paramName,
                type: paramType,
                description: descLine
              })
            }
          }
        }
      }
    }
  }

  // 提取返回值
  let returns = ''
  const returnsSection = content.match(/## Returns\s*\n([\s\S]*?)(?=##|$)/)
  if (returnsSection) {
    const lines = returnsSection[1]
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
    if (lines.length >= 2) {
      const returnType = lines[0].replace(/`/g, '').trim()
      const returnDesc = lines[1].trim()
      returns = `${returnType} - ${returnDesc}`
    }
  }

  // 提取示例
  let example = ''
  const exampleMatch = content.match(/## Example\s*\n\s*```typescript\s*\n([\s\S]*?)\n\s*```/)
  if (exampleMatch) {
    example = exampleMatch[1].trim()
  }

  // 提取版本信息
  let since = ''
  const sinceMatch = content.match(/## Since\s*\n\s*([^\n]+)/)
  if (sinceMatch) {
    since = sinceMatch[1].trim()
  }

  return {
    functionName,
    signature,
    description,
    parameters,
    returns,
    example,
    since
  }
}

// 解析接口文档内容
function parseInterfaceDoc(content) {
  const lines = content.split('\n')

  // 提取接口名
  const interfaceMatch = content.match(/# Interface: ([^(]+)\(\)/)
  const interfaceName = interfaceMatch ? interfaceMatch[1].trim() : ''

  // 提取描述
  let description = ''
  const definedInIndex = lines.findIndex((line) => line.includes('Defined in:'))

  if (definedInIndex !== -1) {
    for (let i = definedInIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line && !line.startsWith('##') && !line.startsWith('#')) {
        description += `${line} `
      } else if (line.startsWith('##') || line.startsWith('#')) {
        break
      }
    }
  }
  description = description.trim()

  return {
    interfaceName,
    description
  }
}

// 解析变量文档内容
function parseVariableDoc(content) {
  const lines = content.split('\n')

  // 提取变量名
  const variableMatch = content.match(/# Variable: ([^(]+)\(\)/)
  const variableName = variableMatch ? variableMatch[1].trim() : ''

  // 提取签名
  const signatureMatch = content.match(/> `const` \*\*[^*]+\*\*: `([^`]+)`/)
  const signature = signatureMatch ? signatureMatch[1] : ''

  // 提取描述
  let description = ''
  const definedInIndex = lines.findIndex((line) => line.includes('Defined in:'))

  if (definedInIndex !== -1) {
    for (let i = definedInIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line && !line.startsWith('##') && !line.startsWith('#')) {
        description += `${line} `
      } else if (line.startsWith('##') || line.startsWith('#')) {
        break
      }
    }
  }
  description = description.trim()

  // 提取参数
  const parameters = []
  const paramsSection = content.match(/## Parameters\s*\n([\s\S]*?)(?=##|$)/)
  if (paramsSection) {
    const paramContent = paramsSection[1]
    const lines = paramContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.startsWith('### ')) {
        const paramName = line.replace('### ', '').trim()
        if (i + 1 < lines.length) {
          const typeLine = lines[i + 1]
          const paramType = typeLine.replace(/`/g, '').trim()
          if (i + 2 < lines.length) {
            const descLine = lines[i + 2]
            if (descLine && !descLine.startsWith('###') && !descLine.startsWith('`')) {
              parameters.push({
                name: paramName,
                type: paramType,
                description: descLine
              })
            }
          }
        }
      }
    }
  }

  // 提取返回值
  let returns = ''
  const returnsSection = content.match(/## Returns\s*\n([\s\S]*?)(?=##|$)/)
  if (returnsSection) {
    const lines = returnsSection[1]
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
    if (lines.length >= 2) {
      const returnType = lines[0].replace(/`/g, '').trim()
      const returnDesc = lines[1].trim()
      returns = `${returnType} - ${returnDesc}`
    }
  }

  // 提取示例
  let example = ''
  const exampleMatch = content.match(/## Example\s*\n\s*```typescript\s*\n([\s\S]*?)\n\s*```/)
  if (exampleMatch) {
    example = exampleMatch[1].trim()
  }

  // 提取版本信息
  let since = ''
  const sinceMatch = content.match(/## Since\s*\n\s*([^\n]+)/)
  if (sinceMatch) {
    since = sinceMatch[1].trim()
  }

  return {
    variableName,
    signature,
    description,
    parameters,
    returns,
    example,
    since
  }
}

// 格式化函数文档
function formatFunctionDoc(doc) {
  let result = `### ${doc.functionName}()\n\n`

  if (doc.description) {
    result += `${doc.description}\n\n`
  }

  if (doc.parameters && doc.parameters.length > 0) {
    result += '**Parameters:**\n'
    doc.parameters.forEach((param) => {
      result += `- \`${param.name}: ${param.type}\` - ${param.description}\n`
    })
    result += '\n'
  }

  if (doc.returns) {
    result += `**Returns:**\n- ${doc.returns}\n\n`
  }

  if (doc.example) {
    result += '**Example:**\n'
    result += '```typescript\n'
    result += doc.example
    result += '\n```\n\n'
  }

  if (doc.since) {
    result += `**Since:** ${doc.since}\n\n`
  }

  return result
}

// 格式化接口文档
function formatInterfaceDoc(doc) {
  let result = `### ${doc.interfaceName}\n\n`

  if (doc.description) {
    result += `${doc.description}\n\n`
  }

  return result
}

// 格式化变量文档
function formatVariableDoc(doc) {
  let result = `### ${doc.variableName}\n\n`

  if (doc.description) {
    result += `${doc.description}\n\n`
  }

  if (doc.signature) {
    result += `**Signature:** \`${doc.signature}\`\n\n`
  }

  if (doc.parameters && doc.parameters.length > 0) {
    result += '**Parameters:**\n'
    doc.parameters.forEach((param) => {
      result += `- \`${param.name}: ${param.type}\` - ${param.description}\n`
    })
    result += '\n'
  }

  if (doc.returns) {
    result += `**Returns:**\n- ${doc.returns}\n\n`
  }

  if (doc.example) {
    result += '**Example:**\n'
    result += '```typescript\n'
    result += doc.example
    result += '\n```\n\n'
  }

  if (doc.since) {
    result += `**Since:** ${doc.since}\n\n`
  }

  return result
}

// 主处理逻辑
const originalReadme = fs.readFileSync(readmePath, 'utf-8')
const cleanReadme = originalReadme.replace(/<!-- AUTO-API-START -->[\s\S]*<!-- AUTO-API-END -->/g, '').trim()

// 处理函数文档
const functionsDir = path.join(apiDir, 'functions')
let functionsContent = ''
if (fs.existsSync(functionsDir)) {
  const functionFiles = fs
    .readdirSync(functionsDir)
    .filter((f) => f.endsWith('.md'))
    .sort()

  if (functionFiles.length > 0) {
    functionsContent += '## Functions\n\n'

    functionFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(functionsDir, file), 'utf-8')
      const doc = parseFunctionDoc(content)
      functionsContent += formatFunctionDoc(doc)
    })
  }
}

// 处理接口文档
const interfacesDir = path.join(apiDir, 'interfaces')
let interfacesContent = ''
if (fs.existsSync(interfacesDir)) {
  const interfaceFiles = fs
    .readdirSync(interfacesDir)
    .filter((f) => f.endsWith('.md'))
    .sort()

  if (interfaceFiles.length > 0) {
    interfacesContent += '## Interfaces\n\n'

    interfaceFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(interfacesDir, file), 'utf-8')
      const doc = parseInterfaceDoc(content)
      interfacesContent += formatInterfaceDoc(doc)
    })
  }
}

// 处理变量文档
const variablesDir = path.join(apiDir, 'variables')
let variablesContent = ''
if (fs.existsSync(variablesDir)) {
  const variableFiles = fs
    .readdirSync(variablesDir)
    .filter((f) => f.endsWith('.md'))
    .sort()

  if (variableFiles.length > 0) {
    variablesContent += '## Variables\n\n'

    variableFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(variablesDir, file), 'utf-8')
      const doc = parseVariableDoc(content)
      variablesContent += formatVariableDoc(doc)
    })
  }
}

// 组合最终内容
const apiContent = [functionsContent, interfacesContent, variablesContent].filter((content) => content).join('\n')

const final = `${cleanReadme}
<!-- AUTO-API-START -->

## API Reference

${apiContent.trim()}

<!-- AUTO-API-END -->`

fs.writeFileSync(readmePath, final, 'utf-8')
console.log(`✅ 已内联 API 文档到 ${readmePath}`)
