module.exports = function AutoReloadClient (options = {}) {
  const port = options.port || 3456
  const ws = new WebSocket(`ws://localhost:${port}`)

  ws.onopen = event => {
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
