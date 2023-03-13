module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'vue'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
}
