import * as React from 'react'

export default class Shield extends React.PureComponent {
  render () {
    const {href, src} = this.props

    return (
      <a href={href} target="_blank">
        <img src={src} />
      </a>
    )
  }
}
