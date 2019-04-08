import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import AppView from './app-view'
import AboutController from '../about/about-controller'

export default function AppController ({initialUrl}) {
  const router = Router([
    {path: '/', name: 'home'},
    {path: '/about/:page', name: 'about'},
  ], {initialUrl})

  const about = AboutController(router)

  return createReactiveElement(AppView, {
    router: router.view,
    about: about.view,
  })
}
