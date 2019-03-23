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
  autoReloadPort: {
    type: 'number',
    default: 3456,
    describe: 'The port number to use for the auto reload server'
  },
  bundler: {
    type: 'string',
    required: true,
    describe: 'What bundler to use',
    choices: ['webpack']
  },
  spa: {
    type: 'boolean',
    default: false,
    describe: 'SPA mode will always serve the root index'
  },
  config: {
    type: 'string',
    describe: 'Path to the bundler config file',
    required: true
  },
  dir: {
    type: 'string',
    describe: 'The directory to serve',
    required: true
  }
}
