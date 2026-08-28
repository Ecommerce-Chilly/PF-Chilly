import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/PF-Chilly/',
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  test: {
    environment: 'node',
    globals: true,
  },
});
