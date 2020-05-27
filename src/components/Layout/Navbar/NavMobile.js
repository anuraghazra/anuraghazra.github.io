import React, { useState, useContext } from 'react';

import Link from 'gatsby-link';

import {
  MobileMenuWrapper,
  FloatingButton,
  NavItemMobile as NavItem,
  NavItemsBottomNav,
} from './NavMobile.style';

import NavLinks from './NavLinks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeToggleContext from '../ThemeToggleContext';
import Burger from './Burger';

const DarkModeButton = () => {
  const { toggleTheme, theme } = useContext(ThemeToggleContext);

  return (
    <>
      <input
        aria-label="toggle theme"
        type="checkbox"
        className="checkbox"
        id="darkmode-input"
        onChange={toggleTheme}
        checked={theme === 'dark' ? true : false}
      />
      <FloatingButton
        as="label"
        role="button"
        aria-label="Toggle Dark Mode"
        htmlFor="darkmode-input"
      >
        <FontAwesomeIcon icon={theme === 'light' ? 'moon' : 'sun'} size="2x" />
      </FloatingButton>
    </>
  );
};

const NavbarMobile = () => {
  const [isMenuOpen, setMenu] = useState(false);

  const handleMenuState = () => {
    setMenu(!isMenuOpen);
  };

  return (
    <>
      <MobileMenuWrapper>
        <FloatingButton onClick={handleMenuState} as="button">
          <Burger isActive={isMenuOpen} />
        </FloatingButton>

        <NavItemsBottomNav isOpen={isMenuOpen}>
          <NavLinks NavItem={NavItem} />

          <NavItem>
            <Link to="/blog">blog</Link>
          </NavItem>
          <NavItem style={{ width: 'auto' }}>
            <DarkModeButton />
          </NavItem>
        </NavItemsBottomNav>
      </MobileMenuWrapper>
    </>
  );
};

export default NavbarMobile;
