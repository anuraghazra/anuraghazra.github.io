import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    height: 100%;
    font-size: calc(12px + 0.4vw);
    font-family: ${props => props.theme.fontFamily};
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
    font-size: 14px;
    margin: 0;
    line-height: auto;
    line-height: 150%;
    font-family: ${props => props.theme.secondaryFontFamily};
  }

  .active {
    color: ${props => props.theme.primaryBlack};
  }
`
export default GlobalStyle;