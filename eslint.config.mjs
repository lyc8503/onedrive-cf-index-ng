import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'

const config = [
  {
    ignores: ['node_modules/**', '.next/**', '.vercel/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx,mjs,cjs}'],
  },
  {
    files: ['*.js', 'config/**/*.js'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]

export default config
