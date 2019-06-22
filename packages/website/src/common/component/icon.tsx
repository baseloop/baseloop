import * as React from 'react'
import styled from 'styled-components'

const IconStyle = styled.i`
  font-family: "icons-${(props: IconStyleProps) => props.type}";
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  font-weight: 900;
  
  :before {
    content: "${(props: IconStyleProps) => props.content}";  
  }
`

const idMap: Record<string, any> = {
  home: '\\f015',
  docs: '\\f15c',
  wrench: '\\f0ad',
  github: '\\f09b',
  direction: '\\f5eb',
  bolt: '\\f0e7',
  recycle: '\\f1b8',
  terminal: '\\f120',
  projectDiagram: '\\f542',
  toolbox: '\\f552',
  userCheck: '\\f4fc',
  comments: '\\f086',
  copy: '\\f0c5',
  rook: '\\f447',
  bars: '\\f0c9'
}

const typeIdMap: Record<string, any> = {
  b: 'brands',
  s: 'solid',
  r: 'regular'
}

interface Props {
  id: string
  src?: string
  width?: string
  height?: string
  type?: string
}

interface IconStyleProps {
  content: string
  type: string
}

export default class Icon extends React.PureComponent<Props> {
  public static defaultProps = {
    src: '',
    width: '1.5rem',
    height: '1.5rem',
    type: 'solid'
  }

  public render() {
    const { id } = this.props
    const [typeId, code] = id.split('-')

    return <IconStyle content={idMap[code]} type={typeIdMap[typeId]} />
  }
}
