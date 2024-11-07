// @ts-check

import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const legacyConfigs = compat.config({
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parserOptions: { project: ['tsconfig.json', 'tsconfig.node.json'] },
  overrides: [
    {
      files: ['**/*.{js,cjs,mjs}'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
});

const extendedConfigs = [eslint.configs.recommended, ...legacyConfigs, eslintConfigPrettier];

export default tsEslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { ignores: ['dist'] },
  {
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },

  ...extendedConfigs,

  {
    name: 'customize some rules',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'no-console': ['error', { allow: ['debug', 'warn', 'error'] }],
      'no-underscore-dangle': 'off',
      'no-void': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['case', 'default', 'block', 'block-like', 'multiline-block-like', 'interface', 'type'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let'],
          next: ['const', 'let'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['switch', 'while', 'try', 'return', 'if', 'interface', 'type', 'function', 'export'],
        },
      ],
    },
  },

  {
    name: 'adjust some rules for config files',
    files: ['*.config.*', 'utils/**/*'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-console': 'off',
    },
  }
);
