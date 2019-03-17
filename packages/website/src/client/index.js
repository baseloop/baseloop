import { render } from 'react-dom'
import AppController from './app/app-controller'

AppController().subscribe(app => render(app, document.getElementById('app-container')))
