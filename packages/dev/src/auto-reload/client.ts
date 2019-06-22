interface Options {
  port?: number
}

export function AutoReloadClient(options: Options = {}) {
  const port = options.port || 3456
  const ws = new WebSocket(`ws://localhost:${port}`)

  ws.onopen = () => {
    console.info(`∞ Auto-reload client started on WebSocket port ${port}`)
  }

  ws.onmessage = event => {
    if (event.data != null) {
      try {
        const state = JSON.parse(event.data)
        if (state.forceReload) {
          window.location.reload()
        }
      } catch (e) {
        console.error('∞ Unexpected message: ', e)
      }
    }
  }
}
