import React, { ChangeEvent } from 'react'

interface Option {
  id: string
  label: string
}

interface Props {
  value: string | null
  options: Option[]
  onChange: (value: string) => void
}

export default class Select extends React.PureComponent<Props> {
  public static defaultProps = {
    onChange: () => null,
    options: []
  }

  public constructor(props: Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  public render() {
    return (
      <select onChange={this.handleChange} value={this.props.value || ''}>
        <option key="default">Choose...</option>
        {this.props.options.map((option, i) => (
          <option value={option.id} key={i}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  private handleChange(e: ChangeEvent<HTMLSelectElement>) {
    this.props.onChange(e.target.value)
  }
}
