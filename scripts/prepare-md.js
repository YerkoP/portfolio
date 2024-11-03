import { readdir, readFile, rm, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import markdownit from 'markdown-it'

const md = markdownit({
  break: true
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const MD_SOURCE_PATH = join(__dirname, '..', 'src', 'blog')
const MD_DIST_PATH = join(__dirname, '..', 'public', 'blog')

;(async () => {
  // clean destination files
  await rm(MD_DIST_PATH, { recursive: true, force: true })

  // rebuild de path
  await mkdir(MD_DIST_PATH, { recursive: true })

  // read source files
  const files = await readdir(MD_SOURCE_PATH, { withFileTypes: true, encoding: 'utf8' })
  if (files.length < 1) {
    console.log('No md files found')
    return
  }
  await Promise.all(files.map((file) => createHtml(file, MD_SOURCE_PATH)))
})()

async function createHtml(file, baseDir) {
  if (file.isFile() && file.name.indexOf('.md') > 0) {
    const content = await readFile(join(baseDir, file.name), 'utf8')
    const htmlContent = md.render(content)
    const newFileContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  </head>
  <body>
  ${htmlContent}
  </body>
</html>
`
    const arr = file.name.split('.')
    arr.pop()
    const newFilename = arr.join('.') + '.html'
    await writeFile(join(MD_DIST_PATH, newFilename), newFileContent)
  }
}