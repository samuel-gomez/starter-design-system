import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  envPrefix: 'FRONT_',
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'build',
  },
});
