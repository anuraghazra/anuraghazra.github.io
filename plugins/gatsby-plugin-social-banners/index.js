const path = require('path');
const jimp = require('jimp');
const dateformat = require('dateformat');

module.exports = ({ markdownNode }) => {
  const { frontmatter, fields } = markdownNode;
  if (fields.posttype === 'case-studies') return;

  const output = path.join('./public', fields.slug, 'social-banner.jpg');
  // console.log(`markdownNode plugin:${JSON.stringify(markdownNode, null, 2)}`);

  return Promise.all([
    jimp.read(path.join(__dirname, 'social-banner-template.jpg')),
    jimp.loadFont(path.join(__dirname, 'montserrat.fnt')),
    jimp.loadFont(path.join(__dirname, 'karla-26-regular.fnt'))
  ]).then(([image, montserrat, karla]) => {
    image
      .resize(1280, 686)
      .print(
        montserrat,
        179,
        268,
        {
          text: frontmatter.title,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        921,
        179
      )
      .print(
        karla,
        0,
        471,
        {
          text: `${dateformat(frontmatter.date, 'mmmm d, yyyy')}  |  Anurag Hazra`,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        1280,
        44
      )
      .write(output);
  });
};