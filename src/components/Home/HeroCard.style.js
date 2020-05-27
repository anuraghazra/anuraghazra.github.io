import styled from 'styled-components';

import { slideDownKeyframe, tooltipKeyframe } from '../css-animations';

export const HeroCardWrapper = styled.div`
  position: relative;
  animation: ${slideDownKeyframe} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s
    forwards;

  @media ${props => props.theme.media.tablet} {
    /* releated to "things i love" section bug */
    margin-top: 25px;
  }
`;

export const CodeCardWrapper = styled.div`
  padding: 30px 35px;
  border-radius: 10px;
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: ${props => props.theme.shadowSmall};

  pre {
    font-size: 0.8rem;
    font-family: ${props => props.theme.fontFamily};
    color: ${p => (p.theme.dark ? p.theme.primaryText : p.theme.primaryColor)};
  }
`;

export const ColorPaletteWrapper = styled.div`
  position: absolute;
  bottom: -40px;
  left: -90px;

  display: flex;
  justify-content: space-around;
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: ${props => props.theme.shadowSmall};
  padding: 8px;
  border-radius: 5px;

  @media ${props => props.theme.media.tablet} {
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%) !important;
  }
`;

export const ColorBoxWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin: 3px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
  &:active {
    transform: scale(0.7);
    transition: 0.1s;
  }

  &:before {
    pointer-events: none;
    position: absolute;
    text-align: center;
    content: 'Copied';
    opacity: 0;
    width: 50px;
    bottom: -130%;
    left: 50%;
    padding: 10px;
    border-radius: 10px;
    color: inherit;
    background: ${p => p.theme.secondaryColor};
    box-shadow: ${p => p.theme.shadowSmall};
    font-size: 12px;
    transition: 0.3s;
    transform: translateX(-50%);
  }

  &.tooltip-animate:before {
    animation: ${tooltipKeyframe} 1s;
  }
`;
