import React from "react"
import { graphql } from "gatsby";

import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo";

import BlogCard from '../components/Blog/BlogCard';
import Tags from 'src/components/Blog/Tags';

import { Row, Col } from 'react-grid-system';

const TagsPage = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;

  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tag}"`

  return (
    <Layout>
      <SEO title={tagHeader} />
      <h1>{tagHeader}</h1>

      <Row gutterWidth={100}>
        <Col sm={12} md={8}>
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title, date } = node.frontmatter;
            return (
              <BlogCard
                slug={slug}
                title={title}
                date={date}
                readtime={node.timeToRead}
                excerpt={node.excerpt}
              />
            )
          })}
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

    </Layout>
  )
}
export default TagsPage;


export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          html
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY", locale: "en")
          }
        }
      }
    }
  }
`