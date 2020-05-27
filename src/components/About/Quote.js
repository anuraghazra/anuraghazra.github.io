import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuoteWrapper = styled.article`
  position: relative;

  font-size: 12px;
  padding: 20px;
  padding-bottom: 30px;
  margin: 20px 10px;

  border-radius: 10px;
  min-width: 200px;
  flex: 1;

  background-color: ${p =>
    p.theme.dark ? p.theme.accentColor : p.theme.secondaryColor};
  box-shadow: ${props => props.theme.shadowSmall};

  &,
  p {
    color: ${p => (p.theme.dark ? p.theme.primaryText : p.theme.primaryColor)};
  }

  i {
    position: absolute;
    bottom: 20px;
    right: 20px;
    float: right;
  }
`;

const Quote = ({ children }) => (
  <QuoteWrapper>
    {children}
    <br />
    <i>- anurag hazra</i>
  </QuoteWrapper>
);

Quote.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Quote;
