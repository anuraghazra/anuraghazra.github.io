const config = require('./config/website');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    twitter: config.twitter,
    siteUrl: config.siteUrl,
    siteLogo: config.siteLogo,
    siteBanner: config.siteBanner,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    // MARKDOWN
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `gatsby-remark-autolink`,
              maintainCase: true,
              removeAccents: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              showCaptions: true
            }
          },
          `gatsby-plugin-social-banners`
        ]
      }
    },

    // SOURCE FILE SYSTEM -
    // SOURCE JSON
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/json`,
      },
    },
    // SOURCE MARKDOWN
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'case-studies',
        path: `${__dirname}/content/case-studies`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog/`,
      },
    },


    // IMAGE TRANSFORMER
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/static/images`,
      },
    },

    // manifest & helmet
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitleAlt,
        short_name: config.siteShortName,
        start_url: `/`,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `standalone`,
        icon: config.siteLogo,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // fonts
    // https://fonts.googleapis.com/css?family=Karla:400,700|Montserrat:400,600,700,900&display=swap
    // families: ['Karla&display=swap', 'Montserrat:400,700,900&display=swap']
    // {
    //   resolve: 'gatsby-plugin-web-font-loader',
    //   options: {
    //     custom: {
    //       families: [
    //         'Karla',
    //         'Montserrat:n4,n7,n9'
    //       ],
    //       urls: [
    //         'https://fonts.googleapis.com/css?family=Karla&display=swap',
    //         'https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap'
    //       ]
    //     }
    //   }
    // },

    // NProgress
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#6D83F2`,
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        head: true,
      },
    },
    // others
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-root-import`
  ],
}
