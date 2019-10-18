const meta = {
  // Metadata
  // Finds usage in gatsby-config, i18n, and SEO component
  siteTitle: 'Anurag Hazra - Creative Web Designer',
  siteDescription: 'Anurag Hazra | Passionate Web Designer. Creative and unique web designer from india who loves javascript and modern web technologies.',  
  siteTitleAlt: 'Anurag Hazra',
  siteShortName: 'Anurag Hazra',
  siteUrl: 'https://anuraghazra-gatsby-portfolio-git-adding-seo.anuraghazra1.now.sh', // No trailing slash!
}

const social = {
  siteLogo: `${meta.siteUrl}/avatar.png`,
  siteLogoSmall: `${meta.siteUrl}/avatar_small.png`,
  siteBanner: `${meta.siteUrl}/images/social-banner.png`,
  twitter: '@anuraghazru',
}

const website = {
  ...meta,
  ...social,
  // googleAnalyticsID: 'UA-47519312-1',
  // background_color: `#6D83F2`,
  // theme_color: `#6D83F2`,
  // Manifest
  themeColor: '#3498DB',
  backgroundColor: '#2e3246',
}

module.exports = website