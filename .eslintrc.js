const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['react-app', 'prettier'],
  plugins: [
    'react',
    'prettier',
    '@typescript-eslint',
    'autofix',
    'react-hooks',
  ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'arrow-body-style': ['error', 'always'],
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'autofix/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            destructuredArrayIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
          },
        ],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            pathGroups: [
              {
                pattern: '@/**/**',
                group: 'parent',
                position: 'before',
              },
            ],
            alphabetize: { order: 'asc' },
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@/**/**'],
          },
        ],
      },
    },
  ],
};
