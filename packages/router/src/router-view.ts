import * as qs from './query-string'
import { Route } from './route'
import { Router } from './router'
import { Action } from '@baseloop/core'

export class RouterView {
  private router: Router
  private routes: Route[]
  private readonly route: Route | null
  private navigationAction: Action

  public constructor(router: Router, routes: Route[], route: Route | null, navigationAction: Action) {
    this.router = router
    this.routes = routes
    this.route = route
    this.navigationAction = navigationAction
  }

  /**
   * Navigates to the given route with the given parameters. Does not do anything on server-side.
   */
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
    this.router.previousUrl.next(window.location.pathname + window.location.search)
    history.pushState({}, document.title, href)
    this.router.url.next(href)
    this.navigationAction.trigger()
  }

  public buildUrl(routeName: string, pathVariables = {}, queryParameters = {}) {
    const route = this.routes.find(route => route.name === routeName)
    if (route == null) {
      return ''
    }
    return route.compile(pathVariables) + qs.compile(queryParameters)
  }

  /**
   * Performs direct matching against the given route.
   *
   * Trailing paths produce negative matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: no match
   */
  public match(routeName?: string | null): boolean {
    if (this.route == null) {
      return routeName == null
    } else {
      return this.route.name === routeName
    }
  }

  /**
   * Performs partial matching against the given route.
   *
   * Trailing paths produce positive matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: matches
   */
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
