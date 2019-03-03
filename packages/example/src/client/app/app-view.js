import React from 'react'
import GlobalStyle from './global-style'
import Flex from '../layout/flex'

export default class AppView extends React.PureComponent {
  render () {
    const {router, profile, say} = this.props

    return (
      <Flex fullSize>
        <GlobalStyle/>

        <nav>
          <p>Navigation goes here</p>
          <a href={router.createUrl('profile')} onClick={router.moveTo}>My profile</a>
          <a href={router.createUrl('mortgage-applications')} onClick={router.moveTo}>Mortgage applications</a>
          <a href={router.createUrl('routes')} onClick={router.moveTo}>Routes</a>
          <a href={router.createUrl('say', {textToSay: 'default text'}, {color: 'red'})} onClick={router.moveTo}>Say</a>
        </nav>

        <Flex direction="column" flex="1">
          <main>
            {router.page === 'profile' && profile}
            {router.page === 'say' && say}
            {router.page === 'not-found' && <div><h1>Page not found</h1><p>The page you were looking for could not be found.</p></div>}
          </main>

          <footer>Footer</footer>
        </Flex>
      </Flex>
    )
  }
}
