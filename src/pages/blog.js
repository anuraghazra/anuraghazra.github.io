import React from "react";
import { useStaticQuery, graphql } from 'gatsby';

import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo";

import BlogCard from '../components/Blog/BlogCard';
import BlogLayout from 'src/components/BlogLayout';

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
              timeToRead
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY", locale: "en")
                tags
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

      <BlogLayout>
        {
          blogposts.allMarkdownRemark.edges.map(({ node }) => (
            <BlogCard
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              tags={node.frontmatter.tags}
              readtime={node.timeToRead}
              excerpt={node.excerpt}
            />
          ))
        }
      </BlogLayout>
    </Layout>
  )
}

export default BlogPage
