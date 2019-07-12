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
  config: {
    default: 'webpack.config.js',
    describe: 'Path to the bundler config file',
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
    describe: 'The public directory from which to serve files if no custom server is specified',
    type: 'string'
  },
  server: {
    describe: 'Path to the server file when running your own server instead',
    type: 'string'
  },
  spa: {
    default: true,
    describe:
      'Single-Page App always serves the root index at every URL. Not available when a custom server is specified.',
    type: 'boolean'
  }
}

export default options
