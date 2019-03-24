import { css } from 'styled-components'

export default css`
  p {
    margin: 1rem 0;
  }
  
  h1 {
    border-bottom: 0.0625rem solid #414f5c;
    padding-bottom: 0.75rem;
    font-size: 2.25rem;
    color: #3c75a9;
    margin: 1rem 0 1.5rem 0;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #3c75a9;
    margin: 1.5rem 0;
  }
  
  h3 {
    font-size: 1.25rem;
    color: #3c75a9;
    margin: 1rem 0;
  }
  
  pre {
    padding: 1rem 0.75rem;
    background: #414f5c;
    border-radius: 0.25rem;
    margin: 1rem 0;
  }
  
  code {
    background: #414f5c;
    color: white;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
  }
  
  p code {
    padding: 0 0.25rem;
  }
  
  hr {
    background: #414f5c;
    height: 0.0625rem;
    border: none;
    margin: 1rem 0;
  }
  
  ol {
    list-style-type: decimal;
    margin-left: 1.5rem;
  }
  
  ul {
    list-style-type: disc;
    margin: 1.5rem 0 1.5rem 1.5rem;
  }
  
  li {
    margin: 0.5rem 0;
    
    > ul {
      margin: 0 0 0 1.5rem;
    }
  }
  
  img {
    box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.2);
  }
`
