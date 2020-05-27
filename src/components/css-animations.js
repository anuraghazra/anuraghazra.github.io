import { keyframes } from 'styled-components';

export const slideDownKeyframe = keyframes`
  0% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const tooltipKeyframe = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
