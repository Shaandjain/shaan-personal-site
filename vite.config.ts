import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Change to '/<repo-name>/' for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html',
        gallery: './gallery.html',
        yosemiteGallery: './yosemite-gallery.html',
      },
    },
  },
})

