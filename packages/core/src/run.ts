import { ReactElement } from 'react'
import { hydrate, render } from 'react-dom'
import { Observable } from 'rxjs'

class RunOptions {
  public containerQuerySelector?: string
}

export function run(app: Observable<ReactElement>, options: RunOptions = {}): void {
  const container = document.querySelector(options.containerQuerySelector || '[data-baseloop-app]')

  let firstRender = true
  app.subscribe((app: ReactElement): void => {
    if (firstRender) {
      hydrate(app, container)
      firstRender = false
    } else {
      render(app, container)
    }
  })
}
