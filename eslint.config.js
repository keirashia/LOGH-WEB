import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      // Vue — 다중 속성 포맷은 프리터에 위임, 린트에서 제외
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attributes-order': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',

      // JS
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'prefer-const': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**'],
  },
]
