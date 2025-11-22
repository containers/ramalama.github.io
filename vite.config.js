import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sirv from 'sirv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsDir = resolve(__dirname, 'public/docs')

const serveDocsPlugin = () => ({
  name: 'serve-public-docs',
  configureServer(server) {
    const serve = sirv(docsDir, { dev: true })

    server.middlewares.use((req, res, next) => {
      const url = req.url
      if (!url || !url.startsWith('/docs')) {
        return next()
      }

      const parsedUrl = new URL(url, 'http://localhost')
      const strippedPath = parsedUrl.pathname.slice('/docs'.length) || '/'
      req.url = `${strippedPath}${parsedUrl.search}`

      serve(req, res, (err) => {
        req.url = url
        next(err)
      })
    })
  },
})

export default defineConfig({
  plugins: [react(), serveDocsPlugin()],
  homepage: "https://github.com/containers/ramalama.github.io",
  base: '',
})
