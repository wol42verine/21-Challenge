import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.', // Set the root to the current directory
  plugins: [react()],
  build: {
    outDir: 'client/dist', // Output directory relative to the root
    rollupOptions: {
      input: 'client/index.html', // Entry point for the build
      external: ['@apollo/client/Link/context'] // Treat Apollo Client as external
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
})