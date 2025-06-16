/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['src/e2e'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    reporters: 'verbose',
    coverage: {
      provider: 'istanbul',
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
