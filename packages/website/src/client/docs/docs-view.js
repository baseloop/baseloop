import React from 'react'
import { Link } from '@baseloop/ui'

export default class DocsView extends React.PureComponent {
  render () {
    const {router, page} = this.props

    return (
      <div>
        <h1>Docs</h1>
        {page}
      </div>
    )
  }
}
