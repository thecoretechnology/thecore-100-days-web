import { defineConfig } from 'astro/config';

export default defineConfig({
  outDir: './dist',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
