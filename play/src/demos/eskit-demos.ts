export function createEskitDemos(): string {
  return `
    <div class="demo-card">
      <h3>🔧 数组分块 (chunk)</h3>
      <p>将数组分割成指定大小的块</p>
      <button class="btn btn-primary" data-demo="chunk">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>⏱️ 防抖函数 (debounce)</h3>
      <p>创建一个防抖函数，延迟执行</p>
      <button class="btn btn-primary" data-demo="debounce">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>🚀 节流函数 (throttle)</h3>
      <p>创建一个节流函数，限制执行频率</p>
      <button class="btn btn-primary" data-demo="throttle">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📋 深度克隆 (deepClone)</h3>
      <p>深度复制对象，避免引用问题</p>
      <button class="btn btn-primary" data-demo="deepClone">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>🔄 数组去重 (unique)</h3>
      <p>移除数组中的重复元素</p>
      <button class="btn btn-primary" data-demo="unique">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
