import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import { of } from 'rxjs'
import { ChildrenView } from './children-view'

export interface Params {
  router: Router
}

export function ChildrenController({ router }: Params) {
  return {
    view: createReactiveElement(ChildrenView, {
      router: of(router)
    })
  }
}
