import { defineConfig } from 'vite'
import { htmlTemplateImport } from './plugins/html-import'
import { resolve, dirname } from 'node:path'

export default defineConfig({
  plugins: [htmlTemplateImport()],
  appType: 'mpa',
  base: '/portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html')
      }
    }
  }
})