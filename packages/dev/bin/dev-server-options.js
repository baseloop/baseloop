module.exports = {
  port: {
    type: 'number',
    default: 8080,
    describe: 'The port number for internal server'
  },
  host: {
    type: 'string',
    default: 'localhost',
    describe: 'The hostname for internal server'
  },
  'auto-reload-port': {
    type: 'number',
    default: 3456,
    describe: 'The port number for the auto-reload WebSocket server'
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
    describe: 'Single-Page App always serves the root index at every URL'
  },
  'config-client': {
    type: 'string',
    default: 'webpack.config.js',
    describe: 'Path to the bundler client config file'
  },
  'config-server': {
    type: 'string',
    describe: 'Path to the bundler server config file'
  },
  server: {
    type: 'string',
    describe: 'Path to the server file when running your own server instead'
  },
  'public-dir': {
    type: 'string',
    default: 'dist/',
    describe: 'The public directory from which to serve files if no custom server specified'
  }
}
