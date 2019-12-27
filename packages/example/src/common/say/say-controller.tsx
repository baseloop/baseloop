import { Router } from '@baseloop/router'
import Say from './say'
import * as React from 'react'

interface Params {
  router: Router
}

export default function SayController({ router }: Params) {
  return {
    view: <Say router={router} />
  }
}
