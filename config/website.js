const meta = {
  // Metadata
  siteTitle: 'Darshan Sudhakar - Creative Web Designer',
  siteDescription:
    'Darshan Sudhakar - Creative frontEnd web developer who loves javascript and modern web technologies.',
  siteTitleAlt: 'Darshan Sudhakar',
  siteShortName: 'Darshan Sudhakar',
  siteUrl: 'https://anuraghazra.github.io', // No trailing slash!
};

const social = {
  siteLogo: `src/static/logo.svg`,
  siteBanner: `${meta.siteUrl}/images/social-banner.png`,
  twitter: '@anuraghazru',
};

const website = {
  ...meta,
  ...social,
  disqusShortName: 'anuraghazra',
  googleAnalyticsID: 'UA-119972196-1',
  // Manifest
  themeColor: '#6D83F2',
  backgroundColor: '#6D83F2',
};

module.exports = website;
