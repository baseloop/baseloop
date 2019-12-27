import React from 'react'
import styled from 'styled-components'
import { Router } from '@baseloop/router'
import { useRouteState } from '@baseloop/hooks'

export interface Props {
  router: Router
}

interface ContainerProps {
  color: string
}

const Container = styled.div`
  color: ${(props: ContainerProps) => props.color};
`

export default function Say({ router }: Props) {
  const [, pathVariables, queryParameters] = useRouteState(router)
  return (
    <Container color={queryParameters!.color}>
      <p>
        Text from the path variable: &quot;{pathVariables!.textToSay}&quot; (text color taken from the URL parameter).
      </p>
    </Container>
  )
}
