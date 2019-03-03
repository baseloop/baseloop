import React from 'react'
import styled from 'styled-components'

const StyledFlex = styled.div`
  display: flex;
  flex: ${props => props.flex};
  flex-direction: ${props => props.direction};
  ${props => props.fullSize ? 'height: 100%; width: 100%;' : ''}
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
  fullSize: false
}

export default Flex
