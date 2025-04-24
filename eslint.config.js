import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig([
  {
    plugins: {
      js,
    },
    extends: [js.configs.recommended],
  },
  ...tsEslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintPrettierRecommended,
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          generators: false,
          objectLiteralDuplicateProperties: false,
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.es2025,
      },
    },
    rules: {
      // eslint
      'no-console': [
        'error',
        {
          allow: ['info', 'warn', 'error'],
        },
      ],
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
      'no-implicit-coercion': ['error', { boolean: true }],

      // eslint-plugin-import https://github.com/import-js/eslint-plugin-import
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',
      'import/extensions': [
        'off',
        'ignorePackages',
        {
          ts: 'never',
          js: 'never',
        },
      ],

      // typescript-eslint/typescript-eslint https://github.com/typescript-eslint/typescript-eslint
      // Add TypeScript specific rules (and turn off ESLint equivalents)
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/consistent-type-assertions': 'warn',
    },
  },
  {
    files: ['**/*.config.{js,jsx,ts,tsx,mjs,cjs,cts,mts}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-default-export': 'off',
    },
  },
]);
