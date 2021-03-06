import fs from 'fs'
import url from 'url'
import express from 'express'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import AppController from '../common/app/app-controller'
import { bindNodeCallback } from 'rxjs'
import { combineObject, isDevelopment } from '@baseloop/core'

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

  combineObject({
    indexHtml: bindNodeCallback(fs.readFile)(path.join('dist/client', 'index.html')),
    app: AppController({
      initialUrl: urlParts.path + (urlParts.search == null ? '' : urlParts.search)
    })
  }).subscribe({
    next: ({ indexHtml, app }) => {
      try {
        const appHtml = ReactDOMServer.renderToString(app)
        res.send(indexHtml.toString().replace('data-baseloop-app>', `data-baseloop-app>${appHtml}`))
        res.end()
      } catch (e) {
        internalServerErrorResponse(e, res)
      }
    },
    error: e => internalServerErrorResponse(e, res)
  })
})

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

const host = 'localhost'
const port = 8080

app.listen(port, host, () => {
  console.log(`Example project is running at http://${host}:${port}/`)
})
