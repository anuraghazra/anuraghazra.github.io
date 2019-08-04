import React from "react";
import { graphql } from "gatsby"

import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo";

const BlogPost = ({ data }) => {
  const post = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>

      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug : String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY", locale: "en")
        title
      }
    }
  }
`

export default BlogPost
