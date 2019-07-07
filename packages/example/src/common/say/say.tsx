import React from 'react'
import styled from 'styled-components'

export interface Props {
  color: string
  textToSay: string
}

interface ContainerProps {
  color: string
}

const Container = styled.div`
  color: ${(props: ContainerProps) => props.color};
`

export default function Say({ color, textToSay }: Props) {
  return (
    <Container color={color}>
      <p>Text from the path variable: &quot;{textToSay}&quot; (text color taken from the URL parameter).</p>
    </Container>
  )
}
