import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('three')) return 'three'
          if (id.includes('@react-three')) return 'react-three'
          if (id.includes('framer-motion')) return 'framer-motion'

          if (id.includes('react-dom')) return 'react-dom'
          if (id.includes('react')) return 'react'

          return 'vendor'
        },
      },
    },
  },
})