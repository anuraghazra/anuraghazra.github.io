module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/tests/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/tests/file-mock.js`,
    '^@src(.*)$': '<rootDir>/src/$1',
    '^@common(.*)$': '<rootDir>/src/components/common/$1',
    '^@components(.*)$': '<rootDir>/src/components/$1',
    '^@pages(.*)$': '<rootDir>/src/pages/shared$1',
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`, `cypress`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  // absolute imports support
  moduleDirectories: ['node_modules', './'],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  // setupFiles: [`<rootDir>/loadershim.js`],
};
