// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'; // Include other framework plugins if used

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
});
