import React from 'react'
import { css } from 'styled-components'

const style = css`
  color: ${props => props.color};
`

export default class Say extends React.PureComponent {
  render () {
    return <div css={style} color={this.props.color}>
      <p>Text from the path variable: "{this.props.textToSay}" (text color taken from the URL parameter).</p>
    </div>
  }
}
