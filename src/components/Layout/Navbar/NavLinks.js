import React, { useState, useEffect } from 'react';
import Link from "gatsby-link";
import { Link as SLink } from 'react-scroll';

const NavItemsSmoothLinks = ({ NavItem }) => (
  <>
    <NavItem><SLink smooth hashSpy={true} to="home">home</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="about">about me</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="projects">projects</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="creative-coding">creative coding</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="concepts">concepts</SLink></NavItem>
    <NavItem><SLink smooth offset={-100} hashSpy={true} to="contact">contact</SLink></NavItem>
  </>
)

const NavItemsGatsbyLinks = ({ NavItem }) => (
  <>
    <NavItem><Link to="/">home</Link></NavItem>
    <NavItem><Link to="/#about">about me</Link></NavItem>
    <NavItem><Link to="/#projects">projects</Link></NavItem>
    <NavItem><Link to="/#creative-coding">creative coding</Link></NavItem>
    <NavItem><Link to="/#concepts">concepts</Link></NavItem>
    <NavItem><Link to="/#contact">contact</Link></NavItem>
  </>
)

const NavLinks = ({ NavItem }) => {
  const [path, setPath] = useState(null);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [])

  return (
    <>
      {path === '/' ? <NavItemsSmoothLinks NavItem={NavItem} /> : <NavItemsGatsbyLinks NavItem={NavItem} />}
    </>
  )
}

export default NavLinks;