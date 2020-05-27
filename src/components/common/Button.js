import styled, { css } from 'styled-components';
import IconLink from './IconLink';

const common = css`
  background: ${props => props.theme.gradient};
  color: #f8f8f8;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    color: #f8f8f8;
    background: ${props => props.theme.gradient2};
    transform: scale(1.05);
    transition: 0.2s;
  }
`;

const Button = styled.button`
  ${common};
  width: ${props => (props.width ? props.width : 'auto')};
  height: ${props => (props.height ? props.width : 'auto')};
  font-size: 12px;
  margin: 0px 0;
  padding: 12px 12px;
  border-radius: ${props => (props.round ? '50%' : '5px')};
`;

export const IconButton = styled(IconLink)`
  ${common};
  display: inline-block;
  /* max-width: 40px;
  max-height: 40px; */
  font-size: 18px;
  text-align: center;
  line-height: 0;
  padding: 10px;
  margin: 0px 0;
  border-radius: 50%;
  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
    transition: 0.2s;
  }
`;

export default Button;
