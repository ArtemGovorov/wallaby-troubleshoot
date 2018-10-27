module.exports = wallaby => ({
  files: [
    'app/javascript/easybib/**/*.js?(x|on)',
    '!app/javascript/easybib/**/*.test.js?(x)',
    'config/jest/*.js',
  ],
  tests: ['app/javascript/easybib/**/*.test.js?(x)'],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  compilers: {
    '**/*.js?(x)': wallaby.compilers.babel({}),
  },
})
