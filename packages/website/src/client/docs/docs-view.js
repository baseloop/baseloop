import React from 'react'
import { Link } from '@baseloop/ui'
import { css } from 'styled-components'
import installation from './pages/installation.md'
import motivation from './pages/motivation.md'
import architecture from './pages/architecture.md'
import functionalProgramming from './pages/functional-programming.md'
import reactiveProgramming from './pages/reactive-programming.md'
import markdownStyle from './markdown-style'

const menu = [
  {
    title: 'Introduction', children: [
      {title: 'Motivation and goals', page: 'motivation'},
      {title: 'Architecture', page: 'architecture'},
      {title: 'Installation', page: 'installation'},
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
  padding: 32px 0;
`

const containerStyle = css`
  display: flex;
  width: 1024px;
  
  > div {
    margin-bottom: 32px;
    margin-left: 32px;
  }
`

const menuStyle = css`
  padding-right: 16px;
  border-right: 1px solid #ddd;
  
  h1 {
    font-size: 20px;
    margin: 16px 0;
  }
  
  ul {
    margin-bottom: 32px;
  }
  
  li {
    margin: 12px 16px;
  }
  
  a {
    text-decoration: none;
  }
`

const docStyle = css`
  flex: 1;
  
  ${markdownStyle}
`

export default class DocsView extends React.PureComponent {
  render () {
    const {page} = this.props

    return (
      <div css={pageStyle}>
        <div css={containerStyle}>
          <div css={menuStyle}>
            {menu.map(this.renderMenuItem)}
          </div>
          <div css={docStyle}>
            {page === 'motivation' && <div dangerouslySetInnerHTML={{__html: motivation}}/>}
            {page === 'architecture' && <div dangerouslySetInnerHTML={{__html: architecture}}/>}
            {page === 'installation' && <div dangerouslySetInnerHTML={{__html: installation}}/>}
            {page === 'functional-programming' && <div dangerouslySetInnerHTML={{__html: functionalProgramming}}/>}
            {page === 'reactive-programming' && <div dangerouslySetInnerHTML={{__html: reactiveProgramming}}/>}
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
      <li key={item.page}><Link router={this.props.router} routeName="docs" pathVariables={{page: item.page}}>{item.title}</Link></li>
    )
  }

  constructor (props, context) {
    super(props, context)
    this.renderMenuItem = this.renderMenuItem.bind(this)
    this.renderSubMenuItem = this.renderSubMenuItem.bind(this)
    this.renderParentMenuItem = this.renderParentMenuItem.bind(this)
  }
}
