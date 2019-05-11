import * as React from 'react'

interface Props {
  href?: string,
  src: string,
  alt?: string
}

export default class Shield extends React.PureComponent<Props> {
  render () {
    const {href, src, alt} = this.props

    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        <img src={src} alt={alt} />
      </a>
    )
  }
}
