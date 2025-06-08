export function createValidationkitDemos(): string {
  return `
    <div class="demo-card">
      <h3>📧 邮箱验证 (isEmail)</h3>
      <p>验证输入的字符串是否为有效邮箱</p>
      <div class="input-group">
        <label>输入邮箱地址:</label>
        <input type="text" placeholder="test@example.com" value="test@example.com">
      </div>
      <button class="btn btn-primary" data-demo="isEmail">验证邮箱</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>📱 手机号验证 (isPhone)</h3>
      <p>验证输入的字符串是否为有效手机号</p>
      <div class="input-group">
        <label>输入手机号:</label>
        <input type="text" placeholder="13800138000" value="13800138000">
      </div>
      <button class="btn btn-primary" data-demo="isPhone">验证手机号</button>
      <div class="result">点击按钮查看结果</div>
    </div>

    <div class="demo-card">
      <h3>🆔 身份证验证 (isIdCard)</h3>
      <p>验证输入的字符串是否为有效身份证号</p>
      <div class="input-group">
        <label>输入身份证号:</label>
        <input type="text" placeholder="请输入身份证号" value="110101199001011234">
      </div>
      <button class="btn btn-primary" data-demo="isIdCard">验证身份证</button>
      <div class="result">点击按钮查看结果</div>
    </div>
  `
}
