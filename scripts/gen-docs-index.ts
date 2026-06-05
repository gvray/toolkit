import { readdirSync, readFileSync, writeFileSync, renameSync, rmSync, existsSync } from 'fs'
import { join, resolve } from 'path'

const PACKAGES_DIR = resolve(__dirname, '../packages')
const DOCS_API_DIR = resolve(__dirname, '../docs/api')
const OUT = resolve(__dirname, '../docs/index.md')

// TypeDoc with scoped packages outputs to docs/api/@gvray/<pkg>/
// Move them up to docs/api/<pkg>/ to keep URLs clean
function flattenScope() {
  const scopeDir = join(DOCS_API_DIR, '@gvray')
  if (!existsSync(scopeDir)) return
  for (const entry of readdirSync(scopeDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    renameSync(join(scopeDir, entry.name), join(DOCS_API_DIR, entry.name))
  }
  rmSync(scopeDir, { recursive: true })
  console.log('✓ docs/api/@gvray/ flattened to docs/api/')
}

// VitePress uses index.md as directory index; TypeDoc outputs README.md — rename them all
function renameReadmeToIndex(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      renameReadmeToIndex(fullPath)
    } else if (entry.name === 'README.md') {
      renameSync(fullPath, join(dir, 'index.md'))
    }
  }
}


interface PkgInfo {
  id: string
  description: string
}

function getPackages(): PkgInfo[] {
  return readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const pkgJson = JSON.parse(readFileSync(join(PACKAGES_DIR, e.name, 'package.json'), 'utf-8'))
      const raw: string = pkgJson.description ?? e.name
      // Strip trailing CJK characters (bilingual descriptions)
      const desc = raw.replace(/\s*[\/／]\s*[一-鿿㐀-䶿].*/u, '').replace(/[一-鿿㐀-䶿]+.*$/u, '').trim() || raw
      return { id: e.name, description: desc }
    })
    .sort((a, b) => (a.id === 'eskit' ? -1 : b.id === 'eskit' ? 1 : a.id.localeCompare(b.id)))
}

function render(pkgs: PkgInfo[]): string {
  const features = pkgs
    .map((p) => `  - title: "${p.id}"\n    details: "${p.description}"\n    link: /api/${p.id}/`)
    .join('\n')

  return `---
layout: home

hero:
  name: "gvray/toolkit"
  text: Utility Packages for TypeScript
  tagline: ${pkgs.length} focused packages for everyday JS/TS tasks
  actions:
    - theme: brand
      text: Browse API
      link: /api/eskit/
    - theme: alt
      text: GitHub
      link: https://github.com/gvray/toolkit

features:
${features}
---
`
}

flattenScope()
renameReadmeToIndex(DOCS_API_DIR)
console.log('✓ README.md → index.md in docs/api/')

const pkgs = getPackages()

// Overwrite the TypeDoc-generated docs/api/index.md (its links point to the old @gvray scope paths)
const apiIndexLinks = pkgs.map((p) => `- [${p.id}](/api/${p.id}/)`).join('\n')
writeFileSync(
  join(DOCS_API_DIR, 'index.md'),
  `# API Reference\n\n${apiIndexLinks}\n`,
  'utf-8',
)
console.log('✓ docs/api/index.md links fixed')

writeFileSync(OUT, render(pkgs), 'utf-8')
console.log(`✓ docs/index.md generated (${pkgs.length} packages)`)
