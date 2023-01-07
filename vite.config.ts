import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['src/tests'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
