import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  NavContent,
  NavWrapper
} from './Navbar.style'

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

import { Visible } from 'react-grid-system';

const Navbar = (props) => {
  return (
    <header>
      <NavWrapper>
        <NavContent as="div">
          <NavDesktop {...props} />
        </NavContent>
      </NavWrapper>
      {/* out of NavWrapper so i can display:none the NavWrapper */}
      <Visible xs sm>
        <NavMobile {...props} />
      </Visible>
    </header>
  )
}

Navbar.propTypes = {
  handleDarkModeToggle: PropTypes.func.isRequired,
  toggleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  theme: PropTypes.string.isRequired,
}


export default Navbar;