import { hydrate, render } from 'react-dom'
import { AutoReloadClient } from '../../dev/src'

export function run (app, options = {}) {
  const container = document.querySelector('[data-baseloop-app]')

  if (options.enableAutoReload) {
    AutoReloadClient()
  }

  let firstRender = true
  app.subscribe(app => {
    if (firstRender) {
      hydrate(app, container)
      firstRender = false
    } else {
      render(app, container)
    }
  })
}
