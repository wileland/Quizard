module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'indent': ['error', 2],
    'semi': ['error', 'always']
  }
};
  