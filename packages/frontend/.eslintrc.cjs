module.exports = {
  root: true,
  env: {
    browser: true,
    es2020:  true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // Allow default exports for page components and lazy-loaded modules
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Relax unused-vars to warn so CI doesn't fail on legitimate placeholders;
    // the TS compiler's noUnusedLocals already catches real issues.
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Allow explicit `any` with a warning rather than error while codebase matures
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
