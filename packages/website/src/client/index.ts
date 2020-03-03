import { isDevelopment } from '@baseloop/core'
import { AutoReloadClient } from '@baseloop/dev'
import { render } from 'react-dom'
import AppController from '../common/app/app-controller'

if (isDevelopment) {
  AutoReloadClient()
}

AppController({
  initialUrl: window.location.href
}).subscribe(app => render(app, document.querySelector('[data-app]')))
