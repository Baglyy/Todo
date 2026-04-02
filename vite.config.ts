import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true,
    port: 8080,     
    allowedHosts: [
      'todo-lite.fly.dev' 
    ]
  },
  plugins: [vue()],
})
