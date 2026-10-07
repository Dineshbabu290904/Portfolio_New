import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /<repo>/, so the deploy workflow sets VITE_BASE.
  // Netlify and local dev keep the root path.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Split large, rarely-changing libraries into their own cacheable chunks
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          particles: ['react-particles', 'tsparticles', 'tsparticles-engine'],
        },
      },
    },
  },
});
