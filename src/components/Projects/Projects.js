import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PageHeader from 'src/components/common/PageHeader';

import SmallProjects from './SmallProjects';
import JsProjects from './JsProjects';

import IFrame from 'src/components/common/IFrame';
import Button, { IconButton } from 'src/components/common/Button';

import ProjectTemplate from './ProjectTemplate';
import { ProjectLinks, ProjectPreview, Tags } from './ProjectTemplate.style';

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
              id
              title
              description
              links {
                demo,
                src,
                iframe
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
          <ProjectTemplate
            key={node.id}
            title={node.title}
            desc={node.description}
            links={
              <ProjectLinks>
                <Button target="__blank" as="a" href="/">Case Study</Button>
                <Button target="__blank" as="a" href={node.links.demo}>Live Demo</Button>
                <IconButton label="github" icon={["fab", "github"]} href={node.links.src} />
              </ProjectLinks>
            }
            preview={
              <ProjectPreview>
                <IFrame livedemo={!!node.links.iframe.match('codepen')} src={node.links.iframe} />
                <Tags>
                  <FontAwesomeIcon icon={["fab", "js"]} />
                  <FontAwesomeIcon icon={["fab", "html5"]} />
                  <FontAwesomeIcon icon={["fab", "css3"]} />
                </Tags>
              </ProjectPreview>
            }
          />
        ))
      }

      <SmallProjects />
      <JsProjects />

    </ProjectsWrapper>
  )
}

export default Projects;