import * as React from 'react'

export default class Link extends React.PureComponent {
  constructor (props, state) {
    super(props, state)
    this.onClick = this.onClick.bind(this)
  }

  render () {
    const {router, routeName, ...props} = this.props

    return (
      <a href={router.buildUrl(routeName)} onClick={this.onClick} {...props} />
    )
  }

  onClick (e) {
    this.props.router.navigate(this.props.routeName)
    e.preventDefault()
  }
}
