import {defineConfig, UserConfig} from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig(({ command }): UserConfig => {
  if (command === 'serve') {       // dev specific config

    return {
      plugins: [
        react(),
      ],
      // Below code breaks the npm run build
      define: {
        global: 'window',
      },
    }
  } else {  // build specific config (command === 'build')
    return {
      plugins: [
        react(),
      ],
    }
  }
})




