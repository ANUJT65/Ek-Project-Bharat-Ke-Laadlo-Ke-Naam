import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      'application/gltf-binary': ['glb'],  // Ensure GLTF file types are served correctly
      'text/plain': ['gltf'],  // Optional: Also add GLTF text files
    },
  },
});
