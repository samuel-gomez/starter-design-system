import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
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
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  ...tsEslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintPrettierRecommended,
  jsxA11y.flatConfigs.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          generators: false,
          objectLiteralDuplicateProperties: false,
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
        ...globals.vitest,
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

      // eslint-plugin-react https://github.com/jsx-eslint/eslint-plugin-react
      'react/no-multi-comp': [
        'error',
        {
          ignoreStateless: false,
        },
      ],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function'],
          unnamedComponents: ['arrow-function'],
        },
      ],
      'react/require-default-props': 'off',

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
    files: ['src/**/*.{test,spec}.{js,jsx,mjs,cjs,ts,tsx,cts,mts}'],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    plugins: {
      vitest,
      'jest-dom': jestDom,
      'testing-library': testingLibrary,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...jestDom.configs['flat/recommended'].rules,
      ...testingLibrary.configs['flat/react'].rules,

      // @vitest/eslint-plugin https://github.com/vitest-dev/eslint-plugin-vitest
      'vitest/no-conditional-expect': 'error',
      'vitest/no-interpolation-in-snapshots': 'error',
      'vitest/no-mocks-import': 'error',
      'vitest/prefer-called-with': 'error',
      'vitest/prefer-strict-equal': 'error',
      'vitest/prefer-to-be-falsy': 'error',
      'vitest/prefer-to-be-object': 'error',
      'vitest/prefer-to-be-truthy': 'error',
      'vitest/prefer-to-contain': 'error',
      'vitest/prefer-to-have-length': 'error',

      // eslint-plugin-testing-library https://github.com/testing-library/eslint-plugin-testing-library
      'testing-library/prefer-query-matchers': 'error',
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
