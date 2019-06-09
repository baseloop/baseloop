const options: Record<string, any> = {
  'auto-reload-port': {
    default: 3456,
    describe: 'The port number for the auto-reload WebSocket server',
    type: 'number'
  },
  bundler: {
    choices: ['webpack'],
    default: 'webpack',
    describe: 'What bundler to use',
    type: 'string'
  },
  'config-client': {
    default: 'webpack.config.js',
    describe: 'Path to the bundler client config file',
    type: 'string'
  },
  'config-server': {
    describe: 'Path to the bundler server config file',
    type: 'string'
  },
  host: {
    default: 'localhost',
    describe: 'The hostname for internal server',
    type: 'string'
  },
  port: {
    default: 8080,
    describe: 'The port number for internal server',
    type: 'number'
  },
  'public-dir': {
    default: 'dist/',
    describe: 'The public directory from which to serve files if no custom server specified',
    type: 'string'
  },
  server: {
    describe: 'Path to the server file when running your own server instead',
    type: 'string'
  },
  spa: {
    default: true,
    describe: 'Single-Page App always serves the root index at every URL',
    type: 'boolean'
  }
}

export default options
