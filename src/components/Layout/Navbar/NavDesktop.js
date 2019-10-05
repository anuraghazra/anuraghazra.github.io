import React, { useState, useEffect } from 'react';
import logo from 'src/static/logo.svg';

import Link from "gatsby-link"
import {
  NavItems,
  NavItem,
} from './Navbar.style';

import { Link as SLink } from 'react-scroll';

import ToggleSwitch from 'src/components/common/ToggleSwitch';


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

const NavDesktop = ({ handleDarkModeToggle, toggleRef }) => {
  const [path, setPath] = useState(null);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [])

  return (
    <>
      <SLink className="logo" smooth offset={-100} hashSpy={true} to="home">
        <img src={logo} alt="Anurag Hazra" />
      </SLink>

      <nav>
        <NavItems>
          {path === '/' ? <NavItemsSmoothLinks /> : <NavItemsGatsbyLinks />}

          <NavItem><Link to="/blog">blog</Link></NavItem>
          <NavItem><ToggleSwitch inputRef={toggleRef} onChangeInput={handleDarkModeToggle} /></NavItem>
        </NavItems>
      </nav>
    </>
  )
}

export default NavDesktop;