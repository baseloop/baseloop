import React from 'react'
import GlobalStyle from '../styles/global-style'
import { NAV_LINK_HOVER, NAV_BACK, NAV_FRONT } from '../styles/colors'
import { css } from 'styled-components'
import { Flex, Link } from '@baseloop/ui'
import Home from '../home/home-view'
import Icon from '../component/icon'

const navigationStyle = css`
  width: 100%;
  background: ${NAV_BACK};
  box-sizing: border-box;
  padding: 1rem;
  border-bottom: solid 1px #0e6dbd;
  z-index: 1;
  
  h1 {
    font-family: "Merienda", cursive;
  }
  
  a {
    margin: 0.5rem 1rem;
    color: ${NAV_FRONT};
    text-decoration: none;
    white-space: nowrap;
    
    :hover {
      color: ${NAV_LINK_HOVER};
    }  
  }
`

const appStyle = css`
  height: 100vh;
`

const navItemsStyle = css`
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) { 
    justify-content: center;
  
    > h1 {
      display: none;
    }
  }
`

const mainContentStyle = css`
  overflow-y: overlay;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  
  > div {
    flex: 1;
    
    > div {
      height: 100%;
    }
  }
`

export default class AppView extends React.PureComponent {
  render () {
    const {router, docs} = this.props

    return (
      <Flex direction="column" css={appStyle}>
        <GlobalStyle />

        <div css={mainContentStyle}>
          <nav css={navigationStyle}>
            <Flex justifyContent="center">
              <Flex justifyContent="space-between" css={navItemsStyle}>
                <h1><Link router={router} routeName="home">Baseloop</Link></h1>
                <div>
                  <Link router={router} routeName="home"><Icon id="s-home" /> Home</Link>
                  <Link router={router} routeName="docs"><Icon id="s-docs" /> Documentation</Link>
                  <a href="https://github.com/baseloop/baseloop"><Icon id="b-github" /> GitHub</a>
                </div>
              </Flex>
            </Flex>
          </nav>
          
          <div>
            <Flex justifyContent="center" flex="1">
              <main>
                {router.match('home') && <Home />}
                {router.matchPartial('docs') && docs}
                {router.match() && <div>Not found!</div>}
              </main>
            </Flex>
          </div>

          <footer>Copyright &copy; 2019 Baseloop</footer>
        </div>
      </Flex>
    )
  }
}

