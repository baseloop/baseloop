import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router/src'
import { map, startWith } from 'rxjs/operators'
import Say from './say'

interface Params {
  router: Router
}

export default function SayController({ router }: Params) {
  const textToSay = router.onEnter('say').pipe(
    map(state => state.pathVariables.textToSay),
    startWith('')
  )
  const color = router.onEnter('say').pipe(
    map(state => state.queryParameters.color),
    startWith('')
  )

  return {
    view: createReactiveElement(Say, {
      color,
      textToSay
    })
  }
}
