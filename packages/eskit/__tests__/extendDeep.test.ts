import { extendDeep } from '../src'
describe('extendDeep', () => {
  test('extend obj in deep', () => {
    const obj = {
      name: 'obj',
      act: () => {
        return false
      },
      children: {
        name: 'obj sub',
        act: () => {
          return false
        }
      }
    }
    const sub = { impl: 'func' }
    extendDeep(obj, sub)
    expect((sub as any).name).toBe('obj')
  })
})
