import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      external: ['node:fs', 'node:path', 'node:fs/promises'],
      output: {
        globals: {
          'node:fs': 'fs',
          'node:path': 'path',
          'node:fs/promises': 'fs/promises',
        },
      },
    },
    lib: {
      entry: './index.ts',
      name: 'ranlexer',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  plugins: [dts()],
});
