import * as fs from 'fs'
import express from 'express'

const app = express()

const staticOptions = {
  index: false,
  setHeaders: res => {
    res.setHeader('Cache-Control', 'public, max-age=31557600')
  }
}

app.use('/', express.static('dist/client', staticOptions))

app.use((req, res) => {
  const html = fs.readFileSync('dist/client/index.html')
    .toString()
    .replace('index.js', '/index.js')
    .replace('favicon.png', '/favicon.png')

  res.setHeader('Content-Type', 'text/html')
  res.send(html)
  res.end()
})

app.listen(1337, 'localhost', () => {
  console.log('Example app is running at http://localhost:1337/')
})
