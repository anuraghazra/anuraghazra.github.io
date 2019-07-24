import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import styled from 'styled-components';
import PageHeader from 'src/components/common/PageHeader';

import Flex from 'src/components/common/Flex'
import { IconButton } from 'src/components/common/Button'
import { Card } from 'src/components/common/Card';
import Image from 'src/components/Image'

const CreativeCodingWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
  grid-row-gap: 50px;
`

const CCard = styled(Card)`
  justify-self: center;

  margin: 0;
  position: relative;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  min-width: unset;
  width: 100%;

  height: auto;
  max-width: 90%;


  transform: scale(1.0);
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    transform: scale(1.05);
  }

  h4 {
    color: ${props => props.theme.primaryBlack};
    font-weight: normal;
  }
  .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height:100%;
    border-radius: 10px;
  }
  
  .thumbnail-a {
    width: 100%;
    height: 100%;
  }
`
const CardFooter = styled(Flex)`
  width: 100%;
  padding: 20px;

  a {
    margin-left: 5px;
  }
`

const CreativeCoding = () => {
  const ccprojects = useStaticQuery(
    graphql`
      query {
        allCreativeCoding {
          edges {
            node {
              demo
              img
              title
              src
            }
          }
        }
      }
    `
  );

  return (
    <CreativeCodingWrapper id="creative-coding">
      <PageHeader>Creative Coding Projects</PageHeader>

      <Grid>
        {
          ccprojects.allCreativeCoding.edges.map(({ node }) => {
            let img = node.img.replace('https://anuraghazra.github.io/CanvasFun/thumbnails/', '');
            return (
              <CCard>
                <a class="thumbnail-a" href={node.demo}><Image alt={node.title} src={img} /></a>
                <CardFooter justify="space-between" align="center" nowrap>
                  <h4>{node.title}</h4>
                  <div>
                    <IconButton title="Live Demo" as="a" href={node.demo}><i className="fas fa-window-maximize" /></IconButton>
                    <IconButton title="Source Code" as="a" href={node.src}><i className="fab fa-github" /></IconButton>
                  </div>
                </CardFooter>
              </CCard>
            )
          })
        }
      </Grid>

    </CreativeCodingWrapper>
  )
}

export default CreativeCoding;