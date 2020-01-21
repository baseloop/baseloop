import { isDevelopment } from '@baseloop/core'
import { AutoReloadClient } from '@baseloop/dev'
import AppController from '../common/app/app-controller'
import { hydrate } from 'react-dom'

if (isDevelopment) {
  AutoReloadClient()
}

hydrate(
  AppController({
    initialUrl: window.location.href
  }),
  document.querySelector('[data-baseloop-app]')
)
