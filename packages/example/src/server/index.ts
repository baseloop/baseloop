import { combineObject, isDevelopment } from '@baseloop/core'
import express from 'express'
import fs from 'fs'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { bindNodeCallback } from 'rxjs'
import { ServerStyleSheet } from 'styled-components'
import url from 'url'
import AppController from '../common/app/app-controller'

const app = express()

const staticOptions = {
  index: false,
  setHeaders: (res: express.Response) => {
    res.setHeader('Cache-Control', 'public, max-age=31557600')
  }
}

app.use('/', express.static('dist/client', staticOptions))

function internalServerErrorResponse(e: Error, res: express.Response) {
  console.error(e)
  res.status(500)
  const errorMessage = isDevelopment ? `<pre>${e.stack}</pre>` : ''
  res.send(`
<html>
<head>
  <title>Internal server error</title>
</head>
<body>
  <h1>Internal server error</h1>
  ${errorMessage}
</body>
</html>
`)
  res.end()
}

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html')

  const urlParts = url.parse(req.url)

  combineObject({
    app: AppController({
      initialUrl: urlParts.path + (urlParts.search == null ? '' : urlParts.search)
    }),
    indexHtml: bindNodeCallback(fs.readFile)(path.join('dist/client', 'index.html'))
  }).subscribe({
    error: e => internalServerErrorResponse(e, res),
    next: ({ indexHtml, app }: any) => {
      const styleSheet = new ServerStyleSheet()
      try {
        const appHtml = ReactDOMServer.renderToString(styleSheet.collectStyles(app))
        const styleTags = styleSheet.getStyleTags()
        res.send(
          indexHtml
            .toString()
            .replace('data-baseloop-app>', `data-baseloop-app>${appHtml}`)
            .replace('</head>', `${styleTags}</head>`)
        )
        res.end()
      } catch (e) {
        internalServerErrorResponse(e, res)
      } finally {
        styleSheet.seal()
      }
    }
  })
})

const host = 'localhost'
const port = 8080

app.listen(port, host, () => {
  console.log(`Website is running at http://${host}:${port}/`)
})
