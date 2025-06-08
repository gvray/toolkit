export function createDomkitDemos(): string {
  return `
    <div class="demo-card">
      <h3>🎨 添加CSS类 (addClass)</h3>
      <p>为DOM元素添加CSS类名</p>
      <button class="btn btn-primary" data-demo="addClass">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📍 获取滚动位置 (getScrollPosition)</h3>
      <p>获取当前页面的滚动位置</p>
      <button class="btn btn-primary" data-demo="getScrollPosition">获取位置</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📋 复制到剪贴板 (copyToClipboard)</h3>
      <p>将文本复制到系统剪贴板</p>
      <button class="btn btn-primary" data-demo="copyToClipboard">复制文本</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
