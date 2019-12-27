import { Router } from '@baseloop/router'
import { useAtom } from './use-atom'

export function useRouteState(router: Router): [string, Record<string, any>, Record<string, any>] | [null, null, null] {
  const routeState = useAtom(router.routeState)
  if (routeState) {
    return [routeState.route.name, routeState.pathVariables, routeState.queryParameters]
  } else {
    return [null, null, null]
  }
}
