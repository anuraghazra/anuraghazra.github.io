import React from "react"
import PropTypes from "prop-types"

import "normalize.css";
import { ThemeProvider } from 'styled-components';


import Wrapper from "src/components/common/Wrapper";
import Navbar from "src/components/Navbar/Navbar";
import GlobalStyle from "src/styles/GlobalStyle";

const sizes = {
  mobile: "480px",
  tablet: "768px",
  fablet: "1000px",
  desktop: "1200px",
};

const theme = {
  primaryColor: '#6D83F2',
  secondaryColor: '#6A98F0',
  accentColor: '#C7D0FF',
  primaryBlack: '#383838',
  primaryWhite: '#F8F8F8',
  gradient: 'linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)',
  gradient2: 'linear-gradient(99deg, #6A98F0 0%, #4961DC 130%)',
  shadow: '0px 10px 100px rgba(0, 0, 0, 0.2)',
  shadowSmall: '0px 20px 200px rgba(0, 0, 0, 0.15)',
  fontFamily: '"Montserrat", sans-serif',
  secondaryFontFamily: '"Karla", sans-serif',
  spacing: {
    sectionBottom: 'margin-bottom: 100px',
    sectionTop: 'margin-top: 100px',
  },
  media: {
    mobile: `(max-width: ${sizes.mobile})`,
    tablet: `(max-width: ${sizes.tablet})`,
    fablet: `(max-width: ${sizes.fablet})`,
    desktop: `(max-width: ${sizes.desktop})`,
  }
}

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Navbar />

        <Wrapper style={{ marginTop: 70 }}>{children}</Wrapper>
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
