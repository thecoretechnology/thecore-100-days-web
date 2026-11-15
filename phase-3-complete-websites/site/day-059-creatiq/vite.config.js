import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'direct-file-preview',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace('<script type="module" crossorigin', '<script defer');
      },
    },
  ],
  build: {
    target: 'es2018',
    cssTarget: 'safari13',
  },
});
