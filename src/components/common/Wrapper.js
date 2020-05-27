import styled from 'styled-components';
const Wrapper = styled.main`
  margin: auto;
  width: 80%;

  @media ${props => props.theme.media.tablet} {
    width: 90%;
  }
`;

export default Wrapper;
