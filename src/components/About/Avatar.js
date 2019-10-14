import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Image from "src/components/Image";

const AvatarWrapper = styled.div`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 5px solid #f8f8f8;
  overflow: hidden;
  margin: 0;
  background-color: #f8f8f8;
`
const Avatar = ({ src }) => {
  return (
    <AvatarWrapper>
      <Image style={{ marginTop: -30 }} src={src} />
    </AvatarWrapper>
  )
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired
}

export default Avatar;