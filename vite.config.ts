import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Asegura que las rutas funcionen en cualquier subdirectorio
  define: {
    // Evita que la app crashee si se usa process.env en el navegador
    'process.env': {}
  }
});