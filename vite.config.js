import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  homepage: "https://github.com/containers/ramalama.github.io",
  base: '',
})