import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 设置文件别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue(), WindiCSS(),]
})
