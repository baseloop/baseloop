import React from 'react'
import GlobalStyle from './global-style'
import Flex from '../layout/flex'
import { Link } from '@baseloop/router'
import FormatDate from './format-date'

const date = new Date

export default class AppView extends React.PureComponent {
  render () {
    const {router, profile, say} = this.props

    return (
      <Flex fullSize>
        <GlobalStyle/>

        <nav>
          <p>Navigation goes here</p>
          <Link router={router} routeName="profile">My profile</Link>
          <Link router={router} routeName="mortgage-applications">Mortgage applications</Link>
          <Link router={router} routeName="routes">Routes</Link>
          <Link router={router} routeName="say" pathVariables={{textToSay: 'default text'}} queryParameters={{color: 'red'}}>Sayprofile</Link>
        </nav>

        <Flex direction="column" flex="1">
          <main>
            {router.match('home') && <div>
              <span>This page was loaded <FormatDate date={date} />. Yay.</span>
            </div>}
            {router.match('profile') && profile}
            {router.match('say') && say}
            {router.match() && <div><h1>Page not found</h1><p>The page you were looking for could not be found.</p></div>}
          </main>

          <footer>Footer</footer>
        </Flex>
      </Flex>
    )
  }
}
