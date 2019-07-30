const slugify = (str) => {
  return str.toLowerCase().replace(/\s/ig, '-');
}

module.exports = slugify;