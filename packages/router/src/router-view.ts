import * as qs from './query-string'
import { Route } from './route'
import { Router } from './router'

export class RouterView {
  private router: Router
  private routes: Route[]
  private readonly route: Route | null

  constructor(router: Router, routes: Route[], route: Route | null) {
    this.router = router
    this.routes = routes
    this.route = route
  }

  navigate(routeName: string, pathVariables = {}, queryParameters = {}): void {
    const route = this.routes.find(route => route.name === routeName)
    if (route == null) {
      return
    }
    const href = route.compile(pathVariables) + qs.compile(queryParameters)
    if (href === window.location.pathname + window.location.search) {
      return
    }
    history.pushState({}, document.title, href)
    this.router.url.next(href)
  }

  buildUrl(routeName: string, pathVariables = {}, queryParameters = {}) {
    const route = this.routes.find(route => route.name === routeName)
    if (route == null) {
      return ''
    }
    return route.compile(pathVariables) + qs.compile(queryParameters)
  }

  match(routeName?: string | null): boolean {
    if (this.route == null) {
      return routeName == null
    } else {
      return this.route.name === routeName
    }
  }

  matchPartial(routeName: string): boolean {
    if (this.route == null) {
      return false
    }
    const routeParts = this.route.name.split('.')
    const matchParts = routeName.split('.')
    for (let i = 0; i < matchParts.length; i++) {
      if (matchParts[i] !== routeParts[i]) {
        return false
      }
    }
    return true
  }
}
