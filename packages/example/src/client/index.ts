import { isDevelopment } from '@baseloop/core'
import { AutoReloadClient } from '@baseloop/dev'
import AppController from '../common/app/app-controller'
import { hydrate } from 'react-dom'

if (isDevelopment) {
  AutoReloadClient()
}

AppController({
  initialUrl: window.location.href
}).subscribe(app => hydrate(app, document.querySelector('[data-baseloop-app]')))
