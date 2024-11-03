import { defineConfig } from 'vite'
import { htmlTemplateImport } from './plugins/html-import'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [htmlTemplateImport()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html')
      }
    }
  }
})