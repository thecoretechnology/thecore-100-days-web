import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/thecore-100-days-web/phase-3-complete-websites/site/day-75-handsel/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'app.html'
    }
  }
});
