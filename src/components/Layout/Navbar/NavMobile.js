import React, { useState } from 'react';

import Link from "gatsby-link"

import {
  MobileMenuWrapper,
  FloatingButton,
  NavItemMobile as NavItem,
  NavItemsBottomNav
} from './NavMobile.style';

import NavLinks from './NavLinks';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkModeButton = ({ toggleRef, handleDarkModeToggle, theme }) => (
  <>
    <input
      aria-label="toggle theme"
      ref={toggleRef}
      onChange={handleDarkModeToggle}
      type="checkbox"
      className="checkbox"
      id="darkmode-input"
    />
    <label role="button" className="darkmode-toggle-btn" aria-label="Toggle Dark Mode" htmlFor="darkmode-input">
      <FontAwesomeIcon icon={theme === 'light' ? 'moon' : 'sun'} size="2x" />
    </label>
  </>
)


const NavbarMobile = ({ handleDarkModeToggle, toggleRef, theme }) => {
  const [isMenuOpen, setMenu] = useState(false);

  const handleMenuState = () => {
    setMenu(!isMenuOpen);
  }

  return (
    <>
      <MobileMenuWrapper>
        <FloatingButton tabindex="1" onClick={handleMenuState}>
          <FontAwesomeIcon icon={isMenuOpen ? 'times' : 'bars'} size="2x" />
        </FloatingButton>
        
        <NavItemsBottomNav isOpen={isMenuOpen}>
          <NavLinks NavItem={NavItem} />

          <NavItem><Link to="/blog">blog</Link></NavItem>
          <NavItem style={{ width: 'auto' }}>
            <DarkModeButton
              handleDarkModeToggle={handleDarkModeToggle}
              toggleRef={toggleRef}
              theme={theme}
            />
          </NavItem>
        </NavItemsBottomNav>
      </MobileMenuWrapper>
    </>
  )
}

export default NavbarMobile;