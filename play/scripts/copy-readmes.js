#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 定义要复制的 README 文件
const kits = ['eskit', 'datekit', 'domkit', 'mathkit', 'pathkit', 'validationkit', 'adminkit']

// 创建目标目录
const targetDir = path.join(__dirname, '../src/data/readmes')
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

// 复制 README 文件
kits.forEach((kit) => {
  const sourcePath = path.join(__dirname, `../../packages/${kit}/README.md`)
  const targetPath = path.join(targetDir, `${kit}.md`)

  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath)
      console.log(`✅ 已复制 ${kit}/README.md`)
    } else {
      console.log(`❌ 源文件不存在: ${sourcePath}`)
    }
  } catch (error) {
    console.error(`❌ 复制 ${kit} 失败:`, error.message)
  }
})

console.log('\n📁 README 文件已复制到:', targetDir)
console.log('�� 现在可以重新启动开发服务器了')
