import { createReactiveElement, Router } from '@baseloop/core'
import ProfileController from '../profile/profile-controller'
import SayController from '../say/say-controller'
import AppView from './app-view'

export default function AppController () {
  const router = Router([
    {path: '/', page: 'home'},
    {path: '/profile', page: 'profile'},
    {path: '/mortgage-applications', page: 'mortgage-applications'},
    {path: '/mortgage-application/:id', page: 'mortgage-application'},
    {path: '/routes', page: 'routes'},
    {path: '/say/:textToSay', page: 'say'},
  ])

  const profileController = ProfileController()
  const sayController = SayController({router})

  return createReactiveElement(AppView, {
    router: router.view,
    say: sayController.view,
    profile: profileController.view,
  })
}
