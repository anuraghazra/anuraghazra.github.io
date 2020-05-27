import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { themelight, themedark, themedarkblue } from './theme';

import Wrapper from '@common/Wrapper/';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import GlobalStyle from '@src/styles/GlobalStyle';

import '@components/fontLib';
import useDarkMode from '@src/hooks/useDarkMode';
import ThemeToggleContext from './ThemeToggleContext';

import { setConfiguration } from 'react-grid-system';
setConfiguration({ breakpoints: [576, 769, 992, 1200] });

const RootWrapper = styled(Wrapper)`
  margin-top: 100px;
  margin-bottom: 50px;
  min-height: calc(100vh - 125px);

  @media ${props => props.theme.media.tablet} {
    margin-top: 50px;
  }
`;

const Layout = ({ children }) => {
  const [theme, toggleTheme, toggleRef] = useDarkMode();

  let currentTheme = theme === 'light' ? themelight : themedark;
  if (theme === 'darkblue') {
    currentTheme = themedarkblue;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <>
        <GlobalStyle />

        <ThemeToggleContext.Provider value={{ theme, toggleTheme, toggleRef }}>
          <Navbar />
        </ThemeToggleContext.Provider>

        <RootWrapper>{children}</RootWrapper>
        <Footer />
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
