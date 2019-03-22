import React from 'react'
import { css } from 'styled-components'

const style = css`
  display: flex;
  flex: ${props => props.flex};
  flex-direction: ${props => props.direction};
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
  flex-wrap: ${props => props.wrap};
`

class Flex extends React.PureComponent {
  render () {
    return (
      <div css={style} {...this.props}>
        {this.props.children}
      </div>
    )
  }
}

Flex.defaultProps = {
  direction: 'row',
  flex: 'initial',
  alignItems: 'initial',
  justifyContent: 'initial',
  wrap: 'nowrap'
}

export default Flex
