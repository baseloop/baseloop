import React, { ChangeEvent, InputHTMLAttributes } from 'react'

interface Props {
  onChange: (value: string) => void,
  value: string,
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export default class Input extends React.PureComponent<Props> {
  static defaultProps = {
    onChange: () => null,
    inputProps: {}
  }

  constructor (props: Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    return (
      <input
        value={this.props.value}
        type="text"
        {...this.props.inputProps}
        onChange={this.handleChange}
      />
    )
  }

  handleChange (e: ChangeEvent<HTMLInputElement>) {
    this.props.onChange(e.target.value)
  }
}
