import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import { of } from 'rxjs'
import { map } from 'rxjs/operators'
import Say from './say'

interface Params {
  router: Router
}

export default function SayController({ router }: Params) {
  const routeState = router.url.pipe(map(() => router.match('say')))

  return {
    view: createReactiveElement(Say, { router: of(router), routeState })
  }
}
