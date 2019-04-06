import { createReactiveElement, isBrowser } from '@baseloop/core'
import AppView from './app-view'
import DocsController from '../docs/docs-controller'
import { Router } from '@baseloop/router'

export default function AppController ({initialUrl}) {
  const router = Router([
    {path: '/', name: 'home'},
    {path: '/docs/:page?', name: 'docs', defaults: {page: 'motivation'}},
  ], {initialUrl})

  router.url.subscribe(() => {
    if (isBrowser && window.ga != null) {
      window.ga('send', 'pageview', window.location.pathname)
    }
  })

  const docs = DocsController(router)

  return createReactiveElement(AppView, {
    router: router.view,
    docs: docs.view,
  })
}
