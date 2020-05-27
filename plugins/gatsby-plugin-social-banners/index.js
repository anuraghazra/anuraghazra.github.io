const path = require('path');
const jimp = require('jimp');
const dateformat = require('dateformat');

module.exports = async ({ markdownNode }) => {
  const { frontmatter, fields } = markdownNode;
  if (fields.posttype === 'case-studies') return;

  const output = path.join('./public', fields.slug, 'social-banner-img.jpg');
  // console.log(`markdownNode plugin:${JSON.stringify(markdownNode, null, 2)}`);

  const [image, montserrat, karla] = await Promise.all([
    jimp.read(path.join(__dirname, './src/social-banner-template.jpg')),
    jimp.loadFont(path.join(__dirname, './src/fonts/montserrat.fnt')),
    jimp.loadFont(path.join(__dirname, './src/fonts/karla-26-regular.fnt')),
  ]);

  image
    .resize(1200, 630)
    .print(
      montserrat,
      139,
      231,
      {
        text: frontmatter.title,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
      },
      921,
      179
    )
    .print(
      karla,
      0,
      434,
      {
        text: `${dateformat(
          frontmatter.date,
          'mmmm d, yyyy'
        )}  |  Anurag Hazra`,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
      },
      1200,
      44
    )
    .write(output);
};
