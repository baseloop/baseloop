import React from 'react'

class Input extends React.PureComponent {
  constructor (props, context) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    return (
      <input
        {...this.props}
        type="text"
        onChange={this.handleChange}
      />
    )
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }
}

Input.defaultProps = {
  onChange: () => null
}

export default Input
