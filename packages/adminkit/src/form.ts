/**
 * Generate Ant Design / compatible form labelCol / wrapperCol layout config.
 * 生成表单标签列与内容列的 span 配置（兼容 Ant Design 等 24 栅格表单）。
 *
 * @example
 * createFormLayout()    // => { labelCol: { span: 6 }, wrapperCol: { span: 18 } }
 * createFormLayout(4)   // => { labelCol: { span: 4 }, wrapperCol: { span: 20 } } *
 * @since 1.0.0
 */
export const createFormLayout = (labelSpan = 6) => {
  const span = Math.max(0, Math.min(24, labelSpan));
  return {
    labelCol: { span },
    wrapperCol: { span: 24 - span },
  };
};
