import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/thecore-100-days-web/phase-3-complete-websites/site/day-72-lawfirm/',
  build: {
    sourcemap: false,
    target: 'es2020',
  },
});