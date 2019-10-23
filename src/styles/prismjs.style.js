import { css } from 'styled-components';

const PrismJsStyles = css`
  blockquote {
    border-left: 5px solid ${p => p.theme.accentColor};
    padding: 15px;
    margin: 20px 0;
    border-radius: 3px;
  }
  
  /* inline backtics */
  .language-text {
    padding: 2px 5px;
    background: ${p => p.theme.accentColor} !important;
    color: ${p => p.theme.primaryText}  !important;
    word-break: break-word !important;
    white-space: normal !important;
    font-size: 16px !important;
    /* font-family: ${props => props.theme.secondaryFontFamily} !important; */
  }


  .gatsby-highlight {
    background-color: #25293e;
    border-radius: 0.3em;
    margin: 3.5em 0;
    padding: 1em;
    overflow: auto;
    border-left: 5px solid ${p => p.theme.primaryColor};

    code[class*="language-"] {
      background-color: transparent;
      /* 14px */
      font-size: 1em; 
    }

    pre[class*="language-"] {
      background-color: transparent;
      margin: 0;
      padding: 0;
      overflow: initial;
      float: left;
      min-width: calc(100% - 3em);

      &.line-numbers {
        padding-left: 2em;
        padding-right: 1em;
        line-height: 170%;
        font-size: 14px;
        
        .line-numbers-rows {
          right: calc(100% - 15px);
          border: none;
          /* left: unset !important; */
        }

        .gatsby-highlight-code-line {
          background-color: #323548;
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