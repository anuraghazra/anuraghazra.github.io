import { createGlobalStyle, css } from 'styled-components';

const scrollBar = css`
  body::-webkit-scrollbar-track {
    background-color: white;
  }

  body::-webkit-scrollbar {
    width: 10px;
    background-color: white;
  }

  body::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.primaryColor};
  }

  body::-moz-scrollbartrack-vertical {
    background-color: white;
  }

  body::-moz-scrollbar {
    width: 10px;
    background-color: white;
  }

  body::-moz-scrollbarbutton-up {
    background-color: ${p => p.theme.primaryColor};
  }
  input[type=checkbox]{
    height: 0;
    width: 0;
    visibility: hidden;
  }
`

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html {
    height: 100%;
    font-size: calc(12px + 0.4vw);
    font-family: ${p => p.theme.fontFamily};
    -webkit-font-smoothing: antialiased;
    font-display: fallback !important;
  }
  body {
    /* overflow hidden for SmallProject's 100vw width div */
    overflow-x: hidden;
    background-color: ${p => p.theme.bg};
    color: ${p => p.theme.primaryText};
    /* ${p => p.theme.dark ? p.theme.primaryBdlack : p.theme.primaryColor}; */
  }


  a {
    color: ${p => p.theme.primaryColor};
    text-decoration: none;
  }
  a:hover {
    color: ${p => p.theme.primaryText};
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 10px 0;
    line-height: 140%;
    color: ${p => p.theme.primaryText};
  }
  
  p {
    font-size: 16px;
    margin: 0;
    line-height: 150%;
    font-family: ${p => p.theme.secondaryFontFamily};
    color: ${p => p.theme.primaryText};
  }
  
  ul {
    list-style: none;
    padding: 0;
    font-size: 14px;
    line-height: 150%;
  }

  .active {
    color: #383838;
  }

  ${scrollBar};

`
export default GlobalStyle;