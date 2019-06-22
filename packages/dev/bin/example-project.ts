/* tslint:disable:no-console */
import chalk from 'chalk'
import childProcess from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import process from 'process'
import yargs from 'yargs'
import exampleServerOptions from './example-project-options'
import * as util from './util'

export const command = () => {
  console.log(util.baseloopAsciiLogo)

  console.log(chalk`{blue ∞ Setting up an example project}`)
  const source = path.resolve(util.binPath, '../example-project/')
  const destination = path.resolve('')
  fs.copySync(source, destination)

  console.log(chalk`{blue ∞ Adding an npm script to your package.json}`)
  const packageJsonFile = path.resolve('package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile).toString())
  packageJson.scripts = packageJson.scripts || {}
  packageJson.scripts.dev = [
    'baseloop dev',
    '--config-client config/webpack/client-dev.js',
    '--config-server config/webpack/server-dev.js',
    '--server dist/server/index.js'
  ].join(' ')
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson))

  console.log(chalk`{blue ∞ Installing npm dependencies}`)

  const deps = ['@baseloop/core', '@baseloop/router', 'rxjs', 'react', 'react-dom', 'ramda', 'express']

  const devDeps = [
    '@baseloop/dev',
    'webpack',
    'webpack-merge',
    'html-webpack-plugin',
    'html-loader',
    'url-loader',
    'file-loader',
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-react',
    'babel-cli',
    'babel-loader'
  ]

  const options: childProcess.SpawnOptions = { cwd: destination, stdio: 'inherit' }
  const npmScript = /^win/.test(process.platform) ? 'npm.cmd' : 'npm'
  const depsProcess = childProcess.spawn(npmScript, ['install', '--save'].concat(deps), options)

  depsProcess.on('error', (e: Error) => console.log(chalk`{red ${e.stack || e.message}}`))

  depsProcess.on('close', (code: number) => {
    if (code == null || code >= 0) {
      console.log(chalk`{blue ∞ Installing npm dev dependencies}`)

      const devDepsProcess = childProcess.spawn(npmScript, ['install', '--save-dev'].concat(devDeps), options)

      devDepsProcess.on('error', (e: Error) => console.log(chalk`{red ${e.stack || e.message}}`))

      devDepsProcess.on('close', (code: number) => {
        if (code == null || code >= 0) {
          console.log(chalk`{green ∞ Done! Run the following command to get started:}

  {magenta npm run app:dev}`)
        }
      })
    }
  })
}

export const options = (argv: yargs.Argv) => argv.options(exampleServerOptions)
