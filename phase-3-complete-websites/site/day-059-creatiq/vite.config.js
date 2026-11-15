import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'direct-file-preview',
      apply: 'build',
      transformIndexHtml(html) {
        return html
          .replace('<script type="module" crossorigin', '<script defer')
          .replace(/ crossorigin(?=[ >])/g, '');
      },
    },
  ],
  build: {
    target: 'es2018',
    cssTarget: 'safari13',
  },
});
