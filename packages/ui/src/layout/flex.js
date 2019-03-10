import React from 'react'
import styled from 'styled-components'

const StyledFlex = styled.div`
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
      <StyledFlex {...this.props}>
        {this.props.children}
      </StyledFlex>
    )
  }
}

Flex.defaultProps = {
  direction: 'row',
  flex: 'initial',
  fullSize: false,
  alignItems: 'initial',
  justifyContent: 'initial',
  wrap: 'nowrap'
}

export default Flex
