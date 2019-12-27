import { Router } from '@baseloop/router'
import { useAtom } from './use-atom'

export function useRouter(router: Router) {
  useAtom(router.routeState)
}
