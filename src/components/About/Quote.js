import React from 'react';
import styled from 'styled-components';

const QuoteWrapper = styled.article`
  font-size: 12px;
  padding: 20px;
  margin: 20px 10px;

  border-radius: 10px;
  min-width: 150px;
  flex: 1;

  background-color: ${props => props.theme.primaryWhite};
  color: ${props => props.theme.primaryColor};
  box-shadow: ${props => props.theme.shadowSmall};

  i {
    float: right;
  }
`

const Quote = ({ children }) => (
  <QuoteWrapper>
    {children}
    <br />
    <i>- anurag hazra</i>
  </QuoteWrapper>
)

export default Quote;