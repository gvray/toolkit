import {
  camelCase,
  escape,
  kebabCase,
  pad,
  pascalCase,
  snakeCase,
  template,
  titleCase,
  unescape,
  words
} from '../src'

describe('string utilities', () => {
  it('converts between common naming conventions', () => {
    expect(camelCase('foo-bar')).toBe('fooBar')
    expect(kebabCase('fooBar')).toBe('foo-bar')
    expect(snakeCase('fooBar')).toBe('foo_bar')
    expect(pascalCase('foo-bar')).toBe('FooBar')
    expect(titleCase('hello world')).toBe('Hello World')
  })

  it('escapes and unescapes html entities', () => {
    expect(escape('<script>')).toBe('&lt;script&gt;')
    expect(unescape('&lt;script&gt;')).toBe('<script>')
  })

  it('pads a string on both sides', () => {
    expect(pad('hi', 6)).toBe('  hi  ')
  })

  it('splits a string into words', () => {
    expect(words('fooBar baz')).toEqual(['foo', 'Bar', 'baz'])
  })

  it('renders simple templates', () => {
    expect(template('Hi, {name}', { name: 'Tom' })).toBe('Hi, Tom')
  })
})
