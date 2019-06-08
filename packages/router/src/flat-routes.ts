import { RouteDefinition } from './router'

export default function flatRoutes(routes: RouteDefinition[], parentRoute?: RouteDefinition): RouteDefinition[] {
  const rs: RouteDefinition[] = []
  routes.forEach(route => {
    const newRoute = {
      defaults: route.defaults,
      name: parentRoute == null ? route.name : parentRoute.name + '.' + route.name,
      path: parentRoute == null ? route.path : parentRoute.path + route.path
    }
    rs.push(newRoute)

    if (route.children != null) {
      rs.push(...flatRoutes(route.children, newRoute))
    }
  })
  return rs
}
