import { resetStyle } from '@baseloop/ui'
import { createGlobalStyle } from 'styled-components'
import { FOOTER_BACKGROUND, FOOTER_FOREGROUND, BACKGROUND, SECONDARY_BACK, LINK, LINK_HOVER } from './colors'
import iconsSolid from '../../static/icon-fonts/fa-solid-900.woff2'
import iconsRegular from '../../static/icon-fonts/fa-regular-400.woff2'
import iconsBrands from '../../static/icon-fonts/fa-brands-400.woff2'

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const GlobalStyle = createGlobalStyle`
  ${resetStyle}
  
  html {
    overflow-y: scroll;
    overflow-y: overlay;
    font-size: 16px;
  }
  
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0;
    background-color: #eee;
  }
  
  ::-webkit-scrollbar {
    width: 0.75rem;
    background-color: #F5F5F5;
  }
  
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #0771d2;
  }
  
  body {
    background: ${BACKGROUND};
    font-family: ${fontFamily};
    text-rendering: optimizeLegibility;
  }
  
  body, #app-container {
    min-height: 100vh;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  p {
    margin: 0.5rem 0;
    line-height: 1.375rem;
  }
  
  a {
    color: ${LINK};
  }
  
  a:hover {
    color: ${LINK_HOVER};
  }
  
  main {
    background: ${SECONDARY_BACK};
    width: 100%;
    flex: 1;
    box-sizing: border-box;
  }
  
  footer {
    background: ${FOOTER_BACKGROUND};
    color: ${FOOTER_FOREGROUND};
    padding: 2rem;
    text-align: center;
  }
  
  @font-face {
    font-family: "icons-solid";
    font-style: normal;
    font-weight: 900;
    font-display: auto;
    src: url(${iconsSolid}) format("woff2");
  }
  
  @font-face {
    font-family: "icons-regular";
    font-style: normal;
    font-weight: 900;
    font-display: auto;
    src: url(${iconsRegular}) format("woff2");
  }
  
  @font-face {
    font-family: "icons-brands";
    font-style: normal;
    font-weight: 900;
    font-display: auto;
    src: url(${iconsBrands}) format("woff2");
  }
`

export default GlobalStyle
