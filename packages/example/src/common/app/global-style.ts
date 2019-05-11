import { resetStyle } from '@baseloop/ui'
import { createGlobalStyle } from 'styled-components'

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const GlobalStyle = createGlobalStyle`
  ${resetStyle}
  
  html, body, #app-container {
    height: 100%;
  }

  body {
    font-size: 16px;
    font-family: ${fontFamily};    
  }
  
  h1 {
    font-size: 24px;
  }
  
  p {
    margin: 8px 0;
  }
  
  nav {
    width: 320px;
    background: #2f4050;
    color: #a7b1c2;
    box-sizing: border-box;
    padding: 24px;
  }
  
  nav a {
    display: block;
    margin: 8px 0;
    color: white;
    text-decoration: none;
  }
  
  nav a:hover {
    color: #ddd;
  }
  
  footer {
    background: #293846;
    height: 64px;
    box-sizing: border-box;
    padding: 24px;
    color: #a7b1c2;
  }
  
  main {
    background: #d8d8d8;
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 24px;
  }
  
  input, select {
    min-width: 160px;
    padding: 4px;
    font-family: ${fontFamily};
  }
`

export default GlobalStyle
