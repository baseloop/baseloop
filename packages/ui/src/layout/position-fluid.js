import React from 'react'
import { css } from 'styled-components'
import { isBrowser } from '@baseloop/core'

const style = css`
  position: fixed;
  width: ${props => props.containerWidth};
  height: ${props => props.containerHeight};
  transition: all ${props => props.transitionSpeed};
  transform: translateY(0);
  z-index: ${props => props.zIndex};
  
  ${props => props.isHidden && `
    transform: translateY(-${props.elementOffset}px);
    background: red;
  `}
`

class PositionFluid extends React.PureComponent {
  constructor (props, context) {
    super(props, context)

    this.ref = React.createRef()
    this.state = {isHidden: false, hidY: null, showY: null, prevScrollY: null}
    this.handleScroll = this.handleScroll.bind(this)

    if (isBrowser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const scrollY = (window.document.documentElement.scrollTop || window.scrollY)

    if (this.state.prevScrollY == null) {
      this.setState({prevScrollY: scrollY})
    }

    const isScrollingDown = this.state.prevScrollY < scrollY

    if (this.state.hidY == null) {
      this.setState({hidY: scrollY + this.props.threshold})
    }

    if (this.state.showY == null) {
      this.setState({showY: scrollY - this.props.threshold})
    }

    if (scrollY > this.state.hidY && isScrollingDown && !this.props.stayFixed) {
      this.setState({
        isHidden: true,
        showY: scrollY - this.props.threshold
      })
    }

    if ((scrollY < this.state.showY && !isScrollingDown) || this.props.stayFixed) {
      this.setState({
        isHidden: false,
        hidY: scrollY + this.props.threshold
      })
    }

    this.setState({prevScrollY: scrollY})
  }

  render () {
    const height = isBrowser && this.ref.current ? this.ref.current.clientHeight : 0
    const offsetTop = isBrowser && this.ref.current ? this.ref.current.offsetTop : 0

    return (
      <div
        ref={this.ref}
        css={style}
        isHidden={this.state.isHidden}
        elementOffset={height + offsetTop}
        zIndex={this.props.zIndex}
        containerWidth={this.props.width}
        containerHeight={this.props.height}
        transitionSpeed={this.props.transitionSpeed}
      >
        {this.props.children}
      </div>
    )
  }
}

PositionFluid.defaultProps = {
  width: '100%',
  height: 'auto',
  threshold: 50,
  zIndex: 1,
  transitionSpeed: '0.25s',
  stayFixed: false
}

export default PositionFluid
