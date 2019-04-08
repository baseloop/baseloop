const fs = require('fs-extra')
const path = require('path')
const util = require('./util')
const childProcess = require('child_process')
const process = require('process')
const chalk = require('chalk')

module.exports = {
  options: yargs => {
    yargs.options(require('./example-project-options'))
  },
  command: argv => {
    console.log(util.baseloopAsciiLogo)

    console.log(chalk`{blue ∞ Setting up an example project}`)
    const source = path.resolve(util.binPath, '../example-project/')
    const destination = path.resolve('')
    fs.copySync(source, destination)

    console.log(chalk`{blue ∞ Adding an npm script to your package.json}`)
    const packageJsonFile = path.resolve('package.json')
    let packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
    packageJson.scripts = packageJson.scripts || {}
    packageJson.scripts['app:dev'] = 'baseloop start:server --config-client config/webpack/client-dev.js --config-server config/webpack/server-dev.js --server dist/server/index.js'
    fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson))

    console.log(chalk`{blue ∞ Installing npm dependencies}`)

    const deps = [
      '@baseloop/core',
      '@baseloop/ui',
      '@baseloop/router',
      'rxjs',
      'react',
      'react-dom',
      'ramda',
      'express'
    ]

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

    const options = {cwd: destination, stdio: 'inherit'}
    const npmScript = /^win/.test(process.platform) ? 'npm.cmd' : 'npm'
    const depsProcess = childProcess.spawn(npmScript, ['install', '--save'].concat(deps), options)

    depsProcess.on('error', e => console.log(chalk`{red ${e.stack}}`))

    depsProcess.on('close', code => {
      if (code == null || code >= 0) {
        console.log(chalk`{blue ∞ Installing npm dev dependencies}`)

        const devDepsProcess = childProcess.spawn(npmScript, ['install', '--save-dev'].concat(devDeps), options)

        devDepsProcess.on('error', e => console.log(chalk`{red ${e.stack}}`))

        devDepsProcess.on('close', code => {
          if (code == null || code >= 0) {
            console.log(chalk`{green ∞ Done! Run the following command to get started:} 

    {magenta npm run app:dev}`)
          }
        })
      }
    })
  }
}
