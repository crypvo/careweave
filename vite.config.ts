// vite.config.ts（置き換え）
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    ssr: false,        // ← SSRを明示的に無効化
  }
})
