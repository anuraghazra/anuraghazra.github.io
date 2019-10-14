import React from 'react';
import PropTypes from 'prop-types';
import logo from 'src/static/logo.svg';

import Link from "gatsby-link"
import { Link as SLink } from 'react-scroll';

import {
  NavItems,
  NavItem,
} from './Navbar.style';

import NavLinks from './NavLinks';
import ToggleSwitch from 'src/components/common/ToggleSwitch';


const NavDesktop = ({ handleDarkModeToggle, toggleRef }) => {
  return (
    <>
      <SLink className="logo" smooth offset={-100} hashSpy={true} to="home">
        <img src={logo} alt="Anurag Hazra" />
      </SLink>

      <nav>
        <NavItems>
          <NavLinks NavItem={NavItem} />

          <NavItem><Link to="/blog">blog</Link></NavItem>
          <NavItem>
            <ToggleSwitch
              inputRef={toggleRef}
              onChangeInput={handleDarkModeToggle}
            />
          </NavItem>
        </NavItems>
      </nav>
    </>
  )
}

NavDesktop.propTypes = {
  handleDarkModeToggle: PropTypes.func.isRequired,
  toggleRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
}

export default NavDesktop;