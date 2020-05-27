import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  flex-wrap: ${props => (props.nowrap ? 'no-wrap' : 'wrap')};
`;

export default Flex;
