import React from "react";
import { graphql } from "gatsby"

import SEO from "src/components/seo";
import Layout from "src/components/Layout/Layout"

import BlogLayout from "src/components/Blog/BlogLayout";
import SocialShareSection from 'src/components/Blog/SocialShareSection';
import { BlogDateAndReadTime } from "src/components/Blog/BlogCard";

import { DiscussionEmbed } from "disqus-react";

const BlogPost = ({ data, pageContext }) => {
  const { title, date, id } = data.markdownRemark.frontmatter;
  const { timeToRead, html, excerpt } = data.markdownRemark;

  const baseUrl = "https://anuraghazra.github.io"
  const baseSlugUrl = baseUrl + pageContext.slug;
  const disqusShortName = "anuraghazra";
  const disqusConfig = {
    identifier: id,
    title: title,
    url: baseSlugUrl
  }

  return (
    <Layout>
      <SEO isBlogPost title={title} description={excerpt} slug={baseSlugUrl} />

      <BlogLayout sharerSection={
        <div>
          <h4>Share on</h4>
          <SocialShareSection baseSlugUrl={baseSlugUrl} title={title} />
        </div>
      }>
        <BlogDateAndReadTime date={date} readtime={timeToRead} />
        <h1>{title}</h1>
        <article className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
        <DiscussionEmbed shortname={disqusShortName} config={disqusConfig} />
      </BlogLayout>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug : String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      excerpt
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY", locale: "en")
        title
      }
    }
  }
`

export default BlogPost
