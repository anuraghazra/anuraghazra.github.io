import styled from 'styled-components';
import { slideDownKeyframe } from 'src/components/css-animations.js';

export const Intro = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: calc(80vh - 100px);
  ${props => props.theme.spacing.sectionBottom};
  
  .home__text {
    animation: ${slideDownKeyframe} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards;
    
    > div {
      z-index: 1;

      a.cta {
        display: block;
        margin: 30px 0;
      }
      
      @media ${props => props.theme.media.tablet} {
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }

  
  h1 {
    margin: -4px 0;
    font-size: 2.5rem;
    font-weight: 900;
  }

  p {
    font-family: ${props => props.theme.fontFamily};
  }
  .adjust {
    font-size: 1.06rem;
  }
  
  .home__CTA {
    width: max-content;
  }
  .home__social {
    color: ${props => props.theme.primaryColor};
    display: flex;
    justify-content: space-between;
    font-size: 24px;
  }

  
  @media ${props => props.theme.media.tablet} {
    justify-content: space-evenly;
    flex-direction: column;
  }
`

export const HomeWrapper = styled.section`
  margin-bottom: 100px;

  .svg-rect {
    width: 40%;
    position: absolute;
    top: 50px;
    right: 0;
    z-index: -1;
  }

  @media ${props => props.theme.media.tablet} {
    .svg-rect {
      opacity: 0.8;
    }
  }
`
