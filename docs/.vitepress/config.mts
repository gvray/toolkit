import { defineConfig } from 'vitepress';
import { readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const API_DIR = resolve(process.cwd(), 'docs/api');

function buildItems(dir: string, urlBase: string): any[] {
  if (!existsSync(dir)) return [];
  const items: any[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    if (entry.isDirectory()) {
      const sub = buildItems(join(dir, entry.name), `${urlBase}/${entry.name}`);
      if (sub.length) items.push({ text: entry.name, collapsed: false, items: sub });
    } else if (
      entry.name.endsWith('.md') &&
      entry.name !== 'index.md' &&
      entry.name !== 'README.md'
    ) {
      const stem = entry.name.replace('.md', '');
      items.push({ text: stem, link: `${urlBase}/${stem}` });
    }
  }
  return items;
}

function buildSidebar(): Record<string, any[]> {
  if (!existsSync(API_DIR)) return {};
  const sidebar: Record<string, any[]> = {};
  for (const entry of readdirSync(API_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pkgDir = join(API_DIR, entry.name);
    const urlBase = `/api/${entry.name}`;
    sidebar[`${urlBase}/`] = [
      {
        text: entry.name,
        items: [{ text: 'Overview', link: `${urlBase}/` }, ...buildItems(pkgDir, urlBase)],
      },
    ];
  }
  return sidebar;
}

function buildNav() {
  if (!existsSync(API_DIR)) return [];
  const items = readdirSync(API_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((e) => ({ text: e.name, link: `/api/${e.name}/` }));
  return [{ text: 'API Reference', items }];
}

export default defineConfig({
  title: 'Gvray Toolkit',
  description: 'Utility packages for TypeScript & JavaScript',
  base: '/',

  head: [['link', { rel: 'icon', href: '/logo.svg' }]],

  themeConfig: {
    logo: '/logo.svg',
    nav: buildNav(),
    sidebar: buildSidebar(),
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/gvray/toolkit' }],
    footer: { message: 'Released under the MIT License.' },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
  },
});
