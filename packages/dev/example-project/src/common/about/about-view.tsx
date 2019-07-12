import React from 'react'
import { Link, RouterView } from '@baseloop/router'

interface Props {
  page: string,
  router: RouterView
}

export default function AboutView({ page, router }: Props) {
  return (
    <>
      <h2>About page</h2>
      <p>Welcome to the about page.</p>
      <p>Current sub-page is: {page}</p>
      <div>
        <Link router={router} routeName="about" pathVariables={{ page: 'foo' }}>Go to sub-page /foo</Link>
      </div>
      <div>
        <Link router={router} routeName="about" pathVariables={{ page: 'bar' }}>Go to sub-page /bar</Link>
      </div>
    </>
  )
}

