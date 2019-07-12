#!/usr/bin/env node
/* tslint:disable:max-line-length */

import yargs from 'yargs'
import * as devServer from './dev-server'
import * as exampleProject from './example-project'

const startServerDescription = `Run the Baseloop development server. This server can use Webpack to handle compilation and bundling - with watcher mode support.

It can also either start its own backend server or you can tell it to start your own server instead. It supports auto-refresh for the browser.`

const createProjectDescription = `Creates a new sample project in the current directory and installs necessary dependencies.`

// tslint:disable-next-line:no-unused-expression
yargs
  .scriptName('baseloop')
  .usage('$0 <cmd> [args]')
  .command('dev', startServerDescription, devServer.options, devServer.command)
  .command('new', createProjectDescription, exampleProject.options, exampleProject.command)
  .help()
  .demandCommand().argv
