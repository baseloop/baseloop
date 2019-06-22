/* tslint:disable:no-console */
import chalk from 'chalk'
import childProcess from 'child_process'
import express from 'express'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import yargs from 'yargs'
import { AutoReloadServer } from '../src/auto-reload/server'
import devServerOptions from './dev-server-options'
import * as util from './util'

export const command = (argv: any) => {
  console.log(util.baseloopAsciiLogo)

  const autoReloadServer = AutoReloadServer({
    port: argv['auto-reload-port']
  })

  /*eslint @typescript-eslint/no-var-requires:0*/
  const clientBundlerOptions = require(path.resolve(argv['config-client']))
  const serverBundlerOptions = argv['config-server'] ? require(path.resolve(argv['config-server'])) : null

  if (serverBundlerOptions) {
    const serverFile = path.resolve(argv.server)

    if (argv.bundler === 'webpack') {
      console.log(chalk`{blue ∞ Starting Webpack server watcher}`)
      let process: childProcess.ChildProcess

      const compiler = webpack(serverBundlerOptions)
      compiler.watch({}, (err, stats) => {
        if (err) {
          console.log(chalk`{red ∞ Webpack server compilation error:} `, err)
        } else {
          if (process != null && !process.killed) {
            process.kill()
          }

          process = childProcess.spawn('node', [serverFile])

          if (process.stdout != null && process.stderr != null) {
            process.stdout.on('data', data => {
              console.log(data.toString())
            })

            process.stderr.on('data', data => {
              console.error(data.toString())
            })

            process.on('exit', code => {
              if (code !== 0 && code != null) {
                console.error(chalk`{red ∞ Server exit with code:} ${code.toString()}`)
              }
            })
          }

          console.log(
            stats.toString({
              colors: true
            })
          )
        }
      })
    }
  } else {
    const app = express()

    const staticOptions = {
      index: false,
      setHeaders: (res: express.Response) => {
        res.setHeader('Cache-Control', 'public, max-age=31557600')
      }
    }

    app.use('/', express.static(argv['public-dir'], staticOptions))

    app.use((req, res) => {
      res.setHeader('Content-Type', 'text/html')
      res.send(fs.readFileSync(path.join(argv['public-dir'], 'index.html')))
      res.end()
    })

    app.listen(argv.port, argv.host, () => {
      console.log(chalk`{blue ∞ Baseloop development server is running at} http://${argv.host}:${argv.port}/`)
    })
  }

  if (argv.bundler === 'webpack') {
    console.log(chalk`{blue ∞ Starting Webpack client watcher}`)

    const compiler = webpack(clientBundlerOptions)
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(chalk`{red ∞ Webpack client compilation error:} `, err)
      } else {
        autoReloadServer.forceReload()

        console.log(
          stats.toString({
            colors: true
          })
        )
      }
    })
  }
}

export const options = (argv: yargs.Argv) => argv.options(devServerOptions)
