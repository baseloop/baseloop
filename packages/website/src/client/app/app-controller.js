import { createReactiveElement } from '@baseloop/core'
import AppView from './app-view'
import DocsController from '../docs/docs-controller'
import { Router } from '@baseloop/router'

export default function AppController () {
  const router = Router([
    {path: '/', name: 'home'},
    {
      path: '/docs', name: 'docs', children: [
        {path: '/foo', name: 'foo'},
        {path: '/bar', name: 'bar'},
        {path: '/:page', name: 'page'},
      ],
    },
  ])

  const docs = DocsController(router)

  return createReactiveElement(AppView, {
    router: router.view,
    docs: docs.view,
  })
}
