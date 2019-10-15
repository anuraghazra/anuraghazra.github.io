import React from "react"
import styled from 'styled-components';
import PropTypes from "prop-types"
import { ParallaxProvider } from 'react-scroll-parallax';

import "normalize.css";
import { ThemeProvider } from 'styled-components';
import { themelight, themedark } from './theme';

import Wrapper from "src/components/common/Wrapper";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import GlobalStyle from "src/styles/GlobalStyle";

import 'src/components/fontLib';
import useDarkMode from 'src/hooks/useDarkMode';
import ThemeToggleContext from "./ThemeToggleContext";

import { setConfiguration } from 'react-grid-system';
setConfiguration({ breakpoints: [576, 769, 992, 1200] });

const RootWrapper = styled(Wrapper)`
  margin-top: 100px;
  margin-bottom: 50px;
  min-height: calc(100vh - 125px);

  @media ${props => props.theme.media.tablet} {
    margin-top: 50px;
  }
`


const Layout = ({ children }) => {
  const [theme, toggleTheme, toggleRef] = useDarkMode();

  return (
    <ThemeProvider theme={theme === 'light' ? themelight : themedark}>
      <>
        <GlobalStyle />

        <ThemeToggleContext.Provider value={{ theme, toggleTheme, toggleRef }}>
          <Navbar />
        </ThemeToggleContext.Provider>

        <ParallaxProvider>
          <RootWrapper>{children}</RootWrapper>
        </ParallaxProvider>
        <Footer />
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
