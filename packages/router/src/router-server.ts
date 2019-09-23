import { RouterView } from './router-view'

export class RouterServer {
  private routerView: RouterView

  constructor(routerView: RouterView) {
    this.routerView = routerView
  }

  public buildUrlBasedOnInitialRoutes(routeName: string, pathVariables = {}, queryParameters = {}) {
    return this.routerView.buildUrl(routeName, pathVariables, queryParameters)
  }

  /**
   * Performs direct matching against the given route. This uses the initial routing definitions (RouteDefinition[])
   * that were passed to the router. It does not take dynamically changed routing definitions into account.
   *
   * Trailing paths produce negative matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: no match
   */
  public matchInitialRoute(routeName?: string | null): boolean {
    return this.routerView.match(routeName)
  }

  /**
   * Performs partial matching against the given route. This uses the initial routing definitions (RouteDefinition[])
   * that were passed to the router. It does not take dynamically changed routing definitions into account.
   *
   * Trailing paths produce positive matches:
   * URL:   /foo/bar/qux
   * Route: /foo/bar
   * Result: matches
   */
  public matchInitialRoutePartial(routeName: string): boolean {
    return this.routerView.matchPartial(routeName)
  }
}
