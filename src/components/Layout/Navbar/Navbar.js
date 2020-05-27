import React from 'react';

import { NavContent, NavWrapper } from './Navbar.style';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

import { Visible } from 'react-grid-system';

const Navbar = () => {
  return (
    <header>
      <NavWrapper>
        <NavContent as="div">
          <Visible md lg xl>
            <NavDesktop />
          </Visible>
        </NavContent>
      </NavWrapper>
      {/* out of NavWrapper so i can display:none the NavWrapper */}
      <Visible xs sm>
        <NavMobile />
      </Visible>
    </header>
  );
};

export default Navbar;
