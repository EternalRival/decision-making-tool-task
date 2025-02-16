import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { ignores: ['dist', 'utils', '*.config.*'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
  },

  pluginJs.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginUnicorn.configs['flat/recommended'],

  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        { allowList: { acc: true, env: true, i: true, j: true, props: true, Props: true } },
      ],
    },
  }
);
