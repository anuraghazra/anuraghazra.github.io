import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import IFrame from 'src/components/common/IFrame';

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
    <div>
      {projects.allProjectsJson.edges.map(({ node }) => (
        <>
          <h2>{node.title}</h2>
          <p>
            {node.desc}
          </p>

          <ul>
            <li><a href={node.links.demo}>Demo</a></li>
            <li><a href={node.links.src}>Source</a></li>
            {node.links.video &&
              <li>
                <IFrame src={node.links.video} />
              </li>
            }
          </ul>
        </>
      ))}
    </div>
  )
}

export default Projects;