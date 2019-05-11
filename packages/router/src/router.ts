import * as qs from './query-string'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { filter, map, sample } from 'rxjs/operators'
import flatRoutes from './flat-routes'
import { Route } from './route'
import { isBrowser } from '@baseloop/core'

export interface RouteDefinition {
  name: string,
  path: string,
  defaults?: Object,
  children?: RouteDefinition[]
}

export interface RouterSettings {
  initialUrl: string
}

interface RouteState {
  route: Route,
  pathVariables: Object,
  queryParameters: Object
}

export interface CurrentRoute {
  pathVariables: Record<string, any>,
  queryParameters: Record<string, any>
}

export class Router {
  url: BehaviorSubject<string>
  view: Observable<any>

  private routeState: Observable<RouteState | null>

  constructor (routeDefinitions: RouteDefinition[], settings: RouterSettings) {
    if ((settings == null || settings.initialUrl == null) && !isBrowser) {
      throw 'You need to specify the initial url for the router when not in browser environment'
    }

    const initialRoutes = flatRoutes(routeDefinitions).map(def => new Route(def))
    const routes = new BehaviorSubject(initialRoutes)
    this.url = new BehaviorSubject(settings.initialUrl || (window.location.pathname + window.location.search))
    this.routeState = combineLatest(routes, this.url).pipe(map(parseUrlIntoRouteState))
    const route = this.routeState.pipe(map(state => state == null ? null : state.route))

    if (isBrowser) {
      window.addEventListener('popstate', e => {
        this.url.next(window.location.pathname)
        e.preventDefault()
      })
    }

    this.view = combineLatest(routes, route).pipe(map(([routes, route]) => new RouterView(this, routes, route)))
  }

  onEnter (routeName: string): Observable<CurrentRoute> {
    return this.routeState.pipe(
      sample(this.url),
      filter(s => s != null && s.route.name === routeName),
      map(s => ({pathVariables: s == null ? {} : s.pathVariables || {}, queryParameters: s == null ? {} : s.queryParameters || {}}))
    )
  }

  onLeave (routeName: string) {
    throw 'Not implemented'
  }
}

export class RouterView {
  private router: Router
  private routes: Route[]
  private route: Route | null

  constructor (router: Router, routes: Route[], route: Route | null) {
    this.router = router
    this.routes = routes
    this.route = route
  }

  navigate (routeName: string, pathVariables = {}, queryParameters = {}): void {
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

  buildUrl (routeName: string, pathVariables = {}, queryParameters = {}) {
    const route = this.routes.find(route => route.name === routeName)
    if (route == null) {
      return ''
    }
    return route.compile(pathVariables) + qs.compile(queryParameters)
  }

  match (routeName?: string | null): boolean {
    if (this.route == null) {
      return routeName == null
    } else {
      return this.route.name === routeName
    }
  }

  matchPartial (routeName: string): boolean {
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

function parseUrlIntoRouteState ([routes, currentUrl]: [Route[], string]): RouteState | null {
  if (currentUrl == null) {
    return null
  }
  const [currentPathname, currentQueryParameters] = currentUrl.split('?')
  const route = routes.find(route => route.match(currentPathname))
  if (route) {
    const pathVariables = route.parse(currentPathname)
    const queryParameters = qs.parse(currentQueryParameters)
    return {route, pathVariables, queryParameters}
  }
  return null
}
