import { createReactiveElement } from '@baseloop/core'
import AppView from './app-view'
import DocsController from '../docs/docs-controller'
import { Router } from '@baseloop/router'

export default function AppController () {
  const router = Router([
    {path: '/', name: 'home'},
    {path: '/docs/:page?', name: 'docs', defaults: {page: 'motivation'}},
  ])

  router.url.subscribe(() => {
    if (window.ga != null) {
      window.ga('send', 'pageview', window.location.pathname)
    }
  })

  const docs = DocsController(router)

  return createReactiveElement(AppView, {
    router: router.view,
    docs: docs.view,
  })
}
