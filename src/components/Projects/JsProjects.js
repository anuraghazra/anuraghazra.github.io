import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import PageHeader from '@common/PageHeader';
import IFrame from '@common/IFrame';
import Button, { IconButton } from '@common/Button';

import { ProjectLinks, ProjectPreview } from './ProjectTemplate.style';
import ProjectTemplate from './ProjectTemplate';

const JsProjectsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`;

const JsProjects = () => {
  const jsprojects = useStaticQuery(
    graphql`
      query {
        allJsprojectsJson {
          edges {
            node {
              description
              title
              id
              links {
                github
                codepen
              }
            }
          }
        }
      }
    `
  );

  return (
    <JsProjectsWrapper>
      <PageHeader>Javascript Libraries</PageHeader>

      {jsprojects.allJsprojectsJson.edges.map(({ node }) => (
        <ProjectTemplate
          key={node.id}
          title={node.title}
          desc={node.description}
          links={
            <ProjectLinks>
              <Button
                target="__blank"
                as="a"
                href={node.links.github + '/archive/master.zip'}
              >
                Download
              </Button>
              <IconButton
                label="github"
                href={node.links.github}
                icon={['fab', 'github']}
              />
            </ProjectLinks>
          }
          preview={
            <ProjectPreview>
              <IFrame livedemo src={node.links.codepen} />
            </ProjectPreview>
          }
        />
      ))}
    </JsProjectsWrapper>
  );
};

export default JsProjects;
