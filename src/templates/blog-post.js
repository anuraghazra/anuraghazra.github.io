import React from "react";
import { graphql } from "gatsby"

import SEO from "src/components/seo";
import Layout from "src/components/Layout/Layout"
import BlogLayout from "src/components/BlogLayout";
import { BlogDateAndReadTime } from "src/components/Blog/BlogCard";

import { DiscussionEmbed } from "disqus-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const BlogPost = ({ data, pageContext }) => {
  const { title, date, id } = data.markdownRemark.frontmatter;
  const { timeToRead, html } = data.markdownRemark;

  const baseUrl = "https://anuraghazra.surge.sh"
  const baseSlugUrl = baseUrl + pageContext.slug;
  const disqusShortName = "anuraghazra";
  const disqusConfig = {
    identifier: id,
    title: title,
    url: baseSlugUrl
  }

  const fbShareLink = `https://facebook.com/sharer/sharer.php?u=${baseSlugUrl}`;
  const twShareLink = `http://twitter.com/share?text="${title}" - &url=${baseSlugUrl}`;
  const rdShareLink = `http://www.reddit.com/submit?url=${baseSlugUrl}&title=${title}`;
  return (
    <Layout>
      <SEO title={title} />

      <BlogLayout sharerSection={
        <div>
          <h4>Share on</h4>
          <div className="blog__social-share">
            <a aria-label="share on facebook" rel="noopener norefferer" target="__blank" href={fbShareLink}>
              <FontAwesomeIcon style={{ fontSize: 24 }} icon={["fab", "facebook"]} />
            </a>
            <a aria-label="share on twitter" rel="noopener norefferer" target="__blank" href={twShareLink}>
              <FontAwesomeIcon style={{ fontSize: 24 }} icon={["fab", "twitter"]} />
            </a>
            <a aria-label="share on reddit" rel="noopener norefferer" target="__blank" href={rdShareLink}>
              <FontAwesomeIcon style={{ fontSize: 24 }} icon={["fab", "reddit"]} />
            </a>
          </div>
        </div>
      }>
        <BlogDateAndReadTime date={date} readtime={timeToRead} />
        <h1>{title}</h1>
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
        <DiscussionEmbed shortname={disqusShortName} config={disqusConfig} />
      </BlogLayout>

    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug : String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      timeToRead
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY", locale: "en")
        title
      }
    }
  }
`

export default BlogPost
