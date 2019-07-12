import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import { map, startWith } from 'rxjs/operators'
import AboutView from './about-view'

export default function AboutController(router: Router) {
  const page = router.onEnter('about').pipe(map(v => v.pathVariables.page), startWith(null))

  return {
    view: createReactiveElement(AboutView, {
      router: router.view,
      page
    })
  }
}
