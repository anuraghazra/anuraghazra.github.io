import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.theme.gradient};
  color: ${props => props.theme.primaryWhite};

  font-size: 12px;
  margin: 30px 0;
  padding: 12px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`


export default Button;