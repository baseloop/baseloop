import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import ProfileController from '../profile/profile-controller'
import SayController from '../say/say-controller'
import AppView from './app-view'
import SearchController from '../search/search-controller'

interface Params {
  initialUrl: string
}

export default function AppController({ initialUrl }: Params) {
  const router = new Router(
    [
      { path: '/', name: 'home' },
      { path: '/profile', name: 'profile' },
      { path: '/search', name: 'search' },
      { path: '/mortgage-applications', name: 'mortgage-applications' },
      { path: '/mortgage-application/:id', name: 'mortgage-application' },
      { path: '/routes', name: 'routes' },
      { path: '/say/:textToSay', name: 'say' }
    ],
    { initialUrl }
  )

  const profileController = ProfileController()
  const searchController = SearchController()
  const sayController = SayController({ router })

  return createReactiveElement(AppView, {
    profile: profileController.view,
    search: searchController.view,
    router: router.view,
    say: sayController.view
  })
}
