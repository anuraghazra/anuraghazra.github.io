import { css } from 'styled-components';

const blogstyles = css`
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
    line-height: 1.58;

    a {
      word-break: break-word;
    }
    p {
      font-size: 18px;
      margin: 1em auto;
    }
    blockquote p {
      word-break: break-word;
      margin: 0;
    }
    /* code {
      font-size: 16px;
    } */

    iframe {
      border-radius: 5px;
      border: none;
      height: 500px !important;
    }

    figure {
      margin: 50px 0;
    }
    figcaption {
      margin: 10px 0;
      font-style: italic;
      font-size: 12px;
      text-align: center;
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
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 2.1em 0 0.5em 0;
      color: ${p => p.theme.primaryColor};

      &:hover .gatsby-remark-autolink svg {
        opacity: 1;
      }
    }

    ul,
    ol {
      font-family: ${p => p.theme.secondaryFontFamily};
      font-size: 18px;
      padding: 0 17px;
      line-height: 170%;
      text-indent: 0px;
    }
    ul {
      list-style: disc;
    }

    .gatsby-remark-autolink svg {
      scale: 1.3;
      margin-left: 18px;
      margin-right: 8px;
      fill: ${p => p.theme.primaryColor};
      visibility: visible !important;
      opacity: 0.5;
    }
  }
`;
export default blogstyles;
