# Toolkit Playground

一个基于 React 19 + Tailwind CSS + Vite 6 构建的工具包演示平台，用于展示和测试各种工具包的功能。

## 功能特性

- 🎯 **7 个工具包演示**: ESKit、MathKit、DateKit、ValidationKit、DOMKit、AdminKit、PathKit
- 🎨 **现代化 UI**: 使用 Tailwind CSS 构建的响应式界面
- ⚡ **实时交互**: 支持参数输入、函数执行、结果展示
- 📋 **控制台输出**: 实时显示执行日志和错误信息
- 🔧 **参数配置**: 支持多种数据类型的参数输入
- 📱 **响应式设计**: 适配各种屏幕尺寸

## 技术栈

- **React 19**: 最新的 React 版本
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Vite 6**: 快速的构建工具
- **TypeScript**: 类型安全的 JavaScript
- **@headlessui/react**: 无样式的 UI 组件库

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
play/
├── src/
│   ├── components/
│   │   ├── FunctionDemo.tsx      # 通用函数演示组件
│   │   ├── ESKitDemo.tsx         # ESKit演示
│   │   ├── MathKitDemo.tsx       # MathKit演示
│   │   ├── DateKitDemo.tsx       # DateKit演示
│   │   ├── ValidationKitDemo.tsx # ValidationKit演示
│   │   ├── DOMKitDemo.tsx        # DOMKit演示
│   │   ├── AdminKitDemo.tsx      # AdminKit演示
│   │   └── PathKitDemo.tsx       # PathKit演示
│   ├── App.tsx                   # 主应用组件
│   ├── main.tsx                  # 应用入口
│   └── index.css                 # 全局样式
├── index.html                    # HTML模板
├── package.json                  # 项目配置
├── vite.config.ts               # Vite配置
├── tailwind.config.js           # Tailwind配置
└── postcss.config.js            # PostCSS配置
```

## 使用说明

1. **选择工具包**: 点击顶部的 tab 切换不同的工具包
2. **选择函数**: 在下拉菜单中选择要测试的函数
3. **输入参数**: 根据函数要求输入相应的参数
4. **执行函数**: 点击"执行函数"按钮
5. **查看结果**: 在结果展示区域查看执行结果
6. **查看日志**: 在控制台区域查看详细的执行日志

## 支持的工具包

### ESKit

JavaScript/TypeScript 工具集，包含类型检查、对象操作、数组工具、函数工具等。

### MathKit

数学工具集，包含算术运算、比较运算、随机数生成、序列生成等。

### DateKit

日期时间工具集，包含日期格式化、解析、操作、比较、验证等。

### ValidationKit

数据验证工具集，包含各种格式验证、类型验证、范围验证等。

### DOMKit

DOM 操作工具集，包含元素操作、样式操作、事件处理、位置计算等。

### AdminKit

管理后台工具集，包含复制、存储、格式化、加载状态、事件总线等。

### PathKit

路径处理工具集，包含路径解析、操作、检查、格式化、URL 处理等。

## 开发指南

### 添加新的函数演示

1. 在对应的 Demo 组件中添加新的函数配置
2. 配置函数名称、描述、执行逻辑和参数模式
3. 函数会自动出现在下拉选择列表中

### 自定义样式

- 修改 `src/index.css` 中的 Tailwind 组件类
- 更新 `tailwind.config.js` 配置主题
- 在组件中使用 Tailwind 类名

### 扩展功能

- 添加新的工具包演示组件
- 在 `App.tsx` 中注册新的 tab
- 更新 `FunctionDemo.tsx` 以支持新的交互模式
