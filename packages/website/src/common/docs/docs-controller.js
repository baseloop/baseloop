import { createReactiveElement } from '@baseloop/core'
import DocsView from './docs-view'
import { map, startWith } from 'rxjs/operators'

export default function DocsController (router) {
  const page = router.onEnter('docs').pipe(map(v => v.pathVariables.page), startWith(null))

  return {
    view: createReactiveElement(DocsView, {
      page,
      router: router.view,
    }),
  }
}
