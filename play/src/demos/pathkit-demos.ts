export function createPathkitDemos(): string {
  return `
    <div class="demo-card">
      <h3>📂 获取文件名 (basename)</h3>
      <p>从路径中提取文件名</p>
      <div class="input-group">
        <label>输入文件路径:</label>
        <input type="text" placeholder="/path/to/file.txt" value="/path/to/file.txt">
      </div>
      <button class="btn btn-primary" data-demo="basename">获取文件名</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📁 获取目录路径 (dirname)</h3>
      <p>从路径中提取目录部分</p>
      <div class="input-group">
        <label>输入文件路径:</label>
        <input type="text" placeholder="/path/to/file.txt" value="/path/to/file.txt">
      </div>
      <button class="btn btn-primary" data-demo="dirname">获取目录</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📄 获取扩展名 (extname)</h3>
      <p>从路径中提取文件扩展名</p>
      <div class="input-group">
        <label>输入文件路径:</label>
        <input type="text" placeholder="/path/to/file.txt" value="/path/to/file.txt">
      </div>
      <button class="btn btn-primary" data-demo="extname">获取扩展名</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>🔗 路径拼接 (join)</h3>
      <p>拼接多个路径片段</p>
      <button class="btn btn-primary" data-demo="join">拼接路径</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
