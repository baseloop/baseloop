import React from 'react'
import { Link, RouterView } from '@baseloop/router'
import Home from '../home/home-view'

interface Props {
  about: React.ReactElement
  router: RouterView
}

export default function AppView({ router, about }: Props) {
  return (
    <>
      <h1>Example project</h1>
      <nav>
        <Link router={router} routeName="home">Home</Link>
        <Link router={router} routeName="about" pathVariables={{ page: 'foo' }}>About</Link>
        <a href="https://github.com/baseloop/baseloop" target="_blank">Open GitHub</a>
      </nav>
      <main>
        {router.match('home') && <Home />}
        {router.matchPartial('about') && about}
        {router.match() && <div>Page not found!</div>}
      </main>
    </>
  )
}

