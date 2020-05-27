import styled from 'styled-components';
import Wrapper from '@common/Wrapper';

export const NavWrapper = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  align-items: center;

  height: 60px;
  width: 100vw;

  background-color: ${props => props.theme.secondaryColor};
  box-shadow: ${props => props.theme.shadowSmall};
  z-index: 1000;

  .logo {
    margin-right: auto;
    cursor: pointer;

    img {
      flex-basis: 100px;
      max-width: 35px;
    }
  }

  @media ${props => props.theme.media.tablet} {
    display: none;
  }
`;

export const NavItems = styled.ul`
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  transition: 0.2s;

  @media ${props => props.theme.media.tablet} {
    padding: 0 30px;
    position: fixed;
    top: 60px;
    height: 100vh;
    flex-direction: column;
    align-items: initial;

    background-color: ${props => props.theme.secondaryColor};
    border-top: 2px solid ${props => props.theme.accentColor};
    right: ${props => (props.isSidebarOpen ? '0px' : '-250px')} !important;
  }
`;

export const NavItem = styled.li`
  margin-left: 30px;
  display: inline-block;
  text-align: center;
  
  a {
    /* color: ${p => p.theme.swapIfDark('primaryText', 'primaryColor')}; */
    color: ${p => (p.theme.dark ? p.theme.primaryText : p.theme.primaryColor)};
  }

  a:hover {
    cursor: pointer;
    color: ${p => (p.theme.dark ? p.theme.primaryColor : p.theme.primaryText)};
  }

  @media ${props => props.theme.media.tablet} {
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 10px;
    }
    margin-top: 25%;
    margin-left: 0;
  }
`;

export const NavContent = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Burger = styled.div`
  width: 30px;
  height: 25px;

  transform: rotate(0deg);
  transition: 0.5s ease-in-out;

  display: none;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.primaryColor};
    border-radius: 10px;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    opacity: 1;
  }

  & span:nth-child(1) {
    top: 0px;
  }

  & span:nth-child(2) {
    top: 10px;
  }

  & span:nth-child(3) {
    top: 20px;
  }

  &.open span:nth-child(1) {
    top: 10px;
    transform: rotate(135deg);
  }

  &.open span:nth-child(2) {
    opacity: 0;
    left: -20px;
  }

  &.open span:nth-child(3) {
    top: 10px;
    transform: rotate(-135deg);
  }

  @media ${props => props.theme.media.tablet} {
    display: block;
  }
`;
