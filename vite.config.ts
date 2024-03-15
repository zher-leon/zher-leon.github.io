import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import fs from 'fs'

// 初始化no-mock变量定义
if (!fs.existsSync('.env.develop.local')) {
  fs.writeFileSync('.env.develop.local', 'AUTH_TOKEN=xxxxx')
  console.log('未定义.env.develop.local文件，已初始化，请注意修改！')
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd())

  process.env = {
    ...process.env,
    ...env,
  } as unknown as NodeJS.ProcessEnv

  return {
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dts: true,
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      })
    ],
    resolve: {
      alias: {
        'node-fetch': 'isomorphic-fetch',
        '@': path.resolve(__dirname, './src'),
        '@utils': path.resolve(__dirname, './src/static/utils'),
        '@styles': path.resolve(__dirname, './src/static/styles'),
        '@views': path.resolve(__dirname, './src/views'),
        '@components': path.resolve(__dirname, './src/components'),
        '@api': path.resolve(__dirname, './src/api'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@icons': path.resolve(__dirname, './src/components/icons'),
        '@store': path.resolve(__dirname, './src/store'),
        '@router': path.resolve(__dirname, './src/router')
      },
    },
  }
})
