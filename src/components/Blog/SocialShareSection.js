import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialShareSection = ({ baseSlugUrl, title }) => {
  const fbShareLink = `https://facebook.com/sharer/sharer.php?u=${baseSlugUrl}`;
  const twShareLink = `http://twitter.com/share?text="${title}" - &url=${baseSlugUrl}`;
  const rdShareLink = `http://www.reddit.com/submit?url=${baseSlugUrl}&title=${title}`;

  return (
    <div className="blog__social-share">
      <a
        aria-label="share on facebook"
        rel="noopener norefferer"
        target="__blank"
        href={fbShareLink}
      >
        <FontAwesomeIcon style={{ fontSize: 24 }} icon={['fab', 'facebook']} />
      </a>
      <a
        aria-label="share on twitter"
        rel="noopener norefferer"
        target="__blank"
        href={twShareLink}
      >
        <FontAwesomeIcon style={{ fontSize: 24 }} icon={['fab', 'twitter']} />
      </a>
      <a
        aria-label="share on reddit"
        rel="noopener norefferer"
        target="__blank"
        href={rdShareLink}
      >
        <FontAwesomeIcon style={{ fontSize: 24 }} icon={['fab', 'reddit']} />
      </a>
    </div>
  );
};

SocialShareSection.propTypes = {
  baseSlugUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SocialShareSection;
