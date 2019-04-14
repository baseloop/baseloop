import * as React from 'react'

export default class Shield extends React.PureComponent {
  render () {
    const {href, src, alt} = this.props

    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        <img src={src} alt={alt} />
      </a>
    )
  }
}
