import { createReactiveElement, isBrowser } from '@baseloop/core'
import AppView from './app-view'
import DocsController from '../docs/docs-controller'
import { Router } from '@baseloop/router'

interface Params {
  initialUrl: string
}

export default function AppController({ initialUrl }: Params) {
  const router = new Router(
    [{ path: '/', name: 'home' }, { path: '/docs/:page?', name: 'docs', defaults: { page: 'motivation' } }],
    { initialUrl }
  )

  router.url.subscribe(() => {
    if (isBrowser) {
      const ga = (window as any)['ga']
      if (ga != null) {
        ga('send', 'pageview', window.location.pathname)
      }
    }
  })

  const docs = DocsController(router)

  return createReactiveElement(AppView, {
    router: router.view,
    docs: docs.view
  })
}
