import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { kitManifestPlugin } from './plugins/plugin-kit-manifest';

export default defineConfig({
  plugins: [react(), kitManifestPlugin(path.resolve(__dirname, '../packages'))],
  server: {
    port: 7000,
    open: true,
  },
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
