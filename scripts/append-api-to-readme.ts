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

const originalReadme = fs.readFileSync(readmePath, 'utf-8')
const cleanReadme = originalReadme.replace(/<!-- AUTO-API-START -->[\s\S]*<!-- AUTO-API-END -->/g, '').trim()

const mdFiles = fs.readdirSync(apiDir).filter((f) => f.endsWith('.md'))
const apiMarkdown = mdFiles
  .sort()
  .map((file) => {
    let content = fs.readFileSync(path.join(apiDir, file), 'utf-8')
    // 把 markdown 里面所有指向 functions/ 开头的链接替换成 docs/functions/
    content = content.replace(/\]\((functions\/[^)]+)\)/g, '](docs/$1)')
    return content
  })
  .join('\n\n---\n\n')

const final = `${cleanReadme}
<!-- AUTO-API-START -->

## API Reference

${apiMarkdown.trim()}

<!-- AUTO-API-END -->`

fs.writeFileSync(readmePath, final, 'utf-8')
console.log(`✅ 已追加 API 文档到 ${readmePath}`)
