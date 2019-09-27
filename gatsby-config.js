module.exports = {
  siteMetadata: {
    title: `Anurag Hazra | Creative Web Designer`,
    description: `Creative Web Designer\`s Portfolio`,
    author: `@anuraghazra`,
  },
  plugins: [
    // JSON
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `src/content`,
      },
    },
    // Markdown
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              showCaptions: true
            }
          }
        ]
      }
    },

    // SOURCE FILE SYSTEM
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'case-studies',
        path: `${__dirname}/src/pages/case-studies`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'blog',
        path: `${__dirname}/src/pages/blog/`,
      },
    },

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
        name: `Anurag Hazra`,
        short_name: `Anurag Hazra`,
        start_url: `/`,
        background_color: `#6D83F2`,
        theme_color: `#6D83F2`,
        display: `standalone`,
        icon: `src/static/images/gatsby-icon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,

    // fonts
    // https://fonts.googleapis.com/css?family=Karla:400,700|Montserrat:400,600,700,900&display=swap
    // families: ['Karla&display=swap', 'Montserrat:400,700,900&display=swap']
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: [
            'Karla',
            'Montserrat:n4,n7,n9'
          ],
          urls: [
            'https://fonts.googleapis.com/css?family=Karla&display=swap',
            'https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap'
          ]
        }
      }
    },

    // NProgress
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#6D83F2`,
        showSpinner: false,
      },
    },

    // others
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-root-import`
  ],
}
