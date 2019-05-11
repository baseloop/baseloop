import WebSocket from 'ws'
import chalk from 'chalk'

interface Options {
  port?: number
}

export function AutoReloadServer (options: Options = {}) {
  const port = options.port || 3456

  console.log(chalk`{blue ∞ Baseloop auto-reload server is running at} ws://localhost:${port.toString()}/`)

  const wss = new WebSocket.Server({port})

  const connections: WebSocket[] = []

  function forceReload () {
    connections.forEach(c => {
      try {
        c.send(JSON.stringify({forceReload: true}))
      } catch (e) {
        console.error(chalk`{red ∞ Could not send forceReload message to client:} `, e)
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
