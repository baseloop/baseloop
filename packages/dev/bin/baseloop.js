#!/usr/bin/env node

const devServer = require('./dev-server')

const startServerDescription = `Run the Baseloop development server. This server can use Webpack to handle compilation and bundling - with watcher mode support.
 
It can also either start its own backend server or you can tell it to start your own server instead. It supports auto-refresh for the browser.`

require('yargs')
  .scriptName('baseloop')
  .usage('$0 <cmd> [args]')
  .command('start:server', startServerDescription, devServer.options, devServer.command)
  .help()
  .demandCommand()
  .argv
