import fs from 'fs'
import url from 'url'
import express from 'express'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import AppController from '../common/app/app-controller'
import { bindNodeCallback } from 'rxjs'
import { combineObject } from '@baseloop/core'
import { ServerStyleSheet } from 'styled-components'

const app = express()

const staticOptions = {
  index: false,
  setHeaders: res => {
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
    next: ({indexHtml, app}) => {
      const styleSheet = new ServerStyleSheet()
      try {
        const appHtml = ReactDOMServer.renderToString(styleSheet.collectStyles(app))
        const styleTags = styleSheet.getStyleTags()
        res.send(indexHtml.toString().replace('__CONTENT__', appHtml).replace('__STYLE_TAGS__', styleTags))
        res.end()
      } catch (e) {
        internalServerErrorResponse(e, res)
      } finally {
        styleSheet.seal()
      }
    },
    error: e => internalServerErrorResponse(e, res)
  })
})

function internalServerErrorResponse(e, res) {
  console.error(e)
  res.status(500)
  res.send('<h1>Internal server error</h1>')
  res.end()
}

const host = 'localhost'
const port = 8080

app.listen(port, host, () => {
  console.log(`Website is running at http://${host}:${port}/`)
})
