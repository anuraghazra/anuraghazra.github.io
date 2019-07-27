import React from 'react';

import { IconButton } from 'src/components/common/Button'
import Image from 'src/components/Image';

import { CCard, CardFooter } from './CreativeCoding.style'

const CCProject = ({ node }) => {
  let img = node.img.replace('https://anuraghazra.github.io/CanvasFun/thumbnails/', '');

  return (
    <CCard key={node.id}>
      <a className="thumbnail-a" href={node.demo}>
        <Image alt={node.title} src={img} />
      </a>
      <CardFooter justify="space-between" align="center" nowrap>
        <h4>{node.title}</h4>
        <div>
          <IconButton label="Live Demo" href={node.demo} icon="window-maximize" />
          <IconButton label="Source Code" href={node.src} icon={["fab", "github"]} />
        </div>
      </CardFooter>
    </CCard>
  )
}


export default CCProject;