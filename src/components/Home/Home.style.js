import styled from 'styled-components';

export const Intro = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: 80vh;
  ${props => props.theme.spacing.sectionBottom};
  
  .home__text {
    color: ${props => props.theme.primaryBlack};
    z-index: 1;
    
    @media ${props => props.theme.media.tablet} {
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  
  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    text-shadow: 0 0 2px 2px white;
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
