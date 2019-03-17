import React from 'react'
import { Link } from '@baseloop/ui'

export default class DocsView extends React.PureComponent {
  render () {
    const {router} = this.props

    return (
      <div>
        <h1>Docs</h1>
        <Link router={router} routeName="docs.foo">Docs foo</Link>
        <Link router={router} routeName="docs.bar">Docs bar</Link>
        {router.match('docs.foo') && <div>foo</div>}
        {router.match('docs.bar') && <div>bar</div>}
      </div>
    )
  }
}
