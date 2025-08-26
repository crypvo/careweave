// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],     // Reactなら入れておくと安心
  build: {
    outDir: 'dist',
    ssr: false            // ← SSRを明示的にオフ
  }
})
