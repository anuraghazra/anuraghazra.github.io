import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconLink = ({ label, className, href, icon }) => {
  return (
    <a
      target="__blank"
      aria-label={label}
      title={label}
      className={className}
      href={href}
    >
      <FontAwesomeIcon aria-hidden="true" icon={icon} />
    </a>
  );
};

IconLink.defaultProps = {
  label: 'Icon Link',
};

IconLink.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default IconLink;
