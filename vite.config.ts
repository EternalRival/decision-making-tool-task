import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  base: './',
  plugins: [obfuscatorPlugin()],
  server: {
    host: true,
    hmr: false,
  },
  build: {
    assetsInlineLimit: (filePath) => !/sprite\.svg$/i.test(filePath),
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    alias: {
      '~': resolve(import.meta.dirname, 'src'),
    },
  },
});
