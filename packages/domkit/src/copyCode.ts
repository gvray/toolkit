import copyRichText from './copyRichText'

const copyCode = async (code: string, language?: string): Promise<boolean> => {
  const html = `<pre><code${language ? ` class="language-${language}"` : ''}>${code}</code></pre>`
  return copyRichText(html, code)
}

export default copyCode
