import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

const PORT = Number(process.env.PORT) || 3000;

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    // host: true → accesible desde otros equipos de la red (http://<IP>:3000)
    server: {
      host: true,
      port: PORT,
      // DISABLE_HMR=true desactiva la recarga en caliente (usado por AI Studio).
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host: true,
      port: PORT,
    },
  };
});
