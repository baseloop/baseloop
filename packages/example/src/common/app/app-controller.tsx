import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ChildrenController } from '../children/children-controller'
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
      { path: '/say/:textToSay', name: 'say' },
      { path: '/children', name: 'children' },
      { path: '/children/child', name: 'children-child' },
      { path: '/children/child-2', name: 'children-child-2' }
    ],
    { initialUrl }
  )

  const profileController = ProfileController()
  const searchController = SearchController()
  const sayController = SayController({ router })
  const childrenController = ChildrenController({ router })

  return router.url.pipe(
    switchMap(() => {
      return createReactiveElement(AppView, {
        router: of(router),
        profile: profileController.view,
        say: sayController.view,
        search: searchController.view,
        children: childrenController.view
      })
    })
  )
}
