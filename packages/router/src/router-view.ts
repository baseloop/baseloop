import * as qs from './query-string'
import { Route } from './route'
import { Router } from './router'

export class RouterView {
  private router: Router
  private routes: Route[]
  private readonly route: Route | null

  public constructor(router: Router, routes: Route[], route: Route | null) {
    this.router = router
    this.routes = routes
    this.route = route
  }

  public navigate(routeName: string, pathVariables = {}, queryParameters = {}, resetScrollPosition = true): void {
    const route = this.routes.find(route => route.name === routeName)
    if (route == null) {
      return
    }
    const href = route.compile(pathVariables) + qs.compile(queryParameters)
    if (href === window.location.pathname + window.location.search) {
      return
    }
    if (resetScrollPosition) {
      window.scrollTo(0, 0)
    }
    history.pushState({}, document.title, href)
    this.router.url.next(href)
  }

  public buildUrl(routeName: string, pathVariables = {}, queryParameters = {}) {
    const route = this.routes.find(route => route.name === routeName)
    if (route == null) {
      return ''
    }
    return route.compile(pathVariables) + qs.compile(queryParameters)
  }

  public match(routeName?: string | null): boolean {
    if (this.route == null) {
      return routeName == null
    } else {
      return this.route.name === routeName
    }
  }

  public matchPartial(routeName: string): boolean {
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
