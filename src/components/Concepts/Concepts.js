import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'src/components/Image';

const Concepts = () => {
  const concepts = useStaticQuery(
    graphql`
      query {
        allConceptsJson {
          edges {
            node {
              brief
              title
              links {
                image
                dribbble
              }
            }
          }
        }
      }
    `
  )

  return (
    <div>
      {concepts.allConceptsJson.edges.map(({ node }) => (
        <>
          <h2>{node.title}</h2>
          <p>
            {node.brief}
          </p>
          <ul>
            <li>
              <a href={node.links.dribbble}>dribbble</a>
            </li>
            {node.links.image &&
              <li>
                <Image src={node.links.image} />
              </li>
            }
          </ul>
        </>
      ))}
    </div>
  )
}

export default Concepts;