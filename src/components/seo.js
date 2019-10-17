import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import socialBanner from '../static/images/social-banner.png';

// {
//   siteMetadata: seo,
//   postData,
//   metaImage,
//   isBlogPost,
//   frontmatter: postMeta = postData.childMarkdownRemark.frontmatter || {},
//   title = postMeta.title || config.siteTitle,
//   description = postMeta.plainTextDescription || postMeta.description || seo.description,
//   image = `${seo.canonicalUrl}${metaImage || defaultMetaImage}`,
//   url = postMeta.slug ? `${seo.canonicalUrl}${path.sep}${postMeta.slug}` : seo.canonicalUrl,
// }

function SEO({ title, description, slug, image, isBlogPost }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          twitter
          siteUrl
          siteLogo
          siteLogoSmall
          siteBanner
          siteBannerWidth
          siteBannerHeight
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
  let imageWidth = defaults.siteBannerWidth;
  let imageHeight = defaults.siteBannerHeight;

  console.log({ url, title, description, twitter, ogimage, imageWidth, imageHeight })
  return (
    <Helmet>

      {/* General tags */}
      <title>{title}</title>
      <meta name="url" content={url} />
      <meta name="description" content={description} />
      {ogimage && <meta name="image" content={`${ogimage}`} />}

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {ogimage && <meta property="og:image" content={`${ogimage}`} />}
      {ogimage && <meta name="og:image:width" content={imageWidth} />}
      {ogimage && <meta name="og:image:height" content={imageHeight} />}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {ogimage && <meta name="twitter:image" content={`${ogimage}`} />}
      {ogimage && <meta name="twitter:image:alt" content={description} />}
      {ogimage && <meta name="twitter:image:width" content={imageWidth} />}
      {ogimage && <meta name="twitter:image:height" content={imageHeight} />}

    </Helmet>
  )
}


export default SEO;
