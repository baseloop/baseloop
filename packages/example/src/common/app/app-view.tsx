import { Link } from '@baseloop/router'
import { RouterView } from '@baseloop/router'
import { Flex } from '@baseloop/ui'
import React from 'react'
import styled from 'styled-components'
import FormatDate from './format-date'
import GlobalStyle from './global-style'

const date = new Date()

export interface Props {
  router: RouterView
  profile: React.ReactElement
  search: React.ReactElement
  say: React.ReactElement
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default function AppView({ profile, search, say, router }: Props) {
  return (
    <Container>
      <Flex>
        <GlobalStyle />

        <nav>
          <p>Navigation goes here</p>
          <Link router={router} routeName="search">
            Search
          </Link>
          <Link router={router} routeName="profile">
            My profile
          </Link>
          <Link router={router} routeName="mortgage-applications">
            Mortgage applications
          </Link>
          <Link router={router} routeName="routes">
            Routes
          </Link>
          <Link
            router={router}
            routeName="say"
            pathVariables={{ textToSay: 'default text' }}
            queryParameters={{ color: 'red' }}
          >
            Say
          </Link>
        </nav>

        <Flex direction="column" flex="1">
          <main>
            {router.match('home') && (
              <div>
                <span>
                  This page was loaded <FormatDate date={date} />. Yay.
                </span>
              </div>
            )}
            {router.match('profile') && profile}
            {router.match('search') && search}
            {router.match('say') && say}
            {router.match(null) && (
              <div>
                <h1>Page not found</h1>
                <p>The page you were looking for could not be found.</p>
              </div>
            )}
          </main>

          <footer>Footer</footer>
        </Flex>
      </Flex>
    </Container>
  )
}
