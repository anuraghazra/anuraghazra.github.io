import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html {
    height: 100%;
    font-size: calc(12px + 0.4vw);
    font-family: ${props => props.theme.fontFamily};
    -webkit-font-smoothing: antialiased;
  }
  body {
    /* overflow hidden for SmallProject's 100vw width div */
    overflow-x: hidden;
  }

  a {
    color: ${props => props.theme.primaryColor};
    text-decoration: none;
  }
  a:hover {
    color: ${props => props.theme.secondaryColor};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0px 0;
    line-height: 140%;
  }
  
  p {
    font-size: 16px;
    margin: 0;
    line-height: auto;
    line-height: 150%;
    font-family: ${props => props.theme.secondaryFontFamily};
  }

  .active {
    color: ${props => props.theme.primaryBlack};
  }

  .embed-nav .code-types a {
    padding: 5px 16px 5px 16px !important;
    letter-spacing: 0.6px !important;
    font-size: 12px !important;
  }
  .embed-nav {
    height: 30px !important;
    padding-bottom: 2px !important;
  }
  .embed-nav .logo-wrap #embed-codepen-logo {
    width: 79px !important;
    height: 13px !important;
  }
  .embed-nav .logo-wrap #embed-codepen-logo {
      display: none !important;
  }
`
export default GlobalStyle;