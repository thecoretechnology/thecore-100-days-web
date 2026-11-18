import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/thecore-100-days-web/phase-3-complete-websites/site/day-78-harvesthill/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: { input: 'app.html' },
  },
  server: { port: 5173, strictPort: false },
});
