import { Atom } from '@baseloop/atom'
import { Action, isBrowser } from '@baseloop/core'
import { Observable } from 'rxjs'
import { filter, map, sample } from 'rxjs/operators'
import flatRoutes from './flat-routes'
import * as qs from './query-string'
import { Route } from './route'
import urlParse from 'url-parse'
import { ParsedUrl } from './parsed-url'

export interface RouteDefinition {
  name: string
  path: string
  defaults?: object
  hostname?: RegExp
}

export interface RouterSettings {
  initialUrl: string
}

export interface RouteState {
  route: Route
  pathVariables: Record<string, any>
  queryParameters: Record<string, any>
}

export class Router {
  private navigationAction: Action = new Action()

  /**
   * The current URL. This is static on the server-side.
   */
  public url: Atom<ParsedUrl>

  /**
   * The routes that are registered.
   */
  public routes: Atom<Route[]>

  /**
   * After navigation, this represents the previous URL. In the beginning its the same as `url`.
   */
  public previousUrl: Atom<ParsedUrl>

  public constructor(routeDefinitions: RouteDefinition[], settings: RouterSettings) {
    if ((settings == null || settings.initialUrl == null) && !isBrowser) {
      throw new Error('You need to specify the initial url for the router when not in browser environment')
    }

    const initialRoutes = flatRoutes(routeDefinitions).map(def => new Route(def))
    this.routes = new Atom(initialRoutes)
    const url = settings!.initialUrl || window.location.href
    this.url = new Atom(parseUrl(url))
    this.previousUrl = new Atom(parseUrl(url))

    if (isBrowser) {
      window.addEventListener('popstate', e => {
        this.url.set(parseUrl(window.location.href))
        this.navigationAction.trigger()
        e.preventDefault()
      })
    }
  }

  private _on(triggerBy: Observable<any>, ...routeNames: string[]): Observable<RouteState> {
    return this.url.pipe(
      sample(triggerBy),
      map<ParsedUrl, RouteState | null>(() => {
        for (const routeName of routeNames) {
          const routeState = this.match(routeName)
          if (routeState != null) {
            return routeState
          }
        }
        return null
      }),
      filter(routeState => routeState != null)
    ) as Observable<RouteState>
  }

  /**
   * Navigates to the given route with the given parameters. Does not do anything on server-side.
   */
  public navigate(routeName: string, pathVariables = {}, queryParameters = {}, resetScrollPosition = true): void {
    if (isBrowser) {
      const route = this.routes.get().find(route => route.name == routeName)
      if (route == null) {
        return
      }
      const href = this.buildUrl(routeName, pathVariables, queryParameters)
      if (href === window.location.pathname + window.location.search) {
        return
      }
      if (resetScrollPosition) {
        window.scrollTo(0, 0)
      }
      this.previousUrl.set(parseUrl(window.location.href))
      history.pushState({}, document.title, href)
      this.url.set(parseUrl(window.location.origin + href))
      this.navigationAction.trigger()
    }
  }

  public buildUrl(routeName: string, pathVariables = {}, queryParameters = {}) {
    const route: Route | undefined = this.routes.get().find(route => route.name == routeName)
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
  public matchExact(routeName?: string | null): RouteState | null {
    const { hostname, pathname, search } = this.url.get()

    const route = this.routes.get().find(route => route.name == routeName)
    if (route != null && route.matchExact(pathname, hostname)) {
      const pathVariables = route.parse(pathname)
      const queryParameters = qs.parse(search.replace(/^\?/, ''))
      return { route, pathVariables, queryParameters }
    }

    return null
  }

  /**
   * Performs partial matching against the given route.
   *
   * Trailing paths produce positive matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: matches
   */
  public match(routeName: string): RouteState | null {
    const { hostname, pathname, search } = this.url.get()

    const route = this.routes.get().find(route => route.name == routeName)
    if (route == null) {
      return null
    }

    if (route.match(pathname, hostname) && !this.matchNoRoute()) {
      const pathVariables = route.parse(pathname)
      const queryParameters = qs.parse(search.replace(/^\?/, ''))
      return { route, pathVariables, queryParameters }
    }

    return null
  }

  /**
   * Returns true if the given URL matches no route.
   */
  public matchNoRoute(): boolean {
    const { hostname, pathname } = this.url.get()

    for (const route of this.routes.get()) {
      if (route.matchExact(pathname, hostname)) {
        return false
      }
    }

    return true
  }

  /**
   * Triggers whenever we are on a route with the given name. This also triggers once on initial page load (client-side).
   */
  public on(...routeNames: string[]): Observable<RouteState> {
    return this._on(this.url, ...routeNames)
  }

  /**
   * Triggers whenever we navigate to a route with the given name. The only difference compared to `on()` is that this
   * does not trigger on initial page load (client-side), because that is not considered runtime navigation.
   */
  public onEnter(...routeNames: string[]): Observable<RouteState> {
    return this._on((this.navigationAction as unknown) as Observable<any>, ...routeNames)
  }
}

function parseUrl(url: string): ParsedUrl {
  const obj = urlParse(url)
  return {
    ...obj,
    search: (obj.query as unknown) as string
  }
}
