import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use React's automatic JSX runtime so JSX files do not need a
// `React` variable in scope. This fixes `React is not defined`
// errors across Layout, Sections, Pages and other components.
export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  esbuild: {
    jsx: 'automatic',
  },
});
