import React from 'react'
import { Link } from '@baseloop/router'
import { PositionFluid } from '@baseloop/ui'
import { css } from 'styled-components'
import installation from './pages/installation.md'
import devServer from './pages/dev-server.md'
import motivation from './pages/motivation.md'
import architecture from './pages/architecture.md'
import functionalProgramming from './pages/functional-programming.md'
import reactiveProgramming from './pages/reactive-programming.md'
import markdownStyle from './markdown-style'
import Icon from '../component/icon'
import { MOBILE_NAV_BACK, NAV_FRONT } from '../styles/colors'

const menu = [
  {
    title: 'Introduction', children: [
      {title: 'Motivation and goals', page: 'motivation'},
      {title: 'Architecture', page: 'architecture'},
      {title: 'Installation', page: 'installation'},
      {title: 'Development server', page: 'dev-server'},
    ],
  },
  {
    title: 'Guides', children: [
      {title: 'Functional programming', page: 'functional-programming'},
      {title: 'Reactive programming', page: 'reactive-programming'},
    ],
  },
]

const pageStyle = css`
  display: flex;
  justify-content: center;
  
  @media (min-width: 960px) {
    padding: 2rem;
  }
`

const containerStyle = css`
  display: flex;
  max-width: 90rem;
  
  @media (max-width: 959px) {
    flex-direction: column;
  }
`

const menuStyle = css`
  @media (max-width: 959px) {
    display: none;
  }
  
  padding-right: 1rem;
  border-right: 0.0625rem solid #ddd;
  
  h1 {
    font-size: 1.25rem;
    margin: 1rem 0;
  }
  
  ul {
    margin-bottom: 2rem;
  }
  
  li {
    margin: 0.75rem 1rem;
    white-space: nowrap;
  }
  
  a {
    text-decoration: none;
  }
`

const mobileToolbarStyle = css`
  background: ${MOBILE_NAV_BACK};
  color: ${NAV_FRONT};
  padding: 1rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);

  @media (min-width: 960px) {
    display: none;
  }
  
  > a {
    color: ${NAV_FRONT};
  }
`

const docStyle = css`
  flex: 1;
  
  @media (min-width: 960px) {
    margin-left: 2rem;
  }
  
  @media (max-width: 959px) {
    padding: 1rem;
    margin-top: 3rem;
  }
  
  ${markdownStyle}
`

const mobileMenuStyle = css`
  background: rgba(255, 255, 255, 0.95);
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 3rem;
  padding: 1rem;
  
  h1 {
    margin: 0 0 1rem 0;
  }
  
  li {
    margin: 0.5rem 0;
  }
  
  ul {
    margin: 0.5rem 0 2rem 0;
  }
`

export default class DocsView extends React.PureComponent {
  render () {
    const {page} = this.props

    const pageContent = {
      'motivation': motivation,
      'architecture': architecture,
      'installation': installation,
      'dev-server': devServer,
      'functional-programming': functionalProgramming,
      'reactive-programming': reactiveProgramming
    }

    return (
      <div css={pageStyle}>
        <div css={containerStyle}>
          <div css={menuStyle}>
            {menu.map(this.renderMenuItem)}
          </div>
          <PositionFluid>
            <div css={mobileToolbarStyle} onClick={this.handleMobileMenuClick}>
              <Icon id="s-bars" /> {getTitleByPage(page, menu)}
            </div>
          </PositionFluid>
          {this.state.isMobileMenuOpen && <div css={mobileMenuStyle}>
            {menu.map(this.renderMenuItem)}
          </div>}
          <div css={docStyle}>
            <div dangerouslySetInnerHTML={{__html: pageContent[page]}}/>
          </div>
        </div>
      </div>
    )
  }

  renderMenuItem (item) {
    const isParent = item.children != null
    return isParent ? this.renderParentMenuItem(item) : this.renderSubMenuItem(item)
  }

  renderParentMenuItem (item) {
    return (
      <div key={item.title}>
        <h1>{item.title}</h1>
        <ul>
          {item.children.map(this.renderSubMenuItem)}
        </ul>
      </div>
    )
  }

  renderSubMenuItem (item) {
    return (
      <li key={item.page}><Link router={this.props.router} routeName="docs" pathVariables={{page: item.page}} onClick={this.closeMobileMenu}>{item.title}</Link></li>
    )
  }

  handleMobileMenuClick () {
    if (this.state.isMobileMenuOpen) {
      this.closeMobileMenu()
    } else {
      this.setState({isMobileMenuOpen: true})
      this.previousBodyOverflowY = window.document.body.style.overflowY || 'auto'
      window.document.body.style.overflowY = 'hidden'
    }
  }

  closeMobileMenu () {
    this.setState({isMobileMenuOpen: false})
    window.document.body.style.overflowY = this.previousBodyOverflowY
  }

  constructor (props, context) {
    super(props, context)
    this.state = {isMobileMenuOpen: false}
    this.renderMenuItem = this.renderMenuItem.bind(this)
    this.renderSubMenuItem = this.renderSubMenuItem.bind(this)
    this.renderParentMenuItem = this.renderParentMenuItem.bind(this)
    this.handleMobileMenuClick = this.handleMobileMenuClick.bind(this)
    this.closeMobileMenu = this.closeMobileMenu.bind(this)
  }
}

function getTitleByPage (page, children) {
  for (const item of children) {
    if (item.page === page) {
      return item.title
    } else if (item.children != null) {
      const titleByPage = getTitleByPage(page, item.children)
      if (titleByPage != null) {
        return titleByPage
      }
    }
  }
}
