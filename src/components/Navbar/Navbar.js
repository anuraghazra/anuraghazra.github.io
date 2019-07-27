import React, { useState } from 'react';
import logo from 'src/static/logo.svg';

import { Burger, NavContent, NavItems, NavItem, NavWrapper } from './Navbar.style'
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isSidebarOpen, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(prev => !prev);
  }

  return (
    <NavWrapper>
      <NavContent as="div">
      <Link smooth offset={-55} hashSpy={true} to="home"><img className="logo" src={logo} alt="Anurag Hazra" /></Link>

        <Burger onClick={handleSidebar} className={isSidebarOpen ? 'open' : ''}>
          <span></span>
          <span></span>
          <span></span>
        </Burger>

        <nav>
          <NavItems isSidebarOpen={isSidebarOpen}>
            <NavItem><Link smooth offset={-55} hashSpy={true} to="home">home</Link></NavItem>
            <NavItem><Link smooth offset={-100} hashSpy={true} to="about">about me</Link></NavItem>
            <NavItem><Link smooth offset={-100} hashSpy={true} to="projects">projects</Link></NavItem>
            <NavItem><Link smooth offset={-100} hashSpy={true} to="creative-coding">creative coding</Link></NavItem>
            <NavItem><Link smooth offset={-100} hashSpy={true} to="concepts">concepts</Link></NavItem>
            <NavItem><Link smooth offset={-100} hashSpy={true} to="contact">contact</Link></NavItem>
          </NavItems>
        </nav>

      </NavContent>
    </NavWrapper>
  )
}

export default Navbar;