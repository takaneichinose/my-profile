import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';

import { myProfile } from './vite_plugins/vite-plugin-my-profile';

export default defineConfig({
  plugins: [splitVendorChunkPlugin(), react(), myProfile()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
