import { hydrate, render } from 'react-dom'
import { ReactElement } from 'react'
import { Observable } from 'rxjs'

class RunOptions {
  containerQuerySelector?: string
}

export function run (app: Observable<ReactElement>, options: RunOptions = {}) {
  const container = document.querySelector(options.containerQuerySelector || '[data-baseloop-app]')

  let firstRender = true
  app.subscribe((app: ReactElement) => {
    if (firstRender) {
      hydrate(app, container)
      firstRender = false
    } else {
      render(app, container)
    }
  })
}
