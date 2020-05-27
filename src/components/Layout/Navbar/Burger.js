import React from 'react';
import styled from 'styled-components';

const CollapseBurger = styled.div`
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  &:hover {
    opacity: 0.7;
  }
  &.is-active:hover {
    opacity: 0.7;
  }

  .hamburger-box {
    width: 29px;
    height: 26px;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: 0px;
  }
  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 29px;
    height: 4px;
    background-color: white;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: '';
    display: block;
  }
  .hamburger-inner::before {
    top: -10px;
  }
  .hamburger-inner::after {
    bottom: -10px;
  }

  /*
   * Collapse Reverse
   */
  & .hamburger-inner {
    top: auto;
    bottom: 0;
    transition-duration: 0.13s;
    transition-delay: 0.13s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  & .hamburger-inner::after {
    top: -20px;
    transition: top 0.2s 0.2s cubic-bezier(0.3, 0.6, 0.6, 1),
      opacity 0.1s linear;
  }
  & .hamburger-inner::before {
    transition: top 0.12s 0.2s cubic-bezier(0.3, 0.6, 0.6, 1),
      transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  &.is-active .hamburger-inner {
    transform: translate3d(0, -10px, 0) rotate(45deg);
    transition-delay: 0.22s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.35, 1);
  }
  &.is-active .hamburger-inner::after {
    top: 0;
    opacity: 0;
    transition: top 0.2s cubic-bezier(0.3, 0, 0.6, 0.3),
      opacity 0.1s 0.22s linear;
  }
  &.is-active .hamburger-inner::before {
    top: 0;
    transform: rotate(90deg);
    transition: top 0.1s 0.16s cubic-bezier(0.3, 0, 0.6, 0.3),
      transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.35, 1);
  }
`;

const Burger = ({ isActive }) => {
  return (
    <CollapseBurger
      className={`hamburger--collapse-r ${isActive ? 'is-active' : ''}`}
    >
      <div className="hamburger-box">
        <div className="hamburger-inner"></div>
      </div>
    </CollapseBurger>
  );
};

export default Burger;
