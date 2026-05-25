import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://www.comicvine.com/api/',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
