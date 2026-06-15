import { createFormLayout } from '../src/form';

describe('createFormLayout', () => {
  it('default labelSpan=6 gives 6/18 split', () => {
    expect(createFormLayout()).toEqual({ labelCol: { span: 6 }, wrapperCol: { span: 18 } });
  });

  it('custom labelSpan', () => {
    expect(createFormLayout(4)).toEqual({ labelCol: { span: 4 }, wrapperCol: { span: 20 } });
  });

  it('clamps to 0 at minimum', () => {
    expect(createFormLayout(-5)).toEqual({ labelCol: { span: 0 }, wrapperCol: { span: 24 } });
  });

  it('clamps to 24 at maximum', () => {
    expect(createFormLayout(30)).toEqual({ labelCol: { span: 24 }, wrapperCol: { span: 0 } });
  });
});
