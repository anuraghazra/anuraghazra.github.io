require('typeface-montserrat');
require('typeface-karla');

// require('prismjs/themes/prism-tomorrow.css')
require('./src/styles/prism-purpleking-dark.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
};
