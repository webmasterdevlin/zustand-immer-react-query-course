/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['src/tests'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    reporters: 'verbose',
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
