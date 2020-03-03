import { RouteDefinition } from './router'

export default function flatRoutes(routes: RouteDefinition[], parentRoute?: RouteDefinition): RouteDefinition[] {
  const rs: RouteDefinition[] = []
  routes.forEach(route => {
    const newRoute = {
      defaults: route.defaults,
      name: parentRoute == null ? route.name : parentRoute.name + '.' + route.name,
      path: parentRoute == null ? route.path : parentRoute.path + route.path,
      hostname: parentRoute == null ? route.hostname : parentRoute.hostname
    }
    rs.push(newRoute)
  })
  return rs
}
