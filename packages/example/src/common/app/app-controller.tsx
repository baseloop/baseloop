import { Router } from '@baseloop/router'
import ProfileController from '../profile/profile-controller'
import SayController from '../say/say-controller'
import AppView from './app-view'
import SearchController from '../search/search-controller'
import * as React from 'react'

interface Params {
  initialUrl: string
}

export default function AppController({ initialUrl }: Params) {
  const router = new Router(
    [
      { path: '/', name: 'home' },
      { path: '/profile', name: 'profile' },
      { path: '/search', name: 'search', hostname: /foo\.localhost/ },
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

  return (
    <AppView router={router} profile={profileController.view} say={sayController.view} search={searchController.view} />
  )
}
