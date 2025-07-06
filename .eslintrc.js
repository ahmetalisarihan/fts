module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    // Sadece temel kurallar
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off', // TypeScript handles this
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
