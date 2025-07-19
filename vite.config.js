import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve:{
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), commonjs()],
  optimizeDeps: {
    include: ['react-datepicker', 'react-quill', 'react-slick', 'slick-carousel', 'isomorphic-fetch'],
  },
});