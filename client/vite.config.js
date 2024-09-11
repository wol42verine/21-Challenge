import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'client', // Set the root to the client directory
  plugins: [react()],
  build: {
    outDir: 'dist',  // Output directory relative to the root
    rollupOptions: {
      input: 'index.html', // Entry point for the build
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
});