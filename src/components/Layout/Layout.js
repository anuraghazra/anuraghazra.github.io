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
        <Navbar toggleRef={toggleRef} handleDarkModeToggle={toggleTheme} theme={theme} />

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
