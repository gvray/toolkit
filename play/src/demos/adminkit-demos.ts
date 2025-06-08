export function createAdminkitDemos(): string {
  return `
    <div class="demo-card">
      <h3>📋 复制功能 (copy)</h3>
      <p>使用 AdminKit 复制文本到剪贴板</p>
      <button class="btn btn-primary" data-demo="copy">复制文本</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>💾 文件下载 (download)</h3>
      <p>下载文本文件到本地</p>
      <button class="btn btn-primary" data-demo="download">下载文件</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
