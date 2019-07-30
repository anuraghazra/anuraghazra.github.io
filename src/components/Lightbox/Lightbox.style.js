import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const LightboxWrapper = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  z-index: 1000000;
  /* opacity: 0;
  pointer-events: none; */

  /* ${props => props.isOpen && css`
    opacity: 1;
    pointer-events: all;
  `} */

  .slick-slider {
    width: 100%;
    height: 100%;
    margin: auto;
    z-index: 1;
  }

  .closer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

  }

  button {
    position: absolute;
    width: 40px;
    height: 40px;
    border: none;
    background-color: ${props => props.theme.primaryColor};
    color: #f8f8f8;
    top: 50%;
    outline: none;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: 0.2s;
    cursor: pointer;
  }

  button.next {
    right: 2%;
  }
  button.next:hover {
    transform: translate(5px, -50%);
  }
  button.prev {
    left: 2%;
  }
  button.prev:hover {
    transform: translate(-5px, -50%);
  }
`

export default LightboxWrapper;