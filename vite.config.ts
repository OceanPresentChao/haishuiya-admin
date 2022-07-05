import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'
import path from 'path';
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
      dirs: ['src/components', 'src/views', 'src/layout'],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts'
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()]
    }),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  server: {
    open: true,
    proxy: {
      '/mockApi': {
        target: 'https://mock.apifox.cn/m1/1084382-0-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mockApi/, '')
      },
      '/slogan': {
        target: 'http://v1.hitokoto.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/slogan/, '')
      },
      '/realApi': {
        target: 'http://localhost:2777',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/realApi/, '')
      }
    }
  },
})
