import fs from 'fs'
import url from 'url'
import express from 'express'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import AppController from '../common/app/app-controller'
import { bindNodeCallback } from 'rxjs'
import { combineObject, isDevelopment } from '@baseloop/core'
import { ServerStyleSheet } from 'styled-components'

const app = express()

const staticOptions = {
  index: false,
  setHeaders: (res: express.Response) => {
    res.setHeader('Cache-Control', 'public, max-age=31557600')
  }
}

app.use('/', express.static('dist/client', staticOptions))

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html')

  const urlParts = url.parse(req.url)

  try {
    combineObject({
      indexHtml: bindNodeCallback(fs.readFile)(path.join('dist/client', 'index.html')),
      app: AppController({
        initialUrl: urlParts.path + (urlParts.search == null ? '' : urlParts.search)
      })
    }).subscribe({
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
      },
      error: e => internalServerErrorResponse(e, res)
    })
  } catch (e) {
    internalServerErrorResponse(e, res)
  }
})

const host = 'localhost'
const port = 8080

app.listen(port, host, () => {
  console.log(`Website is running at http://${host}:${port}/`)
})

function internalServerErrorResponse(e: Error, res: express.Response) {
  console.error(e)
  if (isDevelopment) {
    res.send(fs.readFileSync(path.join('dist/client', 'index.html')))
  } else {
    res.status(500)
    res.send(`
<html>
<head>
  <title>Internal server error</title>
</head>
<body>
  <h1>Internal server error</h1>
</body>
</html>
`)
  }
  res.end()
}