import React from 'react'
import styled from 'styled-components'
import { Router, RouteState } from '@baseloop/router'

export interface Props {
  router: Router
  routeState: RouteState | null
}

interface ContainerProps {
  color: string
}

const Container = styled.div`
  color: ${(props: ContainerProps) => props.color};
`

export default function Say({ routeState }: Props) {
  const { pathVariables, queryParameters } = routeState || { pathVariables: {}, queryParameters: {} }
  return (
    <Container color={queryParameters.color}>
      <p>
        Text from the path variable: &quot;{pathVariables.textToSay}&quot; (text color taken from the URL parameter).
      </p>
    </Container>
  )
}
