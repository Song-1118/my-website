import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    vue(),
    Pages(), // 自动生成路由
    createHtmlPlugin({
      minify: true, // 压缩 HTML
      inject: {
        data: {
          title: '极光栈|AuroraHub', // 自定义 SEO 标题
          description: '极光栈主站，有下载板块、网站导航和自研的音乐播放器' // 自定义 SEO 描述
        }
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})
