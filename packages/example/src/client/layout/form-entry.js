import React from 'react'
import Flex from './flex'
import { css } from 'styled-components'

const style = css`
  margin-bottom: 8px;
  > label {
    min-width: 128px;
    margin-right: 8px;
  }
`

export default class FormEntry extends React.PureComponent {
  render () {
    return (
      <Flex css={style}>
        <label>{this.props.label}:</label>
        <div>
          {this.props.children}
        </div>
      </Flex>
    )
  }
}
