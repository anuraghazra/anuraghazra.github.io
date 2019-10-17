const path = require('path');
const jimp = require('jimp');
const dateformat = require('dateformat');

module.exports = ({ markdownNode }) => {
  const { frontmatter, fields } = markdownNode;
  if (fields.posttype === 'case-studies') return;

  const output = path.join('./public', fields.slug, 'social-banner.jpg');
  // console.log(`markdownNode plugin:${JSON.stringify(markdownNode, null, 2)}`);

  return Promise.all([
    jimp.read(path.join(__dirname, 'social-banner-template.png')),
    jimp.loadFont(path.join(__dirname, 'montserrat.fnt')),
    jimp.loadFont(path.join(__dirname, 'karla-26-regular.fnt'))
  ]).then(([image, montserrat, karla]) => {
    image
      .resize(1200, 630)
      .print(
        montserrat,
        140,
        213,
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
        416,
        {
          text: `${dateformat(frontmatter.date, 'mmmm d, yyyy')}  |  Anurag Hazra`,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        1200,
        44
      )
      .write(output);
  });
};