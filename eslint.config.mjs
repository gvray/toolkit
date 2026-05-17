import { defineConfig } from 'eslint/config'
import tsConfig from 'eslint-config-lavy/ts'

export default defineConfig([
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
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

  // Test files - relaxed rules
  {
    files: ['**/*.test.{js,ts,tsx}', '**/*.spec.{js,ts,tsx}', '**/tests/**', '**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off'
    }
  }
])