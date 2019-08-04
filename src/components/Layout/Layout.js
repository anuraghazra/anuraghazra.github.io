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

const Layout = ({ children }) => {
  const toggleRef = useRef();
  let [theme, setTheme] = useState('light');

  useEffect(() => {
    let savedTheme = localStorage.getItem('anuraghazra-site-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      toggleRef.current.checked = savedTheme === 'dark' ? true : false;
    }
  }, [])

  const handleToggleTheme = (e) => {
    let checked = e.target.checked;
    setTheme(() => checked ? 'dark' : 'light');
    localStorage.setItem('anuraghazra-site-theme', checked ? 'dark' : 'light');
  }

  return (
    <ThemeProvider theme={theme === 'light' ? themelight : themedark}>
      <>
        <GlobalStyle />
        <Navbar toggleRef={toggleRef} handleDarkModeToggle={handleToggleTheme} />

        <button onClick={handleToggleTheme}>toggle-theme</button>
        <Wrapper style={{ marginTop: 100, marginBottom: 50,  minHeight: 'calc(100vh - 125px)' }}>{children}</Wrapper>
      
        <Footer />
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
