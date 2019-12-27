import url from 'url'
import { isDevelopment } from '@baseloop/core'
import AppController from '../../common/app/app-controller'
import { bindNodeCallback } from 'rxjs'
import fs from 'fs'
import path from 'path'
import { ServerStyleSheet } from 'styled-components'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

export const appRoute = (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'text/html')

  const urlParts = url.parse(req.url)

  try {
    bindNodeCallback(fs.readFile)(path.join('dist/client', 'index.html')).subscribe(indexHtml => {
      const app = AppController({
        initialUrl: urlParts.path + (urlParts.search == null ? '' : urlParts.search)
      })
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
    })
  } catch (e) {
    internalServerErrorResponse(e, res)
  }
}

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
