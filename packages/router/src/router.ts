import { Action, isBrowser } from '@baseloop/core'
import { combineLatest, Observable } from 'rxjs'
import { filter, map, sample } from 'rxjs/operators'
import flatRoutes from './flat-routes'
import * as qs from './query-string'
import { Route } from './route'
import { Atom } from '@baseloop/atom'

export interface RouteDefinition {
  name: string
  path: string
  defaults?: object
  children?: RouteDefinition[]
}

export interface RouterSettings {
  initialUrl: string
}

interface RouteState {
  route: Route
  pathVariables: object
  queryParameters: object
}

export interface CurrentRoute {
  pathVariables: Record<string, any>
  queryParameters: Record<string, any>
}

export class Router {
  private navigationAction: Action = new Action()

  /**
   * The current URL. This is static on the server-side.
   */
  public url: Atom<string>

  /**
   * The routes that are registered.
   */
  public routes: Atom<Route[]>

  /**
   * After navigation, this represents the previous URL. In the beginning its the same as `url`.
   */
  public previousUrl: Atom<string>

  public routeState: Atom<RouteState | null>

  public constructor(routeDefinitions: RouteDefinition[], settings: RouterSettings) {
    if ((settings == null || settings.initialUrl == null) && !isBrowser) {
      throw new Error('You need to specify the initial url for the router when not in browser environment')
    }

    const initialRoutes = flatRoutes(routeDefinitions).map(def => new Route(def))
    this.routes = new Atom(initialRoutes)
    const url = settings!.initialUrl || window.location.pathname + window.location.search
    this.url = new Atom(url)
    this.previousUrl = new Atom(url)
    this.routeState = new Atom(parseUrlIntoRouteState([initialRoutes, url]))
    combineLatest([this.routes, this.url]).subscribe(data => {
      this.routeState.set(parseUrlIntoRouteState(data))
    })

    if (isBrowser) {
      window.addEventListener('popstate', e => {
        this.url.set(window.location.pathname + window.location.search)
        this.navigationAction.trigger()
        e.preventDefault()
      })
    }
  }

  private _on(triggerBy: Observable<any>, ...routeNames: string[]): Observable<CurrentRoute> {
    return this.routeState.pipe(
      sample(triggerBy),
      filter(s => s != null && routeNames.includes(s.route.name)),
      map(s => ({
        pathVariables: s == null ? {} : s.pathVariables || {},
        queryParameters: s == null ? {} : s.queryParameters || {}
      }))
    )
  }

  /**
   * Navigates to the given route with the given parameters. Does not do anything on server-side.
   */
  public navigate(routeName: string, pathVariables = {}, queryParameters = {}, resetScrollPosition = true): void {
    if (isBrowser) {
      const route = this.routes.get().find(route => route.name === routeName)
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
      this.previousUrl.set(window.location.pathname + window.location.search)
      history.pushState({}, document.title, href)
      this.url.set(href)
      this.navigationAction.trigger()
    }
  }

  public buildUrl(routeName: string, pathVariables = {}, queryParameters = {}) {
    const route = this.routes.get().find(route => route.name === routeName)
    if (route == null) {
      return ''
    }
    return route.compile(pathVariables) + qs.compile(queryParameters)
  }

  /**
   * Performs exact matching against the given route.
   *
   * Trailing paths produce negative matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: no match
   */
  public matchExact(routeName?: string | null): boolean {
    const currentRoute = this.routeState.get()
    const route = currentRoute == null ? null : currentRoute.route
    if (route == null) {
      return routeName == null
    } else {
      return route.name === routeName
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
  public match(routeName: string): boolean {
    const currentRoute = this.routeState.get()
    const route = currentRoute == null ? null : currentRoute.route
    if (route == null) {
      return false
    }
    const routeParts = route.name.split('.')
    const matchParts = routeName.split('.')
    for (let i = 0; i < matchParts.length; i++) {
      if (matchParts[i] !== routeParts[i]) {
        return false
      }
    }
    return true
  }

  /**
   * Triggers whenever we are on a route with the given name. This also triggers once on initial page load (client-side).
   */
  public on(...routeNames: string[]): Observable<CurrentRoute> {
    return this._on(this.url, ...routeNames)
  }

  /**
   * Triggers whenever we navigate to a route with the given name. The only difference compared to `on()` is that this
   * does not trigger on initial page load (client-side), because that is not considered runtime navigation.
   */
  public onEnter(...routeNames: string[]): Observable<CurrentRoute> {
    return this._on(this.navigationAction, ...routeNames)
  }
}

function parseUrlIntoRouteState([routes, currentUrl]: [Route[], string]): RouteState | null {
  if (currentUrl == null) {
    return null
  }
  const [currentPathname, currentQueryParameters] = currentUrl.split('?')
  const route = routes.find(route => route.match(currentPathname))
  if (route) {
    const pathVariables = route.parse(currentPathname)
    const queryParameters = qs.parse(currentQueryParameters)
    return { route, pathVariables, queryParameters }
  }
  return null
}
