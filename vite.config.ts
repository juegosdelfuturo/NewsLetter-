import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno según el modo (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: './',
    define: {
      // Reemplaza process.env.API_KEY con el valor real durante el build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Evita que referencias generales a process.env rompan la app
      'process.env': {}
    }
  };
});