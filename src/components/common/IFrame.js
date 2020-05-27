import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { useInView } from 'react-intersection-observer';

const IframeWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  background-color: ${props => props.theme.accentColor};
  border-radius: 10px;

  ${props =>
    props.livedemo &&
    css`
      @media ${props => props.theme.media.tablet} {
        min-height: 400px;
      }
    `}

  /* @media ${props => props.theme.media.tablet} {
    min-height: 100px;
  } */
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const LoaderWrapper = styled.div`
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10%;
  }

  .paths {
    > * {
      animation-name: pathAni;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      animation-fill-mode: alternate;
      transform-origin: 50% 50%;
      transform: scale(0.8);
    }
    path:nth-child(1) {
      animation-delay: 0.2s;
    }
    path:nth-child(2) {
      animation-delay: 0.3s;
    }
    path:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes pathAni {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`;
const Loader = () => {
  let maskid = `mask-${Math.random()}`;
  let paintid = `paint-${Math.random()}`;
  return (
    <LoaderWrapper>
      <svg
        width="247"
        height="210"
        viewBox="0 0 247 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id={maskid}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="265"
          height="210"
        >
          <rect width="265" height="210" fill={`url(#${paintid})`} />
        </mask>
        <g className="paths" mask={`url(#${maskid})`}>
          <path
            opacity="0.7"
            d="M3.03412 220.341C-13.3618 248.782 -3.61438 285.16 24.8056 301.593V301.593L149.776 84.8118C166.172 56.3704 156.424 19.9924 128.004 3.55939V3.55939L3.03412 220.341Z"
            fill={`url(#${paintid})`}
          />
          <path
            opacity="0.7"
            d="M43.8915 277.869C27.4956 306.31 37.243 342.688 65.663 359.121V359.121L190.633 142.34C207.029 113.899 197.282 77.5205 168.862 61.0875V61.0875L43.8915 277.869Z"
            fill={`url(#${paintid})`}
          />
          <path
            opacity="0.7"
            d="M84.749 334.041C68.3531 362.483 78.1005 398.861 106.52 415.294V415.294L231.491 198.512C247.886 170.071 238.139 133.693 209.719 117.26V117.26L84.749 334.041Z"
            fill={`url(#${paintid})`}
          ></path>
        </g>
        <defs>
          <linearGradient
            id={paintid}
            x1="0"
            y1="0"
            x2="203.966"
            y2="257.386"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6A98F0" />
            <stop offset="1" stopColor="#4961DC" />
          </linearGradient>
        </defs>
      </svg>
    </LoaderWrapper>
  );
};

const IFrame = ({ src, livedemo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <IframeWrapper livedemo={livedemo} className="iframe-wrapper" ref={ref}>
      <iframe
        title={src}
        style={{ opacity: isLoading ? '0' : '1' }}
        src={inView ? src : undefined}
        onLoad={handleLoaded}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
        allowFullScreen
      />
      {isLoading && <Loader />}
    </IframeWrapper>
  );
};

IFrame.defaultProps = {
  livedemo: false,
};
IFrame.propTypes = {
  src: PropTypes.string.isRequired,
  livedemo: PropTypes.bool,
};

export default IFrame;
