import React from 'react';
import styled from 'styled-components';
import Image from "src/components/Image";

const AvatarWrapper = styled.div`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 5px solid ${props => props.theme.primaryWhite};
  overflow: hidden;
  margin: 0;
  background-color: ${props => props.theme.primaryWhite};
`
const Avatar = ({ src }) => {
  return (
    <AvatarWrapper>
      <Image style={{ marginTop: -30 }} src={src} />
    </AvatarWrapper>
  )
}

export default Avatar;