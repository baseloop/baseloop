const WebSocket = require('ws')

module.exports = function AutoReloadServer (options = {}) {
  const port = options.port || 3456

  console.log(`Baseloop auto-reload server is running at ws://localhost:${port}/`)

  const wss = new WebSocket.Server({port})

  const connections = []

  function forceReload () {
    connections.forEach(c => {
      try {
        c.send(JSON.stringify({forceReload: true}))
      } catch (e) {
        console.error('Could not send forceReload message to client: ', e)
      }
    })
  }

  wss.on('connection', ws => {
    connections.push(ws)

    ws.on('close', () => {
      const index = connections.indexOf(ws)
      if (index > -1) {
        connections.splice(index, 1)
      }
    })
  })

  return {
    forceReload
  }
}
