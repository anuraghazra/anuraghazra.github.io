import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconLink = (props) => {
  return (
    <a
      target="__blank"
      aria-label={props.label}
      title={props.label}
      className={props.className}
      href={props.href}>
      <FontAwesomeIcon aria-hidden="true" icon={props.icon} />
    </a>
  )
}

export default IconLink;