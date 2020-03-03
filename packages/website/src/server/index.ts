import { isDevelopment } from '@baseloop/core'
import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import AppController from '../common/app/app-controller'
import 'regenerator-runtime/runtime'

const app = express()

const staticOptions = {
  index: false,
  setHeaders: (res: express.Response) => {
    res.setHeader('Cache-Control', 'public, max-age=31557600')
  }
}

app.use('/', express.static('dist/client', staticOptions))

app.use(async (req, res) => {
  res.setHeader('Content-Type', 'text/html')

  const indexHtml = (await fs.readFile(path.join('dist/client', 'index.html'))).toString('utf-8')
  const initialUrl = req.protocol + '://' + req.header('host') + req.url

  try {
    AppController({
      initialUrl
    }).subscribe({
      next: (app: any) => {
        const styleSheet = new ServerStyleSheet()
        try {
          const appHtml = ReactDOMServer.renderToString(styleSheet.collectStyles(app))
          const styleTags = styleSheet.getStyleTags()
          res.send(
            indexHtml
              .toString()
              .replace('data-app>', `data-app>${appHtml}`)
              .replace('</head>', `${styleTags}</head>`)
          )
          res.end()
        } catch (e) {
          internalServerErrorResponse(e, res, indexHtml)
        } finally {
          styleSheet.seal()
        }
      },
      error: (e: any) => internalServerErrorResponse(e, res, indexHtml)
    })
  } catch (e) {
    internalServerErrorResponse(e, res, indexHtml)
  }
})

const host = 'localhost'
const port = 8080

app.listen(port, host, () => {
  console.log(`Website is running at http://${host}:${port}/`)
})

function internalServerErrorResponse(e: Error, res: express.Response, indexHtml: string) {
  console.error(e)
  if (isDevelopment) {
    res.send(indexHtml)
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
