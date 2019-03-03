import Path from 'path-parser'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, sample } from 'rxjs/operators'
import { parseQueryParameters, createQueryParameterString } from './util/url'

function parseUrl (routes, currentUrl) {
  const [currentPathname, currentQueryParameters] = currentUrl.split('?')
  const matchedRoute = routes.find(route => new Path(route.path).test(currentPathname))
  if (matchedRoute) {
    const pathVariables = new Path(matchedRoute.path).test(currentPathname)
    const queryParameters = parseQueryParameters(currentQueryParameters)
    return {page: matchedRoute.page, pathVariables, queryParameters}
  }
  return {page: 'not-found'}
}

export default function Router (initialRoutes) {
  const routes = new BehaviorSubject(initialRoutes)
  const url = new BehaviorSubject(window.location.pathname + window.location.search)
  const currentPageState = combineLatest(routes, url, parseUrl)
  const page = currentPageState.pipe(map(s => s.page))

  const moveTo = e => {
    const href = e.target.getAttribute('href')
    history.pushState({}, window.title, href)
    e.preventDefault()
    url.next(href)
  }

  const switchTo = e => {
    const href = e.target.getAttribute('href')
    history.replaceState({}, window.title, href)
    e.preventDefault()
    url.next(href)
  }

  const createUrlFor = routes => (page, pathVariables, queryParameters) => {
    const route = routes.find(route => route.page === page)
    if (route == null) {
      throw 'Unexpected route page: ' + page
    }
    const path = new Path(route.path)
    return path.build(pathVariables) + createQueryParameterString(queryParameters)
  }

  window.addEventListener('popstate', e => {
    url.next(window.location.pathname)
    e.preventDefault()
  })

  const onEnter = wantedPage => {
    return currentPageState.pipe(
      sample(url),
      filter(s => s.page === wantedPage)
    )
  }

  const onLeave = () => {}

  return {
    onEnter,
    onLeave,
    view: {
      createUrl: routes.pipe(map(createUrlFor)),
      moveTo,
      switchTo,
      page,
    },
  }
}
