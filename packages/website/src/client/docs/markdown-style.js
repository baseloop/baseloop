import { css } from 'styled-components'

export default css`
  p {
    margin: 16px 0;
  }
  
  h1 {
    border-bottom: 1px solid #414f5c;
    padding-bottom: 12px;
    font-size: 36px;
    color: #3c75a9;
    margin: 16px 0 24px 0;
  }
  
  h2 {
    font-size: 24px;
    color: #3c75a9;
    margin: 24px 0;
  }
  
  h3 {
    font-size: 20px;
    color: #3c75a9;
    margin: 16px 0;
  }
  
  pre {
    padding: 16px 12px;
    background: #414f5c;
    border-radius: 4px;
    margin: 16px 0;
  }
  
  code {
    background: #414f5c;
    color: white;
    line-height: 20px;
    border-radius: 4px;
    font-family: monospace;
  }
  
  p code {
    padding: 0 4px;
  }
  
  hr {
    background: #414f5c;
    height: 1px;
    border: none;
    margin: 16px 0;
  }
  
  ol {
    list-style-type: decimal;
    margin-left: 24px;
  }
  
  ul {
    list-style-type: disc;
    margin: 24px 0 24px 24px;
  }
  
  li {
    margin: 8px 0;
    
    > ul {
      margin: 0 0 0 24px;
    }
  }
  
  img {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }
`
