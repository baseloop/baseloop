import React from 'react'
import styled from 'styled-components'

interface Props {
  color: string,
  textToSay: string
}

interface ContainerProps {
  color: string
}

const Container = styled.div`
  color: ${(props: ContainerProps) => props.color};
`

export default class Say extends React.PureComponent<Props> {
  render () {
    return <Container color={this.props.color}>
      <p>Text from the path variable: "{this.props.textToSay}" (text color taken from the URL parameter).</p>
    </Container>
  }
}
