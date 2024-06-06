import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from 'vite-plugin-require'
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginRequire.default(),
    replace({
      'process.env.VITE_APP_URL': JSON.stringify(process.env.VITE_APP_URL),
      preventAssignment: true
    })
  ],
})
