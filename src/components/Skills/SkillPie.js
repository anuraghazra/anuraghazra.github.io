import React from 'react';
import styled from 'styled-components';

const PieWrapper = styled.div`
  margin: 10px auto;
  max-width: 80%;
  width: 100%;
  position: relative;

  @media ${props => props.theme.tablet} {
    max-width: 70%;
  }

  p {
    color: ${props => props.theme.primaryColor};
    font-weight: 600;
    font-size: 18px;
    top: 50%;
    left: 50%;
    position: absolute;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  svg {
    margin: 0 auto;

    circle {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.3s linear;
      stroke: ${props => props.theme.accentColor};
      stroke-width: 7px;
    }

    .outer-circle {
      stroke-dasharray: 565;
      stroke: ${props => props.theme.primaryColor};
      stroke-dashoffset: calc(
        (${props => props.percent} / 100) * 3.14 * (90 * 2)
      );
    }
  }
`;

const SkillPie = ({ percent, name }) => {
  return (
    <PieWrapper percent={100 - percent}>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle r="90" cx="100" cy="100" fill="transparent" />
        <circle
          className="outer-circle"
          r="90"
          cx="100"
          cy="100"
          fill="transparent"
        />
      </svg>
      <p>{name}</p>
    </PieWrapper>
  );
};

export default SkillPie;
