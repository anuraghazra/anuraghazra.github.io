import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import { CreativeCodingWrapper } from './CreativeCoding.style'
import CCProject from "./CCProject";

import Grid from '#common/Grid';
import PageHeader from '#common/PageHeader';

const CreativeCoding = () => {
  const ccprojects = useStaticQuery(
    graphql`
      query {
        allCreativeCoding {
          edges {
            node {
              id
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
          ccprojects.allCreativeCoding.edges.map(({ node }) => <CCProject key={node.id} node={node} />)
        }
      </Grid>

    </CreativeCodingWrapper>
  )
}

export default CreativeCoding;