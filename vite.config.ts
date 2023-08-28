import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // ... other Vite config options ...

  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'), // Your alias and path here
    },
  },
});
