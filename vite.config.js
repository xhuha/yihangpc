import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/map': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/map/, ''),
        secure: false, // 允许https协议
        timeout: 60000 // 增加超时时间
      }
    }
  }
})
