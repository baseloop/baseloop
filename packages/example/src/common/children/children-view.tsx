import { Link, Router } from '@baseloop/router'
import * as React from 'react'
import { ChildView } from './child-view'
import { ChildView2 } from './child-view-2'

export interface Props {
  router: Router
}

export function ChildrenView({ router }: Props) {
  return (
    <>
      <p>You are on children page. Navigate to child pages.</p>
      <div>
        <Link router={router} routeName="children-child">
          Go to child page 1
        </Link>
      </div>
      <div>
        <Link router={router} routeName="children-child-2">
          Go to child page 2
        </Link>
      </div>
      <div>
        {router.match('children-child') && <ChildView />}
        {router.match('children-child-2') && <ChildView2 />}
      </div>
    </>
  )
}
