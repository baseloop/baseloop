import * as qs from './query-string'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, sample } from 'rxjs/operators'
import flatRoutes from './flat-routes'
import { Route } from './route'

export function Router (routeDefinitions) {
  const initialRoutes = flatRoutes(routeDefinitions).map(Route)
  const routes = new BehaviorSubject(initialRoutes)
  const url = new BehaviorSubject(window.location.pathname + window.location.search)
  const routeState = combineLatest(routes, url, parseUrlIntoRouteState)
  const route = routeState.pipe(map(state => state.route))

  window.addEventListener('popstate', e => {
    url.next(window.location.pathname)
    e.preventDefault()
  })

  const onEnter = routeName => {
    return routeState.pipe(
      sample(url),
      filter(s => s.route != null && s.route.name === routeName),
      map(s => ({pathVariables: s.pathVariables, queryParameters: s.queryParameters}))
    )
  }

  const onLeave = () => {}

  return {
    url,
    onEnter,
    onLeave,
    view: combineLatest(routes, route, createView),
  }

  function createView (routes, route) {
    function navigate (routeName, pathVariables = {}, queryParameters) {
      const route = routes.find(route => route.name === routeName)
      if (route == null) {
        return
      }
      const href = route.compile(pathVariables) + qs.compile(queryParameters)
      if (href === window.location.pathname + window.location.search) {
        return
      }
      history.pushState({}, window.title, href)
      url.next(href)
    }

    function buildUrl (routeName, pathVariables = {}, queryParameters) {
      const route = routes.find(route => route.name === routeName)
      if (route == null) {
        return ''
      }
      return route.compile(pathVariables) + qs.compile(queryParameters)
    }

    function match (routeName) {
      if (route == null) {
        return routeName == null
      } else {
        return route.name === routeName
      }
    }

    function matchPartial (routeName) {
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

    return {buildUrl, navigate, match, matchPartial}
  }
}

function parseUrlIntoRouteState (routes, currentUrl) {
  if (currentUrl == null) {
    return {}
  }
  const [currentPathname, currentQueryParameters] = currentUrl.split('?')
  const route = routes.find(route => route.match(currentPathname))
  if (route) {
    const pathVariables = route.parse(currentPathname)
    const queryParameters = qs.parse(currentQueryParameters)
    return {route, pathVariables, queryParameters}
  }
  return {}
}
