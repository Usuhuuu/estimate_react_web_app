import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/estimate_react_web_app/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: {
      rewrites: [{ from: /\//, to: '/404.html' }],
    },
  },

});
