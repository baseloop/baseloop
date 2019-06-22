import React from 'react'
import styled from 'styled-components'

interface Props {
  direction: string
  flex: string
  alignItems: string
  justifyContent: string
  wrap: string
}

const FlexDiv = styled.div`
  display: flex;
  flex: ${(props: Props) => props.flex};
  flex-direction: ${(props: Props) => props.direction};
  align-items: ${(props: Props) => props.alignItems};
  justify-content: ${(props: Props) => props.justifyContent};
  flex-wrap: ${(props: Props) => props.wrap};
`

export default class Flex extends React.PureComponent<Props> {
  public static defaultProps: Props = {
    alignItems: 'initial',
    direction: 'row',
    flex: 'initial',
    justifyContent: 'initial',
    wrap: 'nowrap'
  }

  public render() {
    return <FlexDiv {...this.props}>{this.props.children}</FlexDiv>
  }
}
