import { createReactiveElement } from '@baseloop/core'
import { map, startWith } from 'rxjs/operators'
import AboutView from './about-view'

export default function AboutController (router) {
  const page = router.onEnter('about').pipe(map(v => v.pathVariables.page), startWith(null))

  return {
    view: createReactiveElement(AboutView, {
      router: router.view,
      page
    })
  }
}
