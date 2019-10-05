import styled, { css } from 'styled-components';

export const MobileMenuWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`

export const FloatingButton = styled.button`
  width: 65px;
  height: 65px;
  background: ${props => props.theme.gradient};
  border-radius: 50%;
  text-align: center;
  padding: 20px 0;
  color: white;
  border: none;
  
  &:focus {
    outline: none;
    /* border: 2px solid ${p => p.theme.accentColor} outset; */
  }
`

export const NavItemMobile = styled.li`
  display: inline-block;
  margin: 5px 0;
  text-align: center;
  width: 100%;

  a {
    width: 100%;
    display: block;
    word-break: normal;
    padding: 10px;
    font-weight: 300;
    background: ${props => props.theme.gradient};
    color: white;
    border-radius: 5px;
    box-shadow: 1px 3px 13px 0px rgba(0,0,0,0.1);
    transform: scale(1.0);
    /* color: ${p => p.theme.dark ? p.theme.primaryText : p.theme.primaryColor}; */
    transition: 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  a:hover {
    cursor: pointer;
    color: white !important;
    transform: scale(1.1);
    transition: 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

// EXPERIMANTAL BOTTOM NAV
export const NavItemsBottomNav = styled.ul`
  opacity: 0;
  pointer-events: none;
  transform:  translate(0, -50px);
  ${p => p.isOpen && css`
    opacity: 1;
    pointer-events: all;
    transform:  translate(0, 0px);
  `};

  transition: 0.3s;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  position: absolute;
  bottom: 60px;
  padding: 0;
  
  #darkmode-input {
    display: none;
  }
  .darkmode-toggle-btn {
    border-radius: 50%;
    background: ${props => props.theme.gradient};
    color: white;
    display: block;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 3px 13px 0px rgba(0,0,0,0.1);
  }
`



