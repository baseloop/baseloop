import * as React from 'react'

export default class Link extends React.PureComponent {
  constructor (props, state) {
    super(props, state)
    this.onClick = this.onClick.bind(this)
  }

  render () {
    const {router, routeName, pathVariables, queryParameters, ...props} = this.props

    return (
      <a href={router.buildUrl(routeName, pathVariables, queryParameters)} onClick={this.onClick} {...props} />
    )
  }

  onClick (e) {
    this.props.router.navigate(this.props.routeName, this.props.pathVariables, this.props.queryParameters)
    e.preventDefault()
  }
}
