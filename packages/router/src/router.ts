import { Action, isBrowser } from '@baseloop/core'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { filter, first, map, sample } from 'rxjs/operators'
import flatRoutes from './flat-routes'
import * as qs from './query-string'
import { Route } from './route'
import { RouterView } from './router-view'

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
  public url: BehaviorSubject<string>
  public previousUrl: BehaviorSubject<string>
  public view: Observable<RouterView>

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

  public on(routeName: string): Observable<CurrentRoute> {
    return this._on(routeName, this.url)
  }

  public onEnter(routeName: string): Observable<CurrentRoute> {
    return this._on(routeName, this.navigationAction)
  }

  public onLeave() {
    throw new Error('Not implemented')
  }

  public navigate(routeName: string, pathVariables = {}, queryParameters = {}, resetScrollPosition = true): void {
    this.view.pipe(first()).subscribe(r => {
      r.navigate(routeName, pathVariables, queryParameters, resetScrollPosition)
    })
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
