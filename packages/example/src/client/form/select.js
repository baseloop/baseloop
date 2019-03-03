import React from 'react'

class Select extends React.PureComponent {
  constructor (props, context) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    return (
      <select onChange={this.handleChange} value={this.props.value || ''}>
        <option key="default">Choose...</option>
        {this.props.options.map((option, i) => <option value={option.id} key={i}>{option.label}</option>)}
      </select>
    )
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }
}

Select.defaultProps = {
  options: [],
  onChange: () => null
}

export default Select
