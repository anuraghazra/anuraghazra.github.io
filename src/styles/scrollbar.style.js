import { css } from 'styled-components';

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

export default scrollBar;