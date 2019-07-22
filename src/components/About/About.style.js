import styled from 'styled-components';

export const AboutWrapper = styled.section`
  margin-bottom: 200px;
  color: ${props => props.theme.primaryWhite};

  .quotes__wrapper {
    position: relative;
    top: 80px;

    @media ${props => props.theme.media.tablet} {
      top: 40px;
    }
  }
`

export const AboutInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 200px;

  > div:first-child {
    margin-right: 10%;
  }

  @media ${props => props.theme.media.tablet} {
    flex-direction: column;
    margin-top: 120px;
    
    > div:first-child {
      margin-right: 0;
      margin-bottom: 30px;
    }
  }
`