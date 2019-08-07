import { css } from 'styled-components';

const PrismJsStyles = css`
  blockquote {
    border-left: 5px solid ${p => p.theme.accentColor};
    padding: 15px;
    margin: 20px 0;
    border-radius: 3px;
  }
  
  .gatsby-highlight-code-line {
    display: block;
    background-color: rgba(255,255,225,0.1);
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

export default PrismJsStyles;