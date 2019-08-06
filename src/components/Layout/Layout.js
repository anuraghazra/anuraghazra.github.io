import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"

import "normalize.css";
import { ThemeProvider } from 'styled-components';
import { themelight, themedark } from './theme';

import Wrapper from "src/components/common/Wrapper";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import GlobalStyle from "src/styles/GlobalStyle";

import 'src/components/fontLib';
import useDarkMode from 'src/hooks/useDarkMode';

const Layout = ({ children }) => {
  const [theme, toggleTheme, toggleRef] = useDarkMode();

  return (
    <ThemeProvider theme={theme === 'light' ? themelight : themedark}>
      <>
        <GlobalStyle />
        <Navbar toggleRef={toggleRef} handleDarkModeToggle={toggleTheme} />

        <button onClick={toggleTheme}>toggle-theme</button>
        <Wrapper style={{ marginTop: 100, marginBottom: 50, minHeight: 'calc(100vh - 125px)' }}>{children}</Wrapper>
        <Footer />
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
