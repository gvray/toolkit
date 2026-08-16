import { defineConfig } from 'swiftlet';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const deps = Object.keys(pkg.dependencies || {});
const peers = Object.keys(pkg.peerDependencies || {});

export default defineConfig({
  entry: 'src/index.ts',
  outDir: 'dist',
  format: ['esm', 'cjs'],
  preserveModules: true,
  target: 'es2018',
  dts: true,
  sourcemap: false,
  clean: true,
  external: [...deps, ...peers],
});
