import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import logo from '../Layout/Navbar/src/static/logo.svg';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  pointer-events: none;
  z-index: 10000000;
  opacity:  ${props => props.isLoading ? 1 : 0};

  img {
    width: 70px;
    height: 70px;
    margin: auto
  }
`;

function PageOverlayLoader({isLoading}) {
  return (
    <Overlay isLoading={isLoading}>
      <img src={logo} alt="loading" />
    </Overlay>
  );
}
export default PageOverlayLoader;