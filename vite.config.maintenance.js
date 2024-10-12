import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/src/maintenance.html'
  },
  build: {
    rollupOptions: {
      input: '/src/maintenance.html'
    }
  }
});