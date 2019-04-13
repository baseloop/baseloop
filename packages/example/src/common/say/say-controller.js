import { createReactiveElement } from '@baseloop/core'
import { startWith, map } from 'rxjs/operators'
import Say from './say'

export default function SayController ({router}) {
  const textToSay = router.onEnter('say').pipe(map(state => state.pathVariables.textToSay), startWith(''))
  const color = router.onEnter('say').pipe(map(state => state.queryParameters.color), startWith(''))

  return {
    view: createReactiveElement(Say, {
      textToSay,
      color
    })
  }
}
