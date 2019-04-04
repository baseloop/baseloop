module.exports = {
  port: {
    type: 'number',
    default: 8080,
    describe: 'The port number to use'
  },
  host: {
    type: 'string',
    default: 'localhost',
    describe: 'The hostname to use'
  },
  'auto-reload-port': {
    type: 'number',
    default: 3456,
    describe: 'The port number used for the auto reload WebSocket server'
  },
  bundler: {
    type: 'string',
    default: 'webpack',
    describe: 'What bundler to use',
    choices: ['webpack']
  },
  spa: {
    type: 'boolean',
    default: true,
    describe: 'SPA mode will always serve the root index'
  },
  'config-client': {
    type: 'string',
    describe: 'Path to the bundler client config file',
    required: true
  },
  'config-server': {
    type: 'string',
    describe: 'Path to the bundler server config file',
    required: false
  },
  server: {
    type: 'string',
    describe: 'Path to the server file'
  },
  publicDir: {
    type: 'string',
    describe: 'The public directory from which to serve files if no custom server specified'
  }
}
