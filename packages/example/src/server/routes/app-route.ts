import { isDevelopment } from '@baseloop/core'
import express from 'express'
import fs from 'fs'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { bindNodeCallback } from 'rxjs'
import { first } from 'rxjs/operators'
import { ServerStyleSheet } from 'styled-components'
import AppController from '../../common/app/app-controller'

export const appRoute = (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'text/html')

  const initialUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  try {
    bindNodeCallback(fs.readFile)(path.join('dist/client', 'index.html')).subscribe(indexHtml => {
      AppController({ initialUrl })
        .pipe(first())
        .subscribe(app => {
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
