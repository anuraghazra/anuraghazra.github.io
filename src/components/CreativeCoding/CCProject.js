import React from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@common/Button';
import { CardFooter } from '@common/Card';

import Image from '@components/Image';
import { CCard } from './CreativeCoding.style';

const CCProject = ({ node }) => {
  let img = node.img.replace(
    'https://anuraghazra.github.io/CanvasFun/thumbnails/',
    ''
  );
  return (
    <CCard key={node.id}>
      <a
        name={node.title}
        aria-label={node.title}
        className="thumbnail-a"
        href={node.demo}
        target="__blank"
      >
        <Image alt={node.title} src={img} />
      </a>
      <CardFooter justify="space-between" align="center" nowrap>
        <h4>{node.title}</h4>
        <div>
          <IconButton
            label={`Live Demo - ${node.title}`}
            href={node.demo}
            icon="window-maximize"
          />
          <IconButton
            label={`Source Code - ${node.title}`}
            href={node.src}
            icon={['fab', 'github']}
          />
        </div>
      </CardFooter>
    </CCard>
  );
};

CCProject.propTypes = {
  node: PropTypes.exact({
    demo: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CCProject;
