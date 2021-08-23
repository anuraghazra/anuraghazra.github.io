const meta = {
  // Metadata
  siteTitle: 'CronixZero - Java Developer',
  siteDescription:
    'CronixZero - A Java Developer constantly trying to get better.',
  siteTitleAlt: 'CronixZero',
  siteShortName: 'CronixZero',
  siteUrl: 'https://CronixZero.github.io',
};

const social = {
  siteLogo: `src/static/logo.svg`,
  siteBanner: `${meta.siteUrl}/images/social-banner.png`,
  twitter: '@CronixZero',
};

const website = {
  ...meta,
  ...social,
  disqusShortName: 'CronixZero',
  // Manifest
  themeColor: '#6D83F2',
  backgroundColor: '#6D83F2',
};

module.exports = website;
