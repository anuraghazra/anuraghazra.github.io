import React from 'react';


const IconLink = ({ href, icon, className }) => {
  return (
    <a className={className} href={href}><i className={icon} /></a>
  )
}

export default IconLink;