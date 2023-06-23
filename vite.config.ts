import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080/api/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
