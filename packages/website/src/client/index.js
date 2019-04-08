import { isDevelopment, run } from '@baseloop/core'
import AppController from '../common/app/app-controller'

const app = AppController({
  initialUrl: window.location.pathname + window.location.search
})

run(app, {
  enableAutoReload: isDevelopment
})
