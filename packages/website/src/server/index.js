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
  res.setHeader('Content-Type', 'text/html')
  res.send(fs.readFileSync('dist/client/index.html'))
  res.end()
})

app.listen(8081, 'localhost', () => {
  console.log('Example app is running at http://localhost:8081/')
})
