import React from 'react'
import styled from 'styled-components'

type BaselinePosition = 'baseline' | 'first baseline' | 'last baseline'

type ContentDistribution = 'space-between' | 'space-around' | 'space-evenly' | 'stretch'

type ContentPosition = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end'

type OverflowPosition =
  | 'unsafe center'
  | 'unsafe start'
  | 'unsafe end'
  | 'unsafe flex-start'
  | 'unsafe flex-end'
  | 'safe center'
  | 'safe start'
  | 'safe end'
  | 'safe flex-start'
  | 'safe flex-end'

type LeftRightPosition = 'left' | 'right' | 'unsafe left' | 'unsafe right' | 'safe left' | 'safe right'

type BaseAlignment = 'normal' | 'initial'

interface Props {
  alignContent: BaseAlignment | BaselinePosition | ContentDistribution | ContentPosition | OverflowPosition
  alignItems: BaseAlignment | 'stretch' | BaselinePosition | ContentPosition | OverflowPosition
  alignSelf: BaseAlignment | 'auto' | 'stretch' | BaselinePosition | ContentPosition | OverflowPosition
  basis: 'fill' | 'max-content' | 'min-content' | 'fit-content' | 'auto' | 'content' | number | string
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'initial'
  /**
   * Shorthand for grow, shrink & basis.
   */
  flex: string
  /**
   * Shorthand for direction & wrap.
   */
  flow: string
  grow: number | 'initial'
  justifyContent:
    | BaseAlignment
    | BaselinePosition
    | ContentDistribution
    | ContentPosition
    | OverflowPosition
    | LeftRightPosition
  justifyItems: BaseAlignment | 'stretch' | BaselinePosition | ContentPosition | OverflowPosition | LeftRightPosition
  justifySelf:
    | BaseAlignment
    | 'auto'
    | 'stretch'
    | BaselinePosition
    | ContentPosition
    | OverflowPosition
    | LeftRightPosition
  noDisplayFlex: boolean
  order: number | 'initial'
  shrink: number | 'initial'
  wrap: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial'
}

const FlexDiv = styled.div`
  align-content: ${(props: Props) => props.alignContent};
  align-items: ${(props: Props) => props.alignItems};
  align-self: ${(props: Props) => props.alignSelf};
  flex-basis: ${(props: Props) => props.basis};
  display: ${(props: Props) => (props.noDisplayFlex ? 'initial' : 'flex')};
  flex: ${(props: Props) => props.flex};
  flex-direction: ${(props: Props) => props.direction};
  flex-flow: ${(props: Props) => props.flow};
  flex-grow: ${(props: Props) => props.grow};
  justify-content: ${(props: Props) => props.justifyContent};
  justify-items: ${(props: Props) => props.justifyItems};
  justify-self: ${(props: Props) => props.justifySelf};
  order: ${(props: Props) => props.order};
  flex-shrink: ${(props: Props) => props.shrink};
  flex-wrap: ${(props: Props) => props.wrap};
`

export default class Flex extends React.PureComponent<Props> {
  public static defaultProps: Props = {
    alignContent: 'initial',
    alignItems: 'initial',
    alignSelf: 'initial',
    basis: 'initial',
    direction: 'initial',
    noDisplayFlex: false,
    flex: 'initial',
    flow: 'initial',
    grow: 'initial',
    justifyContent: 'initial',
    justifyItems: 'initial',
    justifySelf: 'initial',
    order: 'initial',
    shrink: 'initial',
    wrap: 'initial'
  }

  public render() {
    return <FlexDiv {...this.props}>{this.props.children}</FlexDiv>
  }
}
