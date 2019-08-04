import { createGlobalStyle, css } from 'styled-components';

const scrollBar = css`
  ::-webkit-scrollbar-track {
    background-color: white;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: white;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.primaryColor};
  }

  ::-moz-scrollbartrack-vertical {
    background-color: white;
  }

  ::-moz-scrollbar {
    width: 10px;
    height: 10px;
    background-color: white;
  }

  ::-moz-scrollbarbutton-up {
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

  @media all and (min-width: 450px) {
    ${scrollBar};
  }


  .markdown-content {
    ${p => p.theme.spacing.sectionTopBottom};
    margin-top: 50px;
    max-width: 800px;
    p {
      font-size: 18px;
    } 
    code {
      font-size: 18px;
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
      margin: 20px 0;
      color: ${p => p.theme.primaryColor};
    }
  }
  /* Prismjs */
  blockquote {
    border-left: 5px solid ${p => p.theme.accentColor};
    padding: 15px;
    margin: 20px 0;
    border-radius: 3px;
  }
  .language-text {
    padding: 2px 5px;
    background: ${p => p.theme.accentColor} !important;
    color: ${p => p.theme.primaryText}  !important;
  }
  .gatsby-highlight {
    background-color: #2d2d2d;
    border-radius: 0.3em;
    margin: 1em 0;
    padding: 1em;
    overflow: auto;
    border-left: 10px solid ${p => p.theme.primaryColor};

    /**
    * Remove the default PrismJS theme background-color, border-radius, margin,
    * padding and overflow.
    * 1. Make the element just wide enough to fit its content.
    * 2. Always fill the visible space in .gatsby-highlight.
    * 3. Adjust the position of the line numbers
    */
    pre[class*="language-"] {
      background-color: transparent;
      margin: 0;
      padding: 0;
      overflow: initial;
      float: left;
      min-width: calc(100% - 3em);

      &.line-numbers {
        padding-left: 1.5em;
        padding-right: 1em;

        .line-numbers-rows {
          right: calc(100% - 15px);
          left: unset !important;
        }

        .gatsby-highlight-code-line {
          background-color: #455A64;
          display: block;
          margin-right: -1em;
          margin-left: -1em;
          padding-right: 1em;
          padding-left: 0.75em;
        }
      }
    }
  }
`
export default GlobalStyle;