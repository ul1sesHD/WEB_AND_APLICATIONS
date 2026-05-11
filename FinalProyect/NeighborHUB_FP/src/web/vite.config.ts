import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(__dirname, '../..'),
  resolve: {
    alias: {
      '@':        path.resolve(__dirname, './src'),
      '@shared':  path.resolve(__dirname, '../shared/src'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: '../../dist/web',
    emptyOutDir: true,
    sourcemap: true,
  },
});
