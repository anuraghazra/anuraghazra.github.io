import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby'

import Img from 'gatsby-image';
import PageHeader from 'src/components/common/PageHeader';
import { IconButton } from 'src/components/common/Button';

import { Grid } from 'src/components/CreativeCoding/CreativeCoding.style';
import {
  ConceptsWrapper,
  ConceptCard,
  ConceptCardFooter,
  Lightbox,
  LightBoxCloseButton
} from './Concepts.style';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapInteractionCSS } from 'react-map-interaction';


const Card = React.memo(({ nodes, currentImg, openLightbox }) => (
  <ConceptCard>
    <div style={{ width: '100%', height: '100%' }} onClick={() => openLightbox(currentImg)}>
      <Img
        fluid={currentImg.node.childImageSharp.fluid}
        alt={nodes.node.title}
      />
    </div>

    <ConceptCardFooter
      nowrap
      align="center"
      justify="space-between"
      className="ccard__footer"
      onClick={e => e.stopPropagation()}
    >
      <p>{nodes.node.title}</p>
      <div>
        <IconButton
          label="Dribble Shot"
          href={nodes.node.links.dribbble}
          icon={["fab", "dribbble"]}
        />
        {
          nodes.node.links.demo &&
          <IconButton
            label="Live Demo"
            href={nodes.node.links.demo}
            icon="window-maximize"
          />
        }
      </div>
    </ConceptCardFooter>
  </ConceptCard>
))



const Concepts = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = React.useCallback((img) => {
    setSelectedImg(img);
    setLightboxOpen(true);
  }, [])

  function closeLightBox(e) {
    if (e.target.tagName !== 'IMG') {
      setSelectedImg(null);
      setLightboxOpen(false);
    }
  }

  const concepts = useStaticQuery(
    graphql`
      query {
        allConceptsJson(sort: {fields: links___image}) {
          edges {
            node {
              id
              description
              title
              links {
                demo
                image
                dribbble
              }
            }
          }
        }
        allFile(filter: {name: {regex: "/concept_/"}}, sort: {fields: name}) {
          edges {
            node {
              relativePath
              childImageSharp {
                fluid(quality: 90, maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );

  return (
    <ConceptsWrapper id="concepts">
      <PageHeader>Concepts</PageHeader>
      <Grid>
        {concepts.allConceptsJson.edges.map((nodes, index) => {
          let currentImg = concepts.allFile.edges[index];
          return <Card key={nodes.node.id} nodes={nodes} currentImg={currentImg} openLightbox={openLightbox} />
        })}
      </Grid>

      {isLightboxOpen &&
        <Lightbox onClick={closeLightBox}>
          <MapInteractionCSS>
            <Img className="lightbox__gatsbyimage" fluid={selectedImg.node.childImageSharp.fluid} />
          </MapInteractionCSS>

          <LightBoxCloseButton tabindex="1" onClick={closeLightBox} aria-label="Close Lightbox">
            <FontAwesomeIcon icon="times" size="2x" />
          </LightBoxCloseButton>
        </Lightbox>
      }
    </ConceptsWrapper>
  )
}

Card.propTypes = {
  nodes: PropTypes.object.isRequired,
  currentImg: PropTypes.object.isRequired,
  openLightbox: PropTypes.func.isRequired
}

export default Concepts;