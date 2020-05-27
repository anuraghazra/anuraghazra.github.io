import styled, { css } from 'styled-components';

export const MobileMenuWrapper = styled.nav`
  position: fixed;
  bottom: 20px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;

  /* tweaks for small height devices*/
  @media screen and (max-height: 490px) {
    bottom: 15px;
    right: 40px;
  }

  a:focus,
  button:focus {
    outline: 2px solid ${props => props.theme.accentColor};
  }
  a:hover,
  button:hover {
    outline: 2px solid ${props => props.theme.accentColor};
  }
`;

export const FloatingButton = styled.button`
  width: 65px;
  height: 65px;
  background: ${props => props.theme.gradient};
  border-radius: 50%;
  text-align: center;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavItemMobile = styled.li`
  display: inline-block;
  margin: 5px 0;
  text-align: center;
  width: 100%;
  line-height: 130%;

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
    /* color: ${p =>
      p.theme.dark ? p.theme.primaryText : p.theme.primaryColor}; */
  }

  button:hover, a:hover {
    cursor: pointer;
    color: white !important;
  }

  /* tweaks for small height devices*/
  @media screen and (max-height: 600px) {
    margin: 3px 0;
  }
  @media screen and (max-height: 490px) {
    margin: 2px 0;
  }
`;

// export const CircleIconButtonCSS = css`
//   border-radius: 50%;
//   background: ${props => props.theme.gradient};
//   color: white;
//   display: block;
//   width: 60px;
//   height: 60px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 1px 3px 13px 0px rgba(0,0,0,0.1);
//   cursor: pointer;

//   &:hover {
//     color: white !important;
//     transform: scale(1.1);
//     transition: 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//     border: 1px solid ${props => props.theme.accentColor};
//   }
// `

// EXPERIMANTAL BOTTOM NAV
export const NavItemsBottomNav = styled.ul`
  opacity: 0;
  pointer-events: none;
  transform: translate(0, -30px);
  ${p =>
    p.isOpen &&
    css`
      opacity: 1;
      pointer-events: all;
      transform: translate(0, 0px);
    `};

  transition: 0.2s;
  transition-delay: 0.1s;
  will-change: opacity transform;

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

  /* tweaks for small height devices*/
  @media screen and (max-height: 490px) {
    width: 100px;
    bottom: 55px;
  }
`;
