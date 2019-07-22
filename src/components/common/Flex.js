import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.justify};
  align-items: ${props => props.items};
  flex-wrap: wrap;
`

export default Flex;