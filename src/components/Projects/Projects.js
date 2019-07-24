import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import styled from 'styled-components';

import PageHeader from 'src/components/common/PageHeader';
import ProjectTemplate from './ProjectTemplate';

import SmallProjects from './SmallProjects';
import JsProjects from './JsProjects';

const ProjectsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`
const Projects = () => {
  const projects = useStaticQuery(
    graphql`
      query {
        allProjectsJson {
          edges {
            node {
              title
              description
              links {
                demo,
                src,
                video
              }
            }
          }
        }
      }
    `
  )

  return (
    <ProjectsWrapper id="projects" style={{ marginBottom: 100 }}>
      <PageHeader>Side Projects</PageHeader>

      {
        projects.allProjectsJson.edges.map(({ node }) => (
          <ProjectTemplate title={node.title} desc={node.description} links={node.links} />
        ))
      }

      <SmallProjects />
      <JsProjects />

    </ProjectsWrapper>
  )
}

export default Projects;