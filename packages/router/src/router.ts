import { Action, isBrowser } from '@baseloop/core'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { filter, first, map, sample } from 'rxjs/operators'
import flatRoutes from './flat-routes'
import * as qs from './query-string'
import { Route } from './route'
import { RouterView } from './router-view'
import { RouterServer } from './router-server'

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
  public url: BehaviorSubject<string>

  /**
   * After navigation, this represents the previous URL. In the beginning its the same as `url`.
   */
  public previousUrl: BehaviorSubject<string>

  /**
   * The RouterView class is useful inside React views, because this class is free of Observables. It lets you easily
   * build and match URLs against the latest set of routing definitions.
   */
  public view: Observable<RouterView>

  /**
   * The initial route state. This does not change. Useful in some "once in the beginning" -situations.
   */
  public initialRouteState: RouteState | null

  /**
   * The initial route. This does not change. Useful in some "once in the beginning" -situations.
   */
  public initialRoute: Route | null

  /**
   * Since route definitions are defined as Observable<RouteDefinition[]>, they can change on the fly.
   * This can be useful in certain circumstances like enabling dynamically changing routes based on user input.
   *
   * On the server side, however, you may sometimes wish to just build and match routes based on the initial routing
   * definitions that were passed to the Router constructor. For this reason, we provide a RouterServer class for
   * easily building and matching against initial route definitions.
   */
  public server: RouterServer

  private routeState: Observable<RouteState | null>

  public constructor(routeDefinitions: RouteDefinition[], settings: RouterSettings) {
    if ((settings == null || settings.initialUrl == null) && !isBrowser) {
      throw new Error('You need to specify the initial url for the router when not in browser environment')
    }

    const initialRoutes = flatRoutes(routeDefinitions).map(def => new Route(def))
    const routes = new BehaviorSubject(initialRoutes)
    const url = settings!.initialUrl || window.location.pathname + window.location.search
    this.url = new BehaviorSubject(url)
    this.previousUrl = new BehaviorSubject(url)
    this.routeState = combineLatest([routes, this.url]).pipe(map(parseUrlIntoRouteState))
    this.initialRouteState = parseUrlIntoRouteState([initialRoutes, url])
    this.initialRoute = this.initialRouteState == null ? null : this.initialRouteState.route
    this.server = new RouterServer(new RouterView(this, initialRoutes, this.initialRoute, this.navigationAction))
    const route = this.routeState.pipe(map(state => (state == null ? null : state.route)))

    if (isBrowser) {
      window.addEventListener('popstate', e => {
        this.url.next(window.location.pathname + window.location.search)
        this.navigationAction.trigger()
        e.preventDefault()
      })
    }

    this.view = combineLatest([routes, route]).pipe(
      map(([routes, route]) => new RouterView(this, routes, route, this.navigationAction))
    )
  }

  private _on(routeName: string, triggerBy: Observable<any>): Observable<CurrentRoute> {
    return this.routeState.pipe(
      sample(triggerBy),
      filter(s => s != null && s.route.name === routeName),
      map(s => ({
        pathVariables: s == null ? {} : s.pathVariables || {},
        queryParameters: s == null ? {} : s.queryParameters || {}
      }))
    )
  }

  /**
   * Triggers whenever we are on a route with the given name. This also triggers once on initial page load (client-side).
   */
  public on(routeName: string): Observable<CurrentRoute> {
    return this._on(routeName, this.url)
  }

  /**
   * Triggers whenever we navigate to a route with the given name. The only difference compared to `on()` is that this
   * does not trigger on initial page load (client-side), because that is not considered runtime navigation.
   */
  public onEnter(routeName: string): Observable<CurrentRoute> {
    return this._on(routeName, this.navigationAction)
  }

  /**
   * Navigates to the given route with the given parameters. Does not do anything on server-side.
   */
  public navigate(routeName: string, pathVariables = {}, queryParameters = {}, resetScrollPosition = true): void {
    if (isBrowser) {
      this.view.pipe(first()).subscribe(r => {
        r.navigate(routeName, pathVariables, queryParameters, resetScrollPosition)
      })
    }
  }

  public buildUrl(routeName: string, pathVariables = {}, queryParameters = {}): Observable<string> {
    return this.view.pipe(
      first(),
      map((r: RouterView) => r.buildUrl(routeName, pathVariables, queryParameters))
    )
  }

  /**
   * Performs direct matching against the given route.
   *
   * Trailing paths produce negative matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: no match
   */
  public match(routeName?: string | null): Observable<boolean> {
    return this.view.pipe(
      first(),
      map((r: RouterView) => r.match(routeName))
    )
  }

  /**
   * Performs partial matching against the given route.
   *
   * Trailing paths produce positive matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: matches
   */
  public matchPartial(routeName: string): Observable<boolean> {
    return this.view.pipe(
      first(),
      map((r: RouterView) => r.matchPartial(routeName))
    )
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
