import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { CreativeCodingWrapper } from './CreativeCoding.style';
import CCProject from './CCProject';

import Grid from '@common/Grid';
import PageHeader from '@common/PageHeader';
import Button from '../common/Button';

const CreativeCoding = () => {
  const [showAll, setShowAll] = useState(false);

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

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <CreativeCodingWrapper id="creative-coding">
      <PageHeader>Creative Coding Projects</PageHeader>

      <Grid collapseHeight="1150px" showAll={showAll}>
        {ccprojects.allCreativeCoding.edges.map(({ node }) => (
          <CCProject key={node.id} node={node} />
        ))}
        {!showAll && (
          <Button onClick={handleShowAll} className="showall__button">
            Show all
          </Button>
        )}
      </Grid>
    </CreativeCodingWrapper>
  );
};

export default CreativeCoding;
