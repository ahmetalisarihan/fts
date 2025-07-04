module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',

    // React specific rules
    'react/jsx-no-target-blank': 'error',
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'error',
    'react/self-closing-comp': 'error',
    'react/jsx-pascal-case': 'error',

    // General JavaScript rules
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'no-useless-return': 'error',
    'no-magic-numbers': ['warn', { 
      ignore: [0, 1, -1], 
      ignoreArrayIndexes: true,
      ignoreDefaultValues: true 
    }],

    // Code style rules
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'es5'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'never'],

    // Import/export rules
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'never',
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off', // TypeScript handles this

    // Naming conventions
    'camelcase': ['error', { properties: 'never' }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off', // TypeScript handles this
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
      rules: {
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
