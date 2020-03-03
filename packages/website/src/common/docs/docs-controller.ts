import { createReactiveElement } from '@baseloop/core'
import { of } from 'rxjs'
import DocsView from './docs-view'
import { map, startWith } from 'rxjs/operators'
import { Router } from '@baseloop/router'

export default function DocsController(router: Router) {
  const page = router.onEnter('docs').pipe(
    map(v => v.pathVariables['page']),
    startWith('motivation')
  )

  return {
    view: createReactiveElement(DocsView, {
      page,
      router: of(router)
    })
  }
}
