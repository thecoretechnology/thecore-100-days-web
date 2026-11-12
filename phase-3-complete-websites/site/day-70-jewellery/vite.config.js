import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Use React's automatic JSX runtime so JSX files do not need a
// `React` variable in scope. This fixes `React is not defined`
// errors across Layout, Sections, Pages and other components.
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
});
