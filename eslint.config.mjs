import { defineConfig } from 'eslint/config'
import tsConfig from 'eslint-config-lavy/ts'

export default defineConfig([
  // Global ignores
  {
    ignores: [
      'play/**',
      '**/__tests__/**',
      '**/*.test.{ts,tsx,js}',
      '**/*.spec.{ts,tsx,js}',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/esm/**',
      '**/lib/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/*.min.js',
      '**/public/**',
      '**/vendor/**'
    ]
  },

  // Base configs
  ...tsConfig,

  // Project-specific overrides
  {
    files: ['**/*.ts'],
    rules: {
      // Add project-specific rules here
    }
  },

])