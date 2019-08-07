import { createGlobalStyle, css } from 'styled-components';
import PrismJsStyles from './prismjs.style';
import scrollBar from './scrollbar.style';


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

  hr {
    border: 1px solid ${p => p.theme.accentColor};
    margin: 30px 0;
  }

  @media all and (min-width: 450px) {
    ${scrollBar};
  }



  /*             */
  /* BLOG STYLES */
  /*             */

  .blog__social-share {
    a {
      margin-right: 20px;
    }
  }
  /* Other Specific Global Styles */
  div#disqus_thread {
    background: whitesmoke;
    padding: 15px 25px;
    border-radius: 10px;
  }

  .markdown-content {
    ${p => p.theme.spacing.sectionTopBottom};
    margin-top: 50px;
    max-width: 800px;
    p {
      font-size: 18px;
    } 
    code {
      font-size: 16px
    }
    
    @media ${p => p.theme.media.tablet} {
      pre {
        overflow-x: scroll;
      }
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 50px;
    }
    h2, h3, h4, h5, h6 {
      margin: 30px 0;
      margin-top: 40px;
      color: ${p => p.theme.primaryColor};
    }

    ul {
      font-family: ${p => p.theme.secondaryFontFamily};
      font-size: 18px;
      padding: 0 17px;
      line-height: 200%;
      text-indent: 0px;
      list-style: disc;
    }
  }

  ${PrismJsStyles};
`
export default GlobalStyle;