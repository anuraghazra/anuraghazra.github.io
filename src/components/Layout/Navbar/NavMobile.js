import React, { useState, useEffect } from 'react';

import Link from "gatsby-link"

import {
  MobileMenuWrapper,
  FloatingButton,
  NavItemMobile as NavItem,
  NavItemsBottomNav
} from './NavMobile.style';

import { Link as SLink } from 'react-scroll';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const NavItemsSmoothLinks = () => (
  <>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="home">home</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="about">about me</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="projects">projects</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="creative-coding">creative coding</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="concepts">concepts</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="contact">contact</SLink></NavItem>
  </>
)

const NavItemsGatsbyLinks = () => (
  <>
    <NavItem><Link to="/">home</Link></NavItem>
    <NavItem><Link to="/#about">about me</Link></NavItem>
    <NavItem><Link to="/#projects">projects</Link></NavItem>
    <NavItem><Link to="/#creative-coding">creative coding</Link></NavItem>
    <NavItem><Link to="/#concepts">concepts</Link></NavItem>
    <NavItem><Link to="/#contact">contact</Link></NavItem>
  </>
)

const NavbarMobile = ({ handleDarkModeToggle, toggleRef, theme }) => {
  const [isMenuOpen, setMenu] = useState(false);
  const [path, setPath] = useState(null);

  const handleMenuState = () => {
    setMenu(!isMenuOpen);
  }

  useEffect(() => {
    setPath(window.location.pathname);
  }, [])

  return (
    <header>
      <nav>
        <MobileMenuWrapper>
          <FloatingButton tabindex="1" onClick={handleMenuState}>
            <FontAwesomeIcon icon={isMenuOpen ? 'times' : 'bars'} size="2x" />
          </FloatingButton>
          <NavItemsBottomNav isOpen={isMenuOpen}>
            {path === '/' ? <NavItemsSmoothLinks /> : <NavItemsGatsbyLinks />}

            <NavItem><Link to="/blog">blog</Link></NavItem>
            <NavItem style={{ width: 'auto' }}>
              <input
                aria-label="toggle theme"
                ref={toggleRef}
                onChange={handleDarkModeToggle}
                type="checkbox"
                className="checkbox"
                id="darkmode-input"
              />
              <label className="darkmode-toggle-btn" aria-label="Toggle Dark Mode" htmlFor="darkmode-input">
                <FontAwesomeIcon icon={theme === 'light' ? 'moon' : 'sun'} size="2x" />
              </label>
            </NavItem>
          </NavItemsBottomNav>
        </MobileMenuWrapper>
      </nav>
    </header>
  )
}

export default NavbarMobile;