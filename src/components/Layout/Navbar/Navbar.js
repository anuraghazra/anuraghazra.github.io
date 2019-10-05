import React, { useState, useEffect } from 'react';

import {
  NavContent,
  NavWrapper
} from './Navbar.style'

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import { Visible } from 'react-grid-system';

const Navbar = (props) => {
  return (
    <>
      <Visible md lg xl>
        <NavWrapper>
          <NavContent as="div">
            <NavDesktop {...props} />
          </NavContent>
        </NavWrapper>
      </Visible>
      {/* out of NavWrapper so i can display:none the NavWrapper */}
      <Visible xs sm>
        <NavMobile {...props} />
      </Visible>
    </>
  )
}

export default Navbar;