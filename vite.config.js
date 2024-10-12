import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/src/index.html'
  },
  build: {
    rollupOptions: {
      input: {
        main: '/src/index.html',
        maintenance: '/src/maintenance.html'
      }
    }
  }
});