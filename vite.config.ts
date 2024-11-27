import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  base: './',
  plugins: [tsconfigPaths(), obfuscatorPlugin()],
  server: {
    host: true,
  },
  build: {
    assetsInlineLimit: (filePath) => !/sprite\.svg$/i.test(filePath),
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
