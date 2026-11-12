import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  base: './',
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    outDir: 'app',
    emptyOutDir: false,
    rollupOptions: {
      input: fileURLToPath(new URL('./app.html', import.meta.url)),
    },
  },
})
