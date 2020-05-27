import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageHeader from '@common/PageHeader';
import IFrame from '@common/IFrame';
import Button, { IconButton } from '@common/Button';

import SmallProjects from './SmallProjects';
import JsProjects from './JsProjects';

import ProjectTemplate from './ProjectTemplate';
import { ProjectLinks, ProjectPreview, Tags } from './ProjectTemplate.style';

const ProjectsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`;
const Projects = () => {
  const projects = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { fields: { posttype: { eq: "case-studies" } } }
          sort: { fields: fields___fileIndex, order: ASC }
        ) {
          edges {
            node {
              id
              frontmatter {
                demo
                excerpt
                iframe
                src
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  return (
    <ProjectsWrapper id="projects" style={{ marginBottom: 100 }}>
      <PageHeader>Side Projects</PageHeader>

      {projects.allMarkdownRemark.edges.map(({ node }) => (
        <ProjectTemplate
          key={node.id}
          title={node.frontmatter.title}
          desc={node.frontmatter.excerpt}
          links={
            <ProjectLinks>
              <Button as={Link} to={node.fields.slug}>
                Case Study
              </Button>
              <Button target="__blank" as="a" href={node.frontmatter.demo}>
                Live Demo
              </Button>
              <IconButton
                label="github"
                icon={['fab', 'github']}
                href={node.frontmatter.src}
              />
            </ProjectLinks>
          }
          preview={
            <ProjectPreview>
              <IFrame
                livedemo={!!node.frontmatter.iframe.match('codepen')}
                src={node.frontmatter.iframe}
              />
              <Tags>
                <FontAwesomeIcon icon={['fab', 'js']} />
                <FontAwesomeIcon icon={['fab', 'html5']} />
                <FontAwesomeIcon icon={['fab', 'css3']} />
              </Tags>
            </ProjectPreview>
          }
        />
      ))}

      <SmallProjects />
      <JsProjects />
    </ProjectsWrapper>
  );
};

export default Projects;
