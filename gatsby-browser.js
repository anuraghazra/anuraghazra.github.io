require('typeface-montserrat')
require('typeface-karla')

require('prismjs/themes/prism-tomorrow.css')
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
}