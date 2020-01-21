/* tslint:disable:no-console */
import chalk from 'chalk'
import childProcess from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import process from 'process'
import yargs from 'yargs'
import * as util from './util'

export const command = () => {
  const packageJsonFile = path.resolve('package.json')

  if (!fs.existsSync(packageJsonFile)) {
    throw 'No package.json file found! Please run at least "npm init" before you start.'
  }

  console.log(chalk`{blue ∞ Setting up an example project}`)
  const source = path.resolve(util.binPath, '../../example-project/')
  const destination = path.resolve('')
  fs.copySync(source, destination)

  console.log(chalk`{blue ∞ Adding an npm script to your package.json}`)
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile).toString())
  packageJson.scripts = packageJson.scripts || {}
  packageJson.scripts.dev = 'baseloop dev --server dist/server/index.js'
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson))

  console.log(chalk`{blue ∞ Installing npm dependencies}`)

  const deps = ['@baseloop/core', '@baseloop/router', 'rxjs', 'react', 'react-dom', 'ramda', 'express']

  const devDeps = [
    '@baseloop/dev',
    'webpack',
    'html-webpack-plugin',
    'html-loader',
    'url-loader',
    'file-loader',
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
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

  {magenta npm run dev}`)
        }
      })
    }
  })
}

export const options = (argv: yargs.Argv) => argv.options({})
