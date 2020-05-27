import styled from 'styled-components';
import Flex from './Flex';

export const Card = styled.div`
  margin: 10px;
  flex: 1 1 200px;
  max-width: 300px;

  height: 300px;
  padding: 20px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  text-align: center;

  background-color: ${props => props.theme.secondaryColor};
  box-shadow: ${props => props.theme.shadowSmall};
  border-radius: 10px;

  @media ${props => props.theme.media.tablet} {
    flex: 1 1 100%;
    margin: 20px auto;
  }
`;

export const CardIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  color: #f8f8f8;

  svg {
    height: 100px;
    line-height: 100px;
    font-size: 2.2rem;
  }
`;

export const CardTitle = styled.h3`
  font-weight: normal;
  color: ${p => (p.theme.dark ? p.theme.primaryText : p.theme.primaryColor)};
`;

export const CardText = styled.p`
  font-size: 14px;
`;

export const CardFooter = styled(Flex)`
  width: 100%;
  padding: 20px;

  a {
    margin-left: 5px;
  }
`;
