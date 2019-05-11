import React from 'react'
import GlobalStyle from './global-style'
import { Flex } from '@baseloop/ui'
import { Link } from '@baseloop/router'
import FormatDate from './format-date'
import { RouterView } from '@baseloop/router'
import styled from 'styled-components'

const date = new Date

interface Props {
  router: RouterView,
  profile: any,
  say: any
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default class AppView extends React.PureComponent<Props> {
  render () {
    const {router, profile, say} = this.props

    return (
      <Container>
        <Flex>
          <GlobalStyle/>

          <nav>
            <p>Navigation goes here</p>
            <Link router={router} routeName="profile">My profile</Link>
            <Link router={router} routeName="mortgage-applications">Mortgage applications</Link>
            <Link router={router} routeName="routes">Routes</Link>
            <Link router={router} routeName="say" pathVariables={{textToSay: 'default text'}} queryParameters={{color: 'red'}}>Say</Link>
          </nav>

          <Flex direction="column" flex="1">
            <main>
              {router.match('home') && <div>
                <span>This page was loaded <FormatDate date={date} />. Yay.</span>
              </div>}
              {router.match('profile') && profile}
              {router.match('say') && say}
              {router.match(null) && <div><h1>Page not found</h1><p>The page you were looking for could not be found.</p></div>}
            </main>

            <footer>Footer</footer>
          </Flex>
        </Flex>
      </Container>
    )
  }
}
