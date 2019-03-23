import { AutoReloadClient } from '@baseloop/dev'
import { render } from 'react-dom'
import AppController from './app/app-controller'

if (process.env.NODE_ENV === 'development') {
  AutoReloadClient()
}

AppController().subscribe(app => render(app, document.getElementById('app-container')))
