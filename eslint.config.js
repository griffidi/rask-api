import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import eslint from 'eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const sharedPlugins = {
  ts,
  prettierPlugin,
};

const sharedRules = {
  ...eslint['recommended'],
  ...ts.rules['stylistic-type-checked'],
  ...ts.rules['strict-type-checked'],
  ...prettier.rules,
  // 'array-element-newline': [
  //   'error',
  //   'always',
  // ],
  'arrow-parens': [
    'error',
    'as-needed',
  ],
};

const sharedNodeGlobals = {
  browser: 'readonly',
  node: 'writable',
  es2022: 'writable',
};

const nodeConfig = {
  plugins: {
    ...sharedPlugins,
  },
  rules: {
    ...sharedRules,
  },
};


export default [
  {
    files: [
      './tsconfig.json',
      'tsconfig.*.json',
    ],
  },
  {
    files: [
      'api/src/**/*.ts',
      'api/prisma/**/*.ts',
    ],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: 'api/*',
      },
      globals: {
        ...sharedNodeGlobals,
      },
    },
    ...nodeConfig,
  },
];
