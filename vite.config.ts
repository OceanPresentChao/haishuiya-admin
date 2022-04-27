import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path';

import {
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'
import {
  ElementPlusResolve, createStyleImportPlugin
} from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // ui库解析器
      resolvers: [ElementPlusResolver()],
      // 指定组件位置，默认是src/components
      dirs: ['src/components', 'src/views'],
      extensions: ['vue'],
      // 配置文件生成位置
      deep: true,
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts'
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()]
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  server: {
    open: true,
    proxy: {
      '/agent': {
        target: 'http://localhost:2777',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agent/, '')
      },
      '/slogan': {
        target: 'http://v1.hitokoto.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/slogan/, '')
      }
    }
  }
})
