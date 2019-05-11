import React from 'react'
import GlobalStyle from '../styles/global-style'
import { NAV_LINK_HOVER, NAV_BACK, NAV_FRONT, FOOTER_BACKGROUND, FOOTER_FOREGROUND } from '../styles/colors'
import styled from 'styled-components'
import Home from '../home/home-view'
import Icon from '../component/icon'
import { Flex, PositionFluid } from '@baseloop/ui'
import { Link } from '@baseloop/router'
import { RouterView } from '@baseloop/router'

const navHeight = '4rem'
const footerHeight = '4rem'

const Nav = styled.div`
  width: 100%;
  background: ${NAV_BACK};
  box-sizing: border-box;
  padding: 0 1rem;
  border-bottom: solid 1px #0e6dbd;
  height: ${navHeight};
  
  > div {
    height: 100%;
  }
  
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

const NavItems = styled(Flex)`
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) { 
    justify-content: center;
  
    > h1 {
      display: none;
    }
  }
`

const Content = styled.div`
  margin-top: ${navHeight};
  min-height: calc(100vh - ${navHeight} - ${footerHeight});
`

const Footer = styled.div`
  height: ${footerHeight};
  background: ${FOOTER_BACKGROUND};
  color: ${FOOTER_FOREGROUND};
  padding: 0 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  router: RouterView,
  docs: any
}

export default class AppView extends React.PureComponent<Props> {
  render () {
    const {router, docs} = this.props

    return (
      <Flex direction="column">
        <GlobalStyle />

        <div>
          <PositionFluid>
            <Nav>
              <Flex justifyContent="center">
                <NavItems justifyContent="space-between">
                  <h1><Link router={router} routeName="home">Baseloop</Link></h1>
                  <div>
                    <Link router={router} routeName="home"><Icon id="s-home" /> Home</Link>
                    <Link router={router} routeName="docs"><Icon id="s-docs" /> Documentation</Link>
                    <a href="https://github.com/baseloop/baseloop"><Icon id="b-github" /> GitHub</a>
                  </div>
                </NavItems>
              </Flex>
            </Nav>
          </PositionFluid>
          
          <Content>
            <Flex justifyContent="center" flex="1">
              <main>
                {router.match('home') && <Home />}
                {router.matchPartial('docs') && docs}
                {router.match() && <div>Not found!</div>}
              </main>
            </Flex>
          </Content>

          <Footer>Copyright &copy; 2019 Baseloop</Footer>
        </div>
      </Flex>
    )
  }
}

