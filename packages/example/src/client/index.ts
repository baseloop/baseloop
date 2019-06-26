import { isDevelopment, run } from '@baseloop/core'
import { AutoReloadClient } from '@baseloop/dev'
import AppController from '../common/app/app-controller'

if (isDevelopment) {
  AutoReloadClient()
}

const app = AppController({
  initialUrl: window.location.pathname + window.location.search
})

run(app)
