import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,   // 👈 enable polling
      interval: 100       // 👈 optional: adjust the polling interval (ms)
    }
  },
  plugins: [react()],
})
