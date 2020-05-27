import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';

import BlogCard from '@components/Blog/BlogCard';
import BlogLayout from '@components/Blog/BlogLayout';

const BlogPage = () => {
  const blogposts = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { fields: { posttype: { eq: "blog" } } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
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
  );
  return (
    <Layout>
      <SEO title="Blog | Anurag Hazra" />

      <BlogLayout>
        {blogposts.allMarkdownRemark.edges.map(({ node }) => (
          <BlogCard
            key={node.id}
            slug={node.fields.slug}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            tags={node.frontmatter.tags}
            readtime={node.timeToRead}
            excerpt={node.excerpt}
          />
        ))}
      </BlogLayout>
    </Layout>
  );
};

export default BlogPage;
