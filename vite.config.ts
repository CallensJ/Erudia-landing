// Configuration Vite pour la landing Erudia
// - Alias @ → src/ pour imports propres dans composants et SCSS
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Alias @ → src/ disponible dans TS et dans les @use SCSS des SFCs Vue
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
