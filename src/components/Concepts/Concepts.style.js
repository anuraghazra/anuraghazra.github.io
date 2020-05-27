import styled from 'styled-components';

import { FloatingButton } from '@components/Layout/Navbar/NavMobile.style';
import { CCard } from '@components/CreativeCoding/CreativeCoding.style';

import { CardFooter } from '@common/Card';

export const ConceptsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`;

export const ConceptCard = styled(CCard)`
  overflow: hidden;
  height: 300px;

  cursor: pointer;

  &:hover .ccard__footer {
    bottom: 0;
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
`;

export const ConceptCardFooter = styled(CardFooter)`
  position: absolute;

  bottom: -100px;
  left: 0;
  opacity: 0;
  transition: 0.3s ease-in-out;
  padding: 10px 15px;
  background: ${props => props.theme.secondaryColor};

  @media ${props => props.theme.media.mobile} {
    bottom: 0;
    opacity: 1;
  }
`;

// LIGHTBOX
export const LightBoxCloseButton = styled(FloatingButton)`
  width: 50px;
  height: 50px;
  border: none;
  position: fixed;
  top: 50px;
  right: 20px;
  z-index: 5;

  @media ${props => props.theme.media.minMobile} {
    display: none;
  }
`;

export const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;

  .lightbox__gatsbyimage {
    transform-origin: center 0;
    transform: scale(0.7);

    @media ${props => props.theme.media.tablet} {
      transform: translateY(35vh) scale(0.9);
    }
  }
`;
