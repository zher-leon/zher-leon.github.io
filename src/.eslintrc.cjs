const isProd = process.env.NODE_ENV === 'production'
const prodWarn = isProd ? 'warn' : 'off'
// const prodError = isProd ? 'error' : 'off'

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:promise/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    JSX: true
  },
  plugins: ['import'],
  // 规则参考：https://cn.eslint.org/docs/rules/
  rules: {
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'linebreak-style': 'off',
    'vue/no-v-model-argument': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'promise/always-return': 'off',
    'promise/no-promise-in-callback': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/html-self-closing': 'off',
    'consistent-return': 'off',
    'no-continue': 'off',
    'vue/max-len': ['error', {
      code: 120,
      template: 180,
      tabWidth: 2,
      comments: 120,
      ignorePattern: '',
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreUrls: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: false,
      ignoreHTMLAttributeValues: true,
      ignoreHTMLTextContents: false,
    }],
    'import/prefer-default-export': 'off',
    'arrow-parens': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': prodWarn,
    'no-debugger': prodWarn,
    // 禁止空block（如try-catch使用空的错误处理）
    'no-empty': prodWarn,
    'object-curly-newline': 'off',
    // 禁止使用分号
    semi: 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'comma-dangle': 'off',
    // 对以下后缀忽略后缀检查
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'never'
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'] }]
  },
  settings: {
    // 需要使用eslint-plugin-import eslint-import-resolver-alias插件来完成eslint的别名设置
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
          ['@views', './src/views'],
          ['@api', './src/api'],
          ['@utils', './src/static/utils'],
          ['@store', './src/store'],
          ['@styles', './src/static/styles'],
          ['@hooks', './src/hooks']
        ],
        // * 使用alias时，文件可以忽略的后缀。如果不配置，会出现加入了后缀vscode报错，但不加后缀eslint报错的无限循环...
        extensions: ['.ts', '.d.ts', '.js', '.tsx']
      }
    }
  },
  overrides: [{
    files: ['*.ts', '*.tsx'],
    parser: 'vue-eslint-parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
      ecmaversion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      }
    },
    /** Typescript Rules */
    rules: {
      '@typescript-eslint/no-var-requires': 'error'
    }
  }]
}
