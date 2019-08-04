import React from 'react';
import styled from 'styled-components';

import { useStaticQuery, graphql } from 'gatsby'
import Image from 'src/components/Image';

import PageHeader from 'src/components/common/PageHeader';
import { IconButton } from 'src/components/common/Button';
import {
  CCard as Card,
  Grid,
  CardFooter
} from 'src/components/CreativeCoding/CreativeCoding.style';

const ConceptsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`

const ConceptCard = styled(Card)`
  overflow: hidden;
  height: 300px;

  cursor: pointer;

  &:hover .ccard__footer {
    bottom: 0;
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
`

const ConceptCardFooter = styled(CardFooter)`
  position: absolute;

  bottom: -100px;
  left: 0;
  opacity: 0;
  transition: 0.3s ease-in-out;
  padding: 10px 15px;
  background: ${props => props.theme.secondaryColor};

  @media ${props => props.theme.media.mobile} {
    bottom: 0;
    opacity: 1;
  }
`

const Concepts = () => {
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
        {
          concepts.allConceptsJson.edges.map((nodes, index) => (
            <ConceptCard key={nodes.node.id}>
              <Image
                fluid={concepts.allFile.edges[index].node.childImageSharp.fluid}
                alt={nodes.node.title}
              />
              <ConceptCardFooter
                onClick={e => e.stopPropagation()}
                justify="space-between"
                align="center"
                nowrap
                className="ccard__footer"
              >
                <p>{nodes.node.title}</p>
                <div>
                  <IconButton label="Dribble Shot" href={nodes.node.links.dribbble} icon={["fab", "dribbble"]} />
                  {
                    nodes.node.links.demo &&
                    <IconButton label="Live Demo" href={nodes.node.links.demo} icon="window-maximize" />
                  }
                </div>
              </ConceptCardFooter>
            </ConceptCard>
          ))
        }
      </Grid>
    </ConceptsWrapper>
  )
}

export default Concepts;