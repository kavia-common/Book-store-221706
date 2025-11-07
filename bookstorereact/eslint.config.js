const reactJsConfig = {
  files: ['src/**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      document: 'readonly',
      window: 'readonly',
    },
  },
  plugins: {
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': 'off'
  },
};

const ignoreConfig = {
  ignores: ['node_modules/**', 'dist/**', 'build/**'],
};

export default [ignoreConfig, reactJsConfig];
