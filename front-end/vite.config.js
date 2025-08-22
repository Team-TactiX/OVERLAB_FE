import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://52.78.12.127:8080',
        changeOrigin: true,
      },
    },
  },
});
