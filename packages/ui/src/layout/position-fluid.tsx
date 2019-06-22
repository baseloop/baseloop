import { isBrowser } from '@baseloop/core'
import React from 'react'
import styled from 'styled-components'

interface Props {
  width: string
  height: string
  threshold: number
  zIndex: number
  transitionSpeed: string
  stayFixed: boolean
}

interface DivProps {
  isHidden: boolean
  elementOffset: number
  zIndex: number
  containerWidth: string
  containerHeight: string
  transitionSpeed: string
}

const PositionFluidDiv = styled.div`
  position: fixed;
  width: ${(props: DivProps) => props.containerWidth};
  height: ${(props: DivProps) => props.containerHeight};
  transition: all ${(props: DivProps) => props.transitionSpeed};
  transform: translateY(0);
  z-index: ${(props: DivProps) => props.zIndex};

  ${(props: DivProps) =>
    props.isHidden &&
    `
    transform: translateY(-${props.elementOffset}px);
    background: red;
  `}
`

interface State {
  isHidden: boolean
  prevScrollY: number | null
  showY: number | null
  hidY: number | null
}

export default class PositionFluid extends React.PureComponent<Props, State> {
  public static defaultProps: Props = {
    height: 'auto',
    stayFixed: false,
    threshold: 50,
    transitionSpeed: '0.25s',
    width: '100%',
    zIndex: 1
  }

  private readonly ref: React.RefObject<any>

  public constructor(props: Props) {
    super(props)

    this.ref = React.createRef()
    this.state = { isHidden: false, hidY: null, showY: null, prevScrollY: null }
    this.handleScroll = this.handleScroll.bind(this)

    if (isBrowser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  private handleScroll() {
    const scrollY = window.document.documentElement.scrollTop || window.scrollY

    if (this.state.prevScrollY == null) {
      this.setState({ prevScrollY: scrollY })
    }

    const isScrollingDown = (this.state.prevScrollY || 0) < scrollY

    if (this.state.hidY == null) {
      this.setState({ hidY: scrollY + this.props.threshold })
    }

    if (this.state.showY == null) {
      this.setState({ showY: scrollY - this.props.threshold })
    }

    if (scrollY > (this.state.hidY || 0) && isScrollingDown && !this.props.stayFixed) {
      this.setState({
        isHidden: true,
        showY: scrollY - this.props.threshold
      })
    }

    if ((scrollY < (this.state.showY || 0) && !isScrollingDown) || this.props.stayFixed) {
      this.setState({
        hidY: scrollY + this.props.threshold,
        isHidden: false
      })
    }

    this.setState({ prevScrollY: scrollY })
  }

  public render() {
    const height = isBrowser && this.ref.current ? this.ref.current.clientHeight : 0
    const offsetTop = isBrowser && this.ref.current ? this.ref.current.offsetTop : 0

    return (
      <PositionFluidDiv
        ref={this.ref}
        isHidden={this.state.isHidden}
        elementOffset={height + offsetTop}
        zIndex={this.props.zIndex}
        containerWidth={this.props.width}
        containerHeight={this.props.height}
        transitionSpeed={this.props.transitionSpeed}
      >
        {this.props.children}
      </PositionFluidDiv>
    )
  }
}
