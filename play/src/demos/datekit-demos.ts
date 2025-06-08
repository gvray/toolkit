export function createDatekitDemos(): string {
  return `
    <div class="demo-card">
      <h3>📅 日期格式化 (format)</h3>
      <p>将日期格式化为指定格式</p>
      <button class="btn btn-primary" data-demo="format">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📏 日期差计算 (diffInDays)</h3>
      <p>计算两个日期之间的天数差</p>
      <button class="btn btn-primary" data-demo="diffInDays">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>➕ 日期加法 (addDays)</h3>
      <p>给日期添加指定的天数</p>
      <button class="btn btn-primary" data-demo="addDays">运行演示</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
