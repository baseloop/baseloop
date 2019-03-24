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
  padding: 2rem 0;
`

const containerStyle = css`
  display: flex;
  width: 90rem;
  
  > div {
    margin-bottom: 2rem;
    margin-left: 2rem;
  }
`

const menuStyle = css`
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
