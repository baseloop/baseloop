import React from 'react'
import { Flex } from '@baseloop/ui'
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
  render () {
    return (
      <Flex>
        <Container>
          <label>{this.props.label}:</label>
          <div>
            {this.props.children}
          </div>
        </Container>
      </Flex>
    )
  }
}
