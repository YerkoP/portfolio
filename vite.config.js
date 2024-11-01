import { defineConfig } from 'vite'
import { htmlTemplateImport } from './plugins/html-import'

export default defineConfig({
  plugins: [htmlTemplateImport()]
})