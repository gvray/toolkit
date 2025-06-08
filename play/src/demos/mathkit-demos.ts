export function createMathkitDemos(): string {
  return `
    <div class="demo-card">
      <h3>📏 数值限制 (clamp)</h3>
      <p>将数值限制在指定范围内</p>
      <button class="btn btn-primary" data-demo="clamp">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>🎲 随机数生成 (random)</h3>
      <p>生成指定范围内的随机数</p>
      <button class="btn btn-primary" data-demo="random">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📊 平均值计算 (average)</h3>
      <p>计算数组的平均值</p>
      <button class="btn btn-primary" data-demo="average">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>🔢 阶乘计算 (factorial)</h3>
      <p>计算数字的阶乘</p>
      <button class="btn btn-primary" data-demo="factorial">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
