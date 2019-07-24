import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';

import Button, { IconButton } from 'src/components/common/Button';
import PageHeader from 'src/components/common/PageHeader';

import IFrame from 'src/components/common/IFrame';

import {
  ProjectContent,
  ProjectDetail,
  ProjectLinks,
  ProjectPreview,
  ProjectWrapper,
} from './ProjectTemplate.style'

const JsProjectsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};

  @media ${props => props.theme.media.tablet} {
    .iframe-wrapper {
      min-height: 400px;
    }
  }
`


// const SmallProjectCard = styled.div`
//   /* because of project links */
//   position: relative;

//   background-color: ${props => props.theme.primaryWhite};
//   border-radius: 10px;
//   padding: 30px;
//   height: 280px;

//   h3 {
//     color: ${props => props.theme.primaryColor};
//     margin-bottom: 5px;
//   }

//   .smallproject__links {
//     position: absolute;
//     bottom: 20px;
//   }
// `
const JsProjects = () => {
  const jsprojects = useStaticQuery(
    graphql`
      query {
        allJsprojectsJson {
          edges {
            node {
              description
              links {
                github
                codepen
                download
              }
              title
            }
          }
        }
      }
    `
  );

  return (
    <JsProjectsWrapper>
      <PageHeader>Javascript Libraries</PageHeader>
      {
        jsprojects.allJsprojectsJson.edges.map(({ node }) => (
          <ProjectWrapper>
            <ProjectContent>
              <ProjectDetail>
                <div className="project__detail-container">
                  <h2>{node.title}</h2>
                  <p>
                    {node.description}
                  </p>
                  <ProjectLinks>
                    <Button as="a" href={node.links.donwload}>Download</Button>
                    <IconButton as="a" href={node.links.github} className="fab fa-github" />
                  </ProjectLinks>
                </div>
              </ProjectDetail>

              <ProjectPreview>
                <IFrame src={node.links.codepen} />
              </ProjectPreview>
            </ProjectContent>
          </ProjectWrapper>
        ))
      }
    </JsProjectsWrapper>
  )
}

export default JsProjects;