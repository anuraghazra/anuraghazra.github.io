import styled from 'styled-components';
import Wrapper from 'src/components/common/Wrapper';

export const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  
  display: flex;
  align-items: center;

  height: 60px;
  width: 100%;
  
  background-color: ${props => props.theme.primaryWhite};
  box-shadow: ${props => props.theme.shadowSmall};
  z-index: 1000;

  .logo {
    max-width: 35px;
    flex-basis: 100px;
  }
`;

export const NavItems = styled.ul`
  margin: 0;
  list-style: none;
  display: flex;
  font-size: 14px;
  transition: 0.2s;

  @media ${props => props.theme.media.tablet} {
    position: fixed;
    top: 60px;
    height: 100vh;
    flex-direction: column;

    background-color: ${props => props.theme.primaryWhite};
    border-top: 2px solid ${props => props.theme.accentColor};
    right: ${props => props.isSidebarOpen ? '0px' : '-200px'};
  }
`;

export const NavItem = styled.li`
  margin-left: 30px;
  display: inline-block;
  &:hover {
    cursor: pointer;
    color: #6D83F2
  }

  @media ${props => props.theme.media.tablet} {
    margin-top: 25%;
    margin-right: 50px;
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
  transition: .5s ease-in-out;
  
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
    transition: .25s ease-in-out;
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