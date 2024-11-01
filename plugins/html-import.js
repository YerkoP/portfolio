import { Dirent } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const defaultConfig = {
  templatesPath: 'src/templates'
}

export function htmlTemplateImport(config) {
  config = Object.assign(defaultConfig, config)
  return {
    name: 'html-template-import',
    async transformIndexHtml(html) {
      const files = await readdir(config.templatesPath, { withFileTypes: true, encoding: 'utf8' })
      for (const file of files) {
        html = await injectHtml(file, html, config.templatesPath)
      }
      return html
    }
  }
}

/**
 * 
 * @param {Dirent} file 
 * @param {string} original 
 * @param {string} baseDir
 * @returns 
 */
async function injectHtml(file, original, baseDir) {
  if (file.isFile() && file.name.indexOf('.html') > 0) {
    const content = await readFile(join(baseDir, file.name))
    const bodyIndex = original.indexOf('<body>')
    return [original.slice(0, bodyIndex), content, original.slice(bodyIndex)].join('')
  }
  return ''
}