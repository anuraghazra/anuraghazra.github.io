import React from "react";
import styled from 'styled-components';

import Tags from 'src/components/Blog/Tags';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo";

import { Row, Col } from 'react-grid-system';
import BlogCard from '../components/Blog/BlogCard';

const BlogsWrapper = styled.section`
  ${p => p.theme.spacing.sectionTopBottom};
`
const BlogPage = () => {
  const blogposts = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: {fields: {posttype: {eq: "blog"}}},
          sort: {fields: frontmatter___date, order: DESC}
        ){
          edges {
            node {
              id
              excerpt
              html
              timeToRead
              frontmatter {
                title
                author
                date(formatString: "MMMM DD, YYYY", locale: "en")
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  return (
    <Layout>
      <SEO title="Blog" />

      <BlogsWrapper>
        <Row gutterWidth={100}>
          <Col sm={12} md={8}>
            {
              blogposts.allMarkdownRemark.edges.map(({ node }) => (
                <BlogCard
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  readtime={node.timeToRead}
                  excerpt={node.excerpt}
                />
              ))
            }
          </Col>
          <Col sm={12} md={4}>
            <div>
              <h4>Random Post</h4>
            </div>
            <div>
              <h4>Tags</h4>
              <Tags />
            </div>
          </Col>
        </Row>
      </BlogsWrapper>
    </Layout>
  )
}

export default BlogPage
