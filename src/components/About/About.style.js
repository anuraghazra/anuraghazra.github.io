import styled from 'styled-components';

export const AboutWrapper = styled.section`
  margin-bottom: 200px;

  @media ${props => props.theme.media.tablet} {
    position: relative;
  }
  .quotes__wrapper {
    position: relative;
    top: 80px;

    @media ${props => props.theme.media.tablet} {
      top: 40px;
    }
  }
`;

export const AboutInfo = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 200px;

  > div:first-child {
    margin-right: 10%;
  }

  p {
    color: #f8f8f8;
  }

  .about__link {
    color: ${p => (p.theme.dark ? p.theme.primaryColor : '#111')};
  }
  @media ${props => props.theme.media.tablet} {
    flex-direction: column;
    margin-top: 120px;

    > div:first-child {
      margin-right: 0;
      margin-bottom: 30px;
    }
  }
`;
