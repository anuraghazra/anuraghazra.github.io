import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import socialBanner from '@src/static/images/social-banner.jpg';

function SEO({ title, description, slug, isBlogPost }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          twitter
          siteUrl
          siteLogo
          siteBanner
        }
      }
    }
  `);

  const defaults = site.siteMetadata;

  // if (!defaults.siteUrl && typeof window !== 'undefined') {
  //   defaults.siteUrl = window.location.origin;
  // }

  if (defaults.siteUrl === '') {
    console.error('Please set a siteUrl in your site metadata!');
    return null;
  }

  title = title || defaults.title;
  description = description || defaults.description;

  let url = `${defaults.siteUrl}${slug || ''}`;
  let twitter = defaults.twitter;
  let ogimage = `${defaults.siteUrl}${socialBanner}`;

  if (isBlogPost) {
    title = title + ' | Anurag Hazra';
    ogimage = `${defaults.siteUrl}${slug}/social-banner-img.jpg`;
  }
  // console.log({ url, title, description, twitter, ogimage, imageWidth, imageHeight })
  return (
    <Helmet>
      {/* General tags */}
      <title>{title}</title>
      <meta name="url" content={url} />
      <meta name="description" content={description} />
      {ogimage && <meta name="image" content={ogimage} />}
      <link rel="canonical" href={url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogimage && <meta property="og:image" content={ogimage} />}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {ogimage && <meta name="twitter:image" content={ogimage} />}
    </Helmet>
  );
}

export default SEO;
