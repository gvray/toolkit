export function createEskitDemos(): string {
  return `
    <div class="demo-card">
      <h3>🔍 数组包含 (contains)</h3>
      <p>检查数组是否包含指定元素</p>
      <button class="btn btn-primary" data-demo="contains">运行演示</button>
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
      <h3>📐 数组展平 (flatten)</h3>
      <p>将嵌套数组展平为一维数组</p>
      <button class="btn btn-primary" data-demo="flatten">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>🛡️ 安全执行 (tryRun)</h3>
      <p>安全执行函数，捕获错误并返回 null</p>
      <button class="btn btn-primary" data-demo="tryRun">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>⚡ 安全同步执行 (tryRunSync)</h3>
      <p>安全地执行同步函数，捕获错误并返回 null</p>
      <button class="btn btn-primary" data-demo="tryRunSync">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
