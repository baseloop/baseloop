import { Flex } from '@baseloop/ui'
import React from 'react'
import styled from 'styled-components'

interface Props {
  label: string
}

const Container = styled.div`
  margin-bottom: 8px;
  > label {
    min-width: 128px;
    margin-right: 8px;
  }
`

export default class FormEntry extends React.PureComponent<Props> {
  public render() {
    return (
      <Flex direction="row">
        <Container>
          <label>{this.props.label}:</label>
          <div>{this.props.children}</div>
        </Container>
      </Flex>
    )
  }
}
