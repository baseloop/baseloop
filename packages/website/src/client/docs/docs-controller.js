import { createReactiveElement } from '@baseloop/core'
import DocsView from './docs-view'

export default function DocsController (router) {

  return {
    view: createReactiveElement(DocsView, {
      router: router.view,
    }),
  }
}
