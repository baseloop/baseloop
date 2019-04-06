import { AutoReloadClient } from '@baseloop/dev'
import { isDevelopment } from '@baseloop/core'
import { hydrate, render } from 'react-dom'
import AppController from '../common/app/app-controller'

if (isDevelopment) {
  AutoReloadClient()
}

const container = document.getElementById('app-container')
let firstRender = true

AppController({
  initialUrl: window.location.pathname + window.location.search
}).subscribe(app => {
  if (firstRender) {
    hydrate(app, container)
    firstRender = false
  } else {
    render(app, container)
  }
})
