import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import AppView from './app-view'
import AboutController from '../about/about-controller'

interface Params {
  initialUrl: string
}

export default function AppController({ initialUrl }: Params) {
  const router = new Router(
    [
      { path: '/', name: 'home' },
      { path: '/about/:page', name: 'about' }
    ],
    { initialUrl }
  )

  const about = AboutController(router)

  return createReactiveElement(AppView, {
    router: router.view,
    about: about.view
  })
}
