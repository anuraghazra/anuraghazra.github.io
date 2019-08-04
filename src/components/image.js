import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const Image = ({ src, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile( filter: { internal: { mediaType: { regex: "/image/" } } } ) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(quality: 90, maxWidth: 2000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const match = data.allFile.edges.find(({ node }) => node.relativePath.match(src));

  let isValid = match && match.node.childImageSharp;
  return (
    isValid ?
    <Img
      fluid={match.node.childImageSharp.fluid}
      {...props}
    />
    : null
  )
}

export default Image