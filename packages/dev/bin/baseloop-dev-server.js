#!/usr/bin/env node

const AutoReloadServer = require('../src/auto-reload/server')
const fs = require('fs')
const express = require('express')
const path = require('path')
const webpack = require('webpack')
const yargs = require('yargs')

yargs.options(require('./options'))

const argv = yargs.argv

const app = express()

const staticOptions = {
  index: false,
  setHeaders: res => {
    res.setHeader('Cache-Control', 'public, max-age=31557600')
  }
}

app.use('/', express.static(argv.dir, staticOptions))

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(fs.readFileSync(path.join(argv.dir, 'index.html')))
  res.end()
})

app.listen(argv.port, argv.host, () => {
  console.log(`Baseloop development server is running at http://${argv.host}:${argv.port}/`)
})

const autoReloadServer = AutoReloadServer({
  port: argv.autoReloadPort
})

if (argv.bundler === 'webpack') {
  console.log('Starting Webpack watcher...')

  const compilerOptions = require(path.resolve(argv.config))
  const compiler = webpack(compilerOptions)
  const watcher = compiler.watch({}, (err, stats) => {
    if (err) {
      console.log('Webpack compilation error: ', err)
    } else {
      autoReloadServer.forceReload()

      console.log(stats.toString({
        colors: true
      }))
    }
  })
}
