export default function flatRoutes (routes, parentRoute) {
  const rs = []
  routes.forEach(route => {
    const newRoute = {
      path: parentRoute == null ? route.path : (parentRoute.path + route.path),
      name: parentRoute == null ? route.name : (parentRoute.name + '.' + route.name),
      defaults: route.defaults
    }
    rs.push(newRoute)

    if (route.children != null) {
      rs.push(...flatRoutes(route.children, newRoute))
    }
  })
  return rs
}
