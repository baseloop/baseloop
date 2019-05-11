import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import ProfileController from '../profile/profile-controller'
import SayController from '../say/say-controller'
import AppView from './app-view'

interface Params {
  initialUrl: string
}

export default function AppController ({initialUrl}: Params) {
  const router = new Router([
    {path: '/', name: 'home'},
    {path: '/profile', name: 'profile'},
    {path: '/mortgage-applications', name: 'mortgage-applications'},
    {path: '/mortgage-application/:id', name: 'mortgage-application'},
    {path: '/routes', name: 'routes'},
    {path: '/say/:textToSay', name: 'say'},
  ], {initialUrl})

  const profileController = ProfileController()
  const sayController = SayController({router})

  return createReactiveElement(AppView, {
    router: router.view,
    say: sayController.view,
    profile: profileController.view,
  })
}
