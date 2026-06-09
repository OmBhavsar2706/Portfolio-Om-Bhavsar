import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Hot Module Replacement (HMR) configuration for the developer environment
      // File watching is managed to prevent flashing or unnecessary reload loops.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Throttling file watching helps reduce CPU overhead inside server containers.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
